-- =============================================================================
-- Prueba de acceso: quién puede ver y tocar qué
-- =============================================================================
-- Esta prueba es la respuesta a "¿cómo sé que nadie de afuera puede leer las
-- consultas?". No lo afirma: lo intenta. Se disfraza de cada tipo de visitante
-- y prueba leer y escribir. Si alguna vez una regla se afloja, esta prueba se
-- pone en rojo y corta la entrega.
--
-- Los cinco disfraces:
--   · anónimo            nadie inició sesión
--   · intruso            tiene cuenta y hasta segundo factor, pero no es socio
--   · socio sin 2º factor puso usuario y contraseña, no el código del celular
--   · socio dado de baja figura en la lista, pero inactivo
--   · socio              cumple las tres condiciones
--
-- Correr con:  npx supabase test db
-- =============================================================================

begin;
select plan(32);

-- ── Escenario ────────────────────────────────────────────────────────────────
-- La prueba arma su propio mundo: primero vacía las tablas, para que el
-- resultado no dependa de los datos que haya cargados. Todo ocurre adentro de
-- una transacción que al final se deshace (el `rollback` de la última línea),
-- así que nada de lo que hay en la base se pierde de verdad.
delete from public.reunion_participantes;
delete from public.reuniones;
delete from public.tareas;
delete from public.proyectos;
delete from public.consulta_notas;
delete from public.consultas;
delete from public.socios;

insert into auth.users (id, instance_id, aud, role, email) values
  ('a0000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'socio1@prueba.test'),
  ('a0000000-0000-0000-0000-000000000002', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'socio2@prueba.test'),
  ('a0000000-0000-0000-0000-000000000003', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'baja@prueba.test'),
  ('b0000000-0000-0000-0000-000000000009', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'intruso@prueba.test');

insert into public.socios (id, nombre, email, activo) values
  ('a0000000-0000-0000-0000-000000000001', 'Socio Uno', 'socio1@prueba.test', true),
  ('a0000000-0000-0000-0000-000000000002', 'Socio Dos', 'socio2@prueba.test', true),
  ('a0000000-0000-0000-0000-000000000003', 'Socio de Baja', 'baja@prueba.test', false);

insert into public.consultas (nombre, email, mensaje)
values ('Visitante de prueba', 'visitante@prueba.test', 'Quiero ordenar mi stock.');

-- ── 1. Estructura: ninguna tabla sin protección ──────────────────────────────
select is(
  (select count(*)::int
     from pg_class c join pg_namespace n on n.oid = c.relnamespace
    where n.nspname = 'public' and c.relkind = 'r' and not c.relrowsecurity),
  0,
  'Todas las tablas tienen RLS encendido'
);

select ok(
  not has_function_privilege('anon', 'public.es_socio()', 'execute'),
  'Un anónimo no puede ni preguntar si es socio'
);

-- ── 2. Anónimo: no entra a nada ──────────────────────────────────────────────
set local role anon;
select throws_ok('select count(*) from public.consultas', '42501', null, 'Anónimo: no lee consultas');
select throws_ok('select count(*) from public.proyectos', '42501', null, 'Anónimo: no lee proyectos');
select throws_ok('select count(*) from public.reuniones', '42501', null, 'Anónimo: no lee la agenda');
select throws_ok(
  $$insert into public.consultas (nombre, mensaje) values ('x', 'spam directo a la base')$$,
  '42501', null, 'Anónimo: no puede escribir consultas salteando la web'
);
reset role;

-- ── 3. Intruso: cuenta válida, con segundo factor, pero no es socio ──────────
select set_config('request.jwt.claims',
  '{"sub":"b0000000-0000-0000-0000-000000000009","role":"authenticated","aal":"aal2"}', true);
set local role authenticated;
select is((select count(*)::int from public.consultas), 0, 'Intruso: no ve ninguna consulta');
select is((select count(*)::int from public.socios), 0, 'Intruso: no ve quiénes son los socios');
select throws_ok(
  $$insert into public.proyectos (nombre, cliente, creado_por)
    values ('Proyecto falso', 'Nadie', 'b0000000-0000-0000-0000-000000000009')$$,
  '42501', null, 'Intruso: no puede crear proyectos'
);
update public.consultas set estado = 'descartada';
reset role;
select is((select estado from public.consultas limit 1), 'nueva', 'Intruso: su intento de descartar la consulta no cambió nada');

-- ── 4. Socio que no pasó el segundo factor ───────────────────────────────────
select set_config('request.jwt.claims',
  '{"sub":"a0000000-0000-0000-0000-000000000001","role":"authenticated","aal":"aal1"}', true);
set local role authenticated;
select is((select count(*)::int from public.consultas), 0, 'Socio solo con contraseña: no ve nada');
select is((select count(*)::int from public.socios), 0, 'Socio solo con contraseña: tampoco la lista de socios');
reset role;

-- ── 5. Socio dado de baja ────────────────────────────────────────────────────
select set_config('request.jwt.claims',
  '{"sub":"a0000000-0000-0000-0000-000000000003","role":"authenticated","aal":"aal2"}', true);
set local role authenticated;
select is((select count(*)::int from public.consultas), 0, 'Socio dado de baja: no ve nada, aunque tenga cuenta y segundo factor');
reset role;

-- ── 6. Socio: ve y trabaja, dentro de los límites ────────────────────────────
select set_config('request.jwt.claims',
  '{"sub":"a0000000-0000-0000-0000-000000000001","role":"authenticated","aal":"aal2"}', true);
set local role authenticated;

select is((select count(*)::int from public.consultas), 1, 'Socio: ve la consulta');
select is((select count(*)::int from public.socios where activo), 2, 'Socio: ve a los otros socios');

select lives_ok(
  $$update public.consultas set estado = 'contactada', responsable_id = 'a0000000-0000-0000-0000-000000000001'$$,
  'Socio: puede tomar la consulta y cambiarle el estado'
);
select isnt((select atendida_el from public.consultas limit 1), null, 'Al salir de "nueva" la base anota cuándo se atendió');
select is(
  (select count(*)::int from public.consulta_notas where tipo = 'cambio'
      and autor_id = 'a0000000-0000-0000-0000-000000000001'),
  2,
  'El cambio de estado y el de responsable quedaron en el historial, firmados'
);

select throws_ok(
  $$update public.consultas set mensaje = 'El visitante dijo otra cosa'$$,
  '42501', null, 'Socio: NO puede reescribir lo que dijo el visitante'
);
select throws_ok(
  $$update public.consultas set email = 'otro@mail.test'$$,
  '42501', null, 'Socio: NO puede cambiar el mail del visitante'
);
select throws_ok('delete from public.consultas', '42501', null, 'Socio: NO puede borrar consultas');
select throws_ok(
  $$insert into public.consultas (nombre, mensaje) values ('Inventada', 'Consulta que nadie mandó')$$,
  '42501', null, 'Socio: NO puede inventar consultas'
);

select lives_ok(
  $$insert into public.consulta_notas (consulta_id, texto)
    select id, 'Lo llamé, pide presupuesto.' from public.consultas$$,
  'Socio: puede dejar una nota'
);
select throws_ok(
  $$insert into public.consulta_notas (consulta_id, autor_id, texto)
    select id, 'a0000000-0000-0000-0000-000000000002', 'Nota firmada por otro' from public.consultas$$,
  '42501', null, 'Socio: NO puede firmar una nota con el nombre de otro socio'
);
select throws_ok(
  $$update public.consulta_notas set texto = 'historia reescrita'$$,
  '42501', null, 'Socio: NO puede reescribir el historial'
);

select lives_ok(
  $$insert into public.proyectos (nombre, cliente) values ('Tienda mayorista', 'Cliente de prueba')$$,
  'Socio: puede crear un proyecto'
);
select throws_ok('delete from public.proyectos', '42501', null, 'Socio: NO puede borrar proyectos (se cancelan)');

select throws_ok(
  $$insert into public.tareas (proyecto_id, titulo, estado)
    select id, 'Esperando al cliente', 'trabada' from public.proyectos$$,
  '23514', null, 'Una tarea no puede quedar trabada sin decir por qué'
);
select lives_ok(
  $$insert into public.tareas (proyecto_id, titulo, estado, motivo_traba)
    select id, 'Esperando al cliente', 'trabada', 'Falta que manden el catálogo' from public.proyectos$$,
  'Con el motivo escrito, sí'
);
update public.tareas set estado = 'hecha';
select isnt((select hecha_el from public.tareas limit 1), null, 'Al terminar una tarea la base anota cuándo');
select is((select motivo_traba from public.tareas limit 1), null, 'Y el motivo de la traba deja de aplicar');
reset role;

-- ── 7. El guardián: la protección no se apaga ni por accidente ───────────────
select throws_ok(
  'alter table public.consultas disable row level security',
  'P0001', null,
  'Apagar RLS en una tabla con reglas de acceso es rechazado por la base'
);

select * from finish();
rollback;
