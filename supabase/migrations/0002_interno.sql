-- =============================================================================
-- 0002 — Back office interno: socios, consultas con seguimiento, proyectos,
--        tareas y agenda
-- =============================================================================
-- Hasta acá la base tenía una sola tabla (consultas) y una sola puerta: el
-- servidor de la web, que escribe con la clave secreta. Esta migración abre una
-- segunda puerta —el back office— y por eso casi todo lo que sigue es sobre
-- quién puede pasar por ella.
--
-- LA REGLA, en una frase: para ver o tocar cualquier dato hay que cumplir TRES
-- condiciones a la vez, y las verifica la base, no las pantallas:
--
--   1. haber iniciado sesión;
--   2. haber pasado el segundo factor (el código de la app del celular);
--   3. figurar en la tabla `socios` como activo.
--
-- Las tres juntas son la función `es_socio()`. Todas las políticas de acceso
-- de todas las tablas preguntan eso y nada más.
--
-- Por qué en la base y no en la aplicación: la clave pública de Supabase viaja
-- al navegador —es su naturaleza— y con ella cualquiera puede hablarle a la
-- base directamente, sin pasar por nuestras pantallas. Si el permiso viviera
-- solo en la aplicación, saltearla alcanzaría para leer todo. Viviendo acá,
-- no hay nada que saltear.
--
-- Consecuencia práctica: aunque alguien lograra crearse una cuenta (el alta
-- pública va apagada, pero supongamos que alguien la prende por error), esa
-- cuenta no está en `socios` y no ve una sola fila.
--
-- El back office NO usa la clave secreta. Cada pedido viaja con la sesión del
-- socio que está sentado, así que la base siempre sabe quién es.
-- =============================================================================


-- -----------------------------------------------------------------------------
-- 1. Socios: la lista de quién entra
-- -----------------------------------------------------------------------------
-- No se administra desde las pantallas: un socio se da de alta a mano, por
-- SQL, por alguien con acceso de administrador a la base. Es a propósito: la
-- lista de quién entra no puede modificarse desde el mismo lugar al que da
-- acceso.

create table public.socios (
  id         uuid primary key references auth.users (id) on delete restrict,
  nombre     text not null check (length(trim(nombre)) between 2 and 80),
  email      text not null,
  activo     boolean not null default true,
  created_at timestamptz not null default now()
);

alter table public.socios enable row level security;
revoke all on public.socios from anon;
revoke insert, update, delete, truncate on public.socios from authenticated;

comment on table public.socios is
  'Quién puede entrar al back office. Se administra a mano por SQL, nunca desde la aplicación.';


-- -----------------------------------------------------------------------------
-- 2. es_socio(): la única pregunta que hacen todas las políticas
-- -----------------------------------------------------------------------------
-- `aal2` es como Supabase llama a "esta sesión pasó el segundo factor". Con
-- usuario y contraseña solos la sesión queda en `aal1` y esta función da falso.
--
-- SECURITY DEFINER: la función lee `socios` con permisos propios, para poder
-- contestar aunque quien pregunta todavía no tenga derecho a leer esa tabla.
-- Se le fija el search_path para que nadie pueda hacerle usar otra tabla con el
-- mismo nombre.

create or replace function public.es_socio()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select coalesce((select auth.jwt()) ->> 'aal', '') = 'aal2'
     and exists (
       select 1
         from public.socios s
        where s.id = (select auth.uid())
          and s.activo
     );
$$;

revoke all on function public.es_socio() from public, anon;
grant execute on function public.es_socio() to authenticated;

-- Los socios se ven entre sí (para asignar responsables). Nada más: no hay
-- política de alta, cambio ni baja.
create policy socios_ver on public.socios
  for select to authenticated
  using (public.es_socio());


-- -----------------------------------------------------------------------------
-- 3. Utilidad: mantener la fecha de última modificación
-- -----------------------------------------------------------------------------

create or replace function public.tocar_actualizado()
returns trigger
language plpgsql
as $$
begin
  new.updated_at := now();
  return new;
end;
$$;


-- -----------------------------------------------------------------------------
-- 4. Consultas: de buzón sin dueño a bandeja con seguimiento
-- -----------------------------------------------------------------------------
-- Estados:
--   nueva       llegó y nadie la tomó
--   contactada  ya se le respondió
--   reunion     hay un diagnóstico agendado
--   ganada      terminó en un proyecto
--   descartada  no avanzó (no se borra: se descarta, y queda el porqué en las notas)

alter table public.consultas
  add column estado         text not null default 'nueva'
    check (estado in ('nueva', 'contactada', 'reunion', 'ganada', 'descartada')),
  add column responsable_id uuid references public.socios (id),
  add column updated_at     timestamptz not null default now();

create index consultas_estado_idx on public.consultas (estado, created_at desc);

-- Al salir de "nueva" por primera vez se anota cuando: es el dato para saber
-- cuanto tardamos en responder. Lo pone la base, no depende de que la pantalla
-- se acuerde.
create or replace function public.consulta_antes_de_cambiar()
returns trigger
language plpgsql
as $$
begin
  new.updated_at := now();
  if old.estado = 'nueva' and new.estado <> 'nueva' and new.atendida_el is null then
    new.atendida_el := now();
  end if;
  return new;
end;
$$;

create trigger consultas_actualizado
  before update on public.consultas
  for each row execute function public.consulta_antes_de_cambiar();

-- Lo que escribió el visitante no se toca. Un socio puede cambiar el estado y
-- quién la tiene, pero no el nombre, el mail ni el mensaje: eso es lo que la
-- persona dijo, y tiene que seguir diciendo lo mismo dentro de un año.
-- Se consigue quitando el permiso general de modificar y dándolo solo sobre
-- tres columnas.
revoke all on public.consultas from anon;
revoke insert, update, delete, truncate on public.consultas from authenticated;
grant update (estado, responsable_id) on public.consultas to authenticated;

create policy consultas_ver on public.consultas
  for select to authenticated
  using (public.es_socio());

create policy consultas_seguir on public.consultas
  for update to authenticated
  using (public.es_socio())
  with check (public.es_socio());

-- No hay política de alta (las crea solo la web, con la clave secreta) ni de
-- baja (una consulta no se borra nunca desde el back office).

comment on table public.consultas is
  'Consultas del formulario de la web. Entran solo por service_role; los socios las leen y les cambian estado y responsable, nunca el contenido.';


-- -----------------------------------------------------------------------------
-- 5. Historial de cada consulta
-- -----------------------------------------------------------------------------
-- Solo se agrega: no hay política de cambio ni de baja. Lo que se anotó, quedó.

create table public.consulta_notas (
  id          bigint generated always as identity primary key,
  consulta_id bigint not null references public.consultas (id) on delete restrict,
  autor_id    uuid not null default auth.uid() references public.socios (id),
  -- 'nota' la escribe una persona; 'cambio' la deja el sistema cuando cambia
  -- el estado o el responsable.
  tipo        text not null default 'nota' check (tipo in ('nota', 'cambio')),
  texto       text not null check (length(trim(texto)) between 1 and 4000),
  created_at  timestamptz not null default now()
);

create index consulta_notas_idx on public.consulta_notas (consulta_id, created_at);

alter table public.consulta_notas enable row level security;
revoke all on public.consulta_notas from anon;
revoke update, delete, truncate on public.consulta_notas from authenticated;

create policy notas_ver on public.consulta_notas
  for select to authenticated
  using (public.es_socio());

-- Cada uno firma lo suyo: no se puede anotar en nombre de otro socio.
create policy notas_agregar on public.consulta_notas
  for insert to authenticated
  with check (public.es_socio() and autor_id = (select auth.uid()));

-- Cada cambio de estado o de responsable deja su renglón en el historial, con
-- quién lo hizo. Nadie tiene que acordarse de anotarlo.
create or replace function public.registrar_cambio_de_consulta()
returns trigger
language plpgsql
as $$
declare
  v_quien uuid := auth.uid();
begin
  -- Sin sesión (un cambio hecho a mano por un administrador) no hay a quién
  -- atribuírselo, y la columna autor no admite vacío: no se anota.
  if v_quien is null then
    return new;
  end if;

  if new.estado is distinct from old.estado then
    insert into public.consulta_notas (consulta_id, autor_id, tipo, texto)
    values (new.id, v_quien, 'cambio', 'Estado: ' || old.estado || ' → ' || new.estado);
  end if;

  if new.responsable_id is distinct from old.responsable_id then
    insert into public.consulta_notas (consulta_id, autor_id, tipo, texto)
    values (
      new.id, v_quien, 'cambio',
      'Responsable: ' || coalesce((select nombre from public.socios where id = new.responsable_id), 'sin asignar')
    );
  end if;

  return new;
end;
$$;

create trigger consultas_historial
  after update on public.consultas
  for each row execute function public.registrar_cambio_de_consulta();


-- -----------------------------------------------------------------------------
-- 6. Proyectos
-- -----------------------------------------------------------------------------
-- La pregunta que tiene que responder: ¿qué le prometimos a quién, para cuándo,
-- y quién lo tiene?

create table public.proyectos (
  id             bigint generated always as identity primary key,
  nombre         text not null check (length(trim(nombre)) between 2 and 160),
  cliente        text not null check (length(trim(cliente)) between 2 and 160),
  -- A cuál de las cinco líneas de Cayre pertenece. Puede quedar vacío.
  linea          text check (linea in ('cayre360', 'cayrepos', 'cayrecrm', 'cayrecorp', 'cayremkt')),
  estado         text not null default 'activo'
    check (estado in ('activo', 'pausado', 'terminado', 'cancelado')),
  responsable_id uuid references public.socios (id),
  -- La fecha que se le prometió al cliente.
  compromiso_el  date,
  descripcion    text check (descripcion is null or length(descripcion) <= 4000),
  -- De qué consulta nació, si nació de una.
  consulta_id    bigint references public.consultas (id),
  creado_por     uuid not null default auth.uid() references public.socios (id),
  created_at     timestamptz not null default now(),
  updated_at     timestamptz not null default now()
);

create index proyectos_estado_idx on public.proyectos (estado, compromiso_el);

alter table public.proyectos enable row level security;
revoke all on public.proyectos from anon;
revoke delete, truncate on public.proyectos from authenticated;

create trigger proyectos_actualizado
  before update on public.proyectos
  for each row execute function public.tocar_actualizado();

create policy proyectos_ver on public.proyectos
  for select to authenticated using (public.es_socio());
create policy proyectos_crear on public.proyectos
  for insert to authenticated
  with check (public.es_socio() and creado_por = (select auth.uid()));
create policy proyectos_cambiar on public.proyectos
  for update to authenticated
  using (public.es_socio()) with check (public.es_socio());
-- Sin baja: un proyecto se termina o se cancela, no desaparece.


-- -----------------------------------------------------------------------------
-- 7. Tareas
-- -----------------------------------------------------------------------------

create table public.tareas (
  id             bigint generated always as identity primary key,
  proyecto_id    bigint not null references public.proyectos (id) on delete restrict,
  titulo         text not null check (length(trim(titulo)) between 2 and 200),
  detalle        text check (detalle is null or length(detalle) <= 4000),
  estado         text not null default 'pendiente'
    check (estado in ('pendiente', 'en_curso', 'trabada', 'hecha')),
  motivo_traba   text,
  responsable_id uuid references public.socios (id),
  vence_el       date,
  hecha_el       timestamptz,
  creado_por     uuid not null default auth.uid() references public.socios (id),
  created_at     timestamptz not null default now(),
  updated_at     timestamptz not null default now(),

  -- Una tarea no puede quedar "trabada" sin decir por qué. Es la regla que
  -- hace útil al tablero: "trabada" a secas no le dice a nadie qué destrabar.
  constraint tarea_trabada_dice_por_que
    check (estado <> 'trabada' or length(trim(coalesce(motivo_traba, ''))) >= 3)
);

create index tareas_proyecto_idx on public.tareas (proyecto_id, estado);
create index tareas_responsable_idx on public.tareas (responsable_id, estado, vence_el);

alter table public.tareas enable row level security;
revoke all on public.tareas from anon;
revoke truncate on public.tareas from authenticated;

-- Al pasar a "hecha" se anota cuándo; al salir de "hecha", se borra. Y al
-- destrabarse, el motivo de la traba deja de aplicar.
create or replace function public.ordenar_tarea()
returns trigger
language plpgsql
as $$
begin
  new.updated_at := now();
  if new.estado = 'hecha' and (tg_op = 'INSERT' or old.estado is distinct from 'hecha') then
    new.hecha_el := now();
  elsif new.estado <> 'hecha' then
    new.hecha_el := null;
  end if;
  if new.estado <> 'trabada' then
    new.motivo_traba := null;
  end if;
  return new;
end;
$$;

create trigger tareas_orden
  before insert or update on public.tareas
  for each row execute function public.ordenar_tarea();

create policy tareas_ver on public.tareas
  for select to authenticated using (public.es_socio());
create policy tareas_crear on public.tareas
  for insert to authenticated
  with check (public.es_socio() and creado_por = (select auth.uid()));
create policy tareas_cambiar on public.tareas
  for update to authenticated
  using (public.es_socio()) with check (public.es_socio());
-- Una tarea cargada por error sí se puede borrar.
create policy tareas_borrar on public.tareas
  for delete to authenticated using (public.es_socio());


-- -----------------------------------------------------------------------------
-- 8. Agenda de reuniones
-- -----------------------------------------------------------------------------

create table public.reuniones (
  id           bigint generated always as identity primary key,
  titulo       text not null check (length(trim(titulo)) between 2 and 160),
  inicia_el    timestamptz not null,
  duracion_min integer not null default 30 check (duracion_min between 5 and 600),
  -- Con quién es, del lado de afuera: la persona o la empresa.
  con_quien    text check (con_quien is null or length(con_quien) <= 160),
  -- Una dirección o un enlace de videollamada.
  lugar        text check (lugar is null or length(lugar) <= 400),
  notas        text check (notas is null or length(notas) <= 4000),
  estado       text not null default 'agendada'
    check (estado in ('agendada', 'hecha', 'cancelada')),
  -- Una reunión puede pertenecer a una consulta, a un proyecto, o a ninguno.
  consulta_id  bigint references public.consultas (id),
  proyecto_id  bigint references public.proyectos (id),
  creado_por   uuid not null default auth.uid() references public.socios (id),
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);

create index reuniones_fecha_idx on public.reuniones (inicia_el);

alter table public.reuniones enable row level security;
revoke all on public.reuniones from anon;
revoke delete, truncate on public.reuniones from authenticated;

create trigger reuniones_actualizado
  before update on public.reuniones
  for each row execute function public.tocar_actualizado();

create policy reuniones_ver on public.reuniones
  for select to authenticated using (public.es_socio());
create policy reuniones_crear on public.reuniones
  for insert to authenticated
  with check (public.es_socio() and creado_por = (select auth.uid()));
create policy reuniones_cambiar on public.reuniones
  for update to authenticated
  using (public.es_socio()) with check (public.es_socio());
-- Sin baja: una reunión se cancela, y queda que existió.

-- Qué socios van a cada reunión.
create table public.reunion_participantes (
  reunion_id bigint not null references public.reuniones (id) on delete cascade,
  socio_id   uuid not null references public.socios (id),
  primary key (reunion_id, socio_id)
);

alter table public.reunion_participantes enable row level security;
revoke all on public.reunion_participantes from anon;
revoke update, truncate on public.reunion_participantes from authenticated;

create policy participantes_ver on public.reunion_participantes
  for select to authenticated using (public.es_socio());
create policy participantes_sumar on public.reunion_participantes
  for insert to authenticated with check (public.es_socio());
create policy participantes_sacar on public.reunion_participantes
  for delete to authenticated using (public.es_socio());


-- -----------------------------------------------------------------------------
-- 9. Guardián: que nadie apague la protección, ni por accidente
-- -----------------------------------------------------------------------------
-- Un disparador que corre después de cada ALTER TABLE y revisa el estado final:
-- si alguna tabla tiene reglas de acceso escritas pero quedó con RLS apagado,
-- aborta la operación. Como mira el resultado y no el texto del comando, no se
-- esquiva escribiéndolo de otra forma.
--
-- Límite honesto: esto vuelve imposible el accidente, no al atacante. Quien
-- tenga acceso de administrador puede borrar primero este disparador y después
-- apagar RLS. Lo que no puede es hacerlo sin querer ni en silencio: son dos
-- operaciones deliberadas y las dos quedan en el registro del proveedor.

create or replace function public.guardia_rls()
returns event_trigger
language plpgsql
as $$
declare
  v_sin_proteccion text;
begin
  select string_agg(c.relname, ', ' order by c.relname)
    into v_sin_proteccion
    from pg_class c
    join pg_namespace n on n.oid = c.relnamespace
   where n.nspname = 'public'
     and c.relkind = 'r'
     and not c.relrowsecurity
     and exists (select 1 from pg_policy p where p.polrelid = c.oid);

  if v_sin_proteccion is not null then
    raise exception
      'Operación rechazada: estas tablas tienen reglas de acceso y quedarían sin RLS: %.',
      v_sin_proteccion
      using hint = 'Si de verdad hace falta, primero hay que borrar el disparador guardia_rls. Es deliberado y queda registrado.';
  end if;
end;
$$;

create event trigger guardia_rls
  on ddl_command_end
  when tag in ('ALTER TABLE')
  execute function public.guardia_rls();
