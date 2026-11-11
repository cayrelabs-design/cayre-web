-- =============================================================================
-- Semilla SOLO para la base local de desarrollo
-- =============================================================================
-- Crea un socio de prueba y unos pocos datos para poder mirar las pantallas.
-- NO se corre nunca contra la base real: los socios de verdad se dan de alta
-- como explica docs/PUESTA-EN-MARCHA.md.
--
-- La contraseña no está escrita acá. Se pasa al correr el archivo y vive en
-- .env.local, que no se sube al repositorio:
--
--   docker exec -i supabase_db_cayre-interno psql -U postgres \
--     -v email="$SEMILLA_EMAIL" -v clave="$SEMILLA_CLAVE" < supabase/semilla-local.sql
--
-- Todos los nombres son inventados y se nota: no hay datos de nadie.
-- =============================================================================

\set ON_ERROR_STOP on

-- Se puede correr varias veces: empieza limpiando lo que dejó la vez anterior.
delete from public.reunion_participantes;
delete from public.reuniones;
delete from public.tareas;
delete from public.proyectos;
delete from public.consulta_notas;
delete from public.consultas;
delete from public.socios;
delete from auth.users where email like '%@cayre.test';

-- ── El socio de prueba ───────────────────────────────────────────────────────
with nuevo as (
  insert into auth.users (
    instance_id, id, aud, role, email, encrypted_password, email_confirmed_at,
    raw_app_meta_data, raw_user_meta_data, created_at, updated_at,
    confirmation_token, recovery_token, email_change, email_change_token_new
  )
  values (
    '00000000-0000-0000-0000-000000000000', gen_random_uuid(), 'authenticated', 'authenticated',
    :'email', extensions.crypt(:'clave', extensions.gen_salt('bf')), now(),
    '{"provider":"email","providers":["email"]}', '{}', now(), now(),
    '', '', '', ''
  )
  returning id, email
), identidad as (
  insert into auth.identities (id, user_id, provider_id, identity_data, provider, last_sign_in_at, created_at, updated_at)
  select gen_random_uuid(), id, id::text,
         jsonb_build_object('sub', id::text, 'email', email, 'email_verified', true),
         'email', now(), now(), now()
    from nuevo
)
insert into public.socios (id, nombre, email)
select id, 'Socio de Prueba', email from nuevo;

-- Un segundo socio, sin cuenta usable, para ver cómo se asignan responsables.
with otro as (
  insert into auth.users (instance_id, id, aud, role, email, created_at, updated_at,
                          confirmation_token, recovery_token, email_change, email_change_token_new)
  values ('00000000-0000-0000-0000-000000000000', gen_random_uuid(), 'authenticated', 'authenticated',
          'otro@cayre.test', now(), now(), '', '', '', '')
  returning id, email
)
insert into public.socios (id, nombre, email)
select id, 'Otra Socia', email from otro;

-- ── Consultas ────────────────────────────────────────────────────────────────
insert into public.consultas (nombre, empresa, telefono, email, mensaje, created_at) values
  ('Marta Ejemplo', 'Ferretería de Prueba', '11 5555-0101', null,
   'Tengo local y vendo por Mercado Libre. El stock nunca me coincide y vendo cosas que no tengo.',
   now() - interval '9 hours'),
  ('Julián Inventado', null, null, 'julian@ejemplo.test',
   'Quiero una tienda mayorista para que mis clientes pidan solos.',
   now() - interval '40 minutes'),
  ('Rosa Ficticia', 'Distribuidora Demo', '11 5555-0102', 'rosa@ejemplo.test',
   'Necesitamos ordenar la caja: nunca cierra y no sabemos por qué.',
   now() - interval '3 days');

update public.consultas
   set estado = 'contactada', atendida_el = now() - interval '2 days',
       responsable_id = (select id from public.socios where email = :'email')
 where nombre = 'Rosa Ficticia';

-- ── Un proyecto con tareas ───────────────────────────────────────────────────
with p as (
  insert into public.proyectos (nombre, cliente, linea, responsable_id, compromiso_el, descripcion, creado_por)
  select 'Tienda mayorista', 'Cliente Demo S.A.', 'cayrecorp', id, current_date + 12,
         'Catálogo con precios por lista y pedido a cuenta corriente. Queda afuera: facturación.', id
    from public.socios where email = :'email'
  returning id, creado_por
)
insert into public.tareas (proyecto_id, titulo, estado, motivo_traba, responsable_id, vence_el, creado_por)
select p.id, t.titulo, t.estado, t.motivo, p.creado_por, current_date + t.dias, p.creado_por
  from p, (values
    ('Relevar el circuito de pedidos', 'hecha',     null,                                   -6),
    ('Cargar el catálogo',             'trabada',   'El cliente todavía no mandó la planilla', -1),
    ('Armar la pantalla de pedido',    'en_curso',  null,                                    3),
    ('Probar con dos mayoristas',      'pendiente', null,                                    9)
  ) as t (titulo, estado, motivo, dias);

-- ── Una reunión ──────────────────────────────────────────────────────────────
with r as (
  insert into public.reuniones (titulo, inicia_el, duracion_min, con_quien, lugar, consulta_id, creado_por)
  select 'Diagnóstico — Distribuidora Demo',
         date_trunc('hour', now()) + interval '1 day 2 hours', 30, 'Rosa Ficticia',
         'https://meet.example.test/demo',
         (select id from public.consultas where nombre = 'Rosa Ficticia'), id
    from public.socios where email = :'email'
  returning id, creado_por
)
insert into public.reunion_participantes (reunion_id, socio_id)
select id, creado_por from r;
