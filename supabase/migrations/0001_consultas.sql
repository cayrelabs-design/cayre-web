-- =============================================================================
-- 0001 — Consultas del formulario de contacto
-- =============================================================================
-- Única tabla del sitio. Guarda lo que deja quien escribe desde la web.
--
-- Seguridad: RLS activo y SIN NINGUNA POLÍTICA. Eso no es un olvido: con RLS
-- encendido y cero políticas, los roles `anon` y `authenticated` no pueden
-- leer ni escribir nada. La web escribe desde el servidor con la clave
-- secreta, que es el rol `service_role` y no pasa por RLS.
--
-- Consecuencia buscada: aunque la clave pública quede expuesta en el navegador
-- —que es su naturaleza—, nadie puede leer los datos de contacto de la gente
-- que te escribió.
-- =============================================================================

create table if not exists public.consultas (
  id          bigint generated always as identity primary key,
  nombre      text not null,
  empresa     text,
  telefono    text,
  email       text,
  mensaje     text not null,
  -- Resumen irreversible de la IP. Sirve para frenar envíos en masa sin
  -- guardar el dato personal.
  ip_hash     text,
  atendida_el timestamptz,
  created_at  timestamptz not null default now()
);

create index if not exists consultas_fecha_idx on public.consultas (created_at desc);
create index if not exists consultas_ip_idx on public.consultas (ip_hash, created_at desc);

alter table public.consultas enable row level security;

comment on table public.consultas is
  'Consultas del formulario de la web. RLS sin políticas a propósito: solo entra y sale por service_role desde el servidor.';
