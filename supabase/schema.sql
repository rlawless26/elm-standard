-- Elm Standard — quote_requests table + RLS
-- Idempotent: safe to re-run. Paste into Supabase SQL Editor.

create extension if not exists "pgcrypto";

create table if not exists public.quote_requests (
  id              uuid primary key default gen_random_uuid(),
  created_at      timestamptz not null default now(),
  name            text not null,
  email           text not null,
  zip_code        text not null,
  style           text not null check (style in ('traditional','shaker','modern')),
  screen          text not null check (screen in ('grecian','cloverleaf','windsor','grecian-brass')),
  paint_color     text not null check (paint_color in ('super-white','paper-white','chantilly-lace','custom')),
  length_in       numeric not null check (length_in > 0),
  depth_in        numeric not null check (depth_in > 0),
  height_in       numeric not null check (height_in > 0),
  delivery        text not null check (delivery in ('local','flatpack')),
  notes           text,
  status          text not null default 'new'
                  check (status in ('new','quoted','accepted','in_build','delivered','cancelled')),
  internal_notes  text
);

create index if not exists quote_requests_created_at_idx on public.quote_requests (created_at desc);
create index if not exists quote_requests_status_idx     on public.quote_requests (status);

-- Lock down: RLS on, no policies = deny by default for anon/authenticated.
-- The API route uses the service role key, which bypasses RLS.
alter table public.quote_requests enable row level security;
