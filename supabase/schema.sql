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


-- =========================================================================
-- pricing_config: single-row table holding the formula knobs the admin can
-- edit without redeploying. The /quote page reads this to compute instant
-- prices; the formula lives in lib/pricing.ts.
--
-- Singleton enforced by the check constraint pinning id to a fixed UUID.
-- =========================================================================

create table if not exists public.pricing_config (
  id                          uuid        primary key default '00000000-0000-0000-0000-000000000001'::uuid,
  base_rate_per_sqin          numeric     not null default 0.35,
  shaker_multiplier           numeric     not null default 1.00,
  modern_multiplier           numeric     not null default 1.05,
  traditional_multiplier      numeric     not null default 1.15,
  brass_screen_upcharge       numeric     not null default 50,
  depth_threshold_in          numeric     not null default 9,
  depth_surcharge_per_inch    numeric     not null default 25,
  delivery_local_fee          numeric     not null default 400,
  delivery_flatpack_fee       numeric     not null default 300,
  material_spike_multiplier   numeric     not null default 1.00,
  price_floor                 numeric     not null default 350,
  dim_max_length_in           numeric     not null default 72,
  dim_max_height_in           numeric     not null default 48,
  dim_max_depth_in            numeric     not null default 18,
  updated_at                  timestamptz not null default now(),
  constraint pricing_config_singleton check (id = '00000000-0000-0000-0000-000000000001'::uuid)
);

-- Seed the singleton row if missing.
insert into public.pricing_config (id)
values ('00000000-0000-0000-0000-000000000001'::uuid)
on conflict (id) do nothing;

alter table public.pricing_config enable row level security;


-- =========================================================================
-- orders: confirmed orders that paid a deposit via Stripe Checkout. The
-- /api/checkout route creates a Stripe session, then either the Stripe
-- webhook (on checkout.session.completed) or the /quote/success page
-- inserts the row — whichever fires first. The unique constraint on
-- stripe_session_id makes both paths idempotent.
-- =========================================================================

create table if not exists public.orders (
  id                     uuid        primary key default gen_random_uuid(),
  created_at             timestamptz not null default now(),
  stripe_session_id      text        unique not null,
  stripe_payment_intent  text,
  total_price_cents      integer     not null check (total_price_cents > 0),
  deposit_paid_cents     integer     not null check (deposit_paid_cents > 0),
  balance_due_cents      integer     not null check (balance_due_cents >= 0),
  customer_email         text,
  customer_name          text,
  style                  text        not null check (style in ('traditional','shaker','modern')),
  screen                 text        not null check (screen in ('grecian','cloverleaf','windsor','grecian-brass')),
  paint_color            text        check (paint_color is null or paint_color in ('super-white','paper-white','chantilly-lace','custom')),
  length_in              numeric     not null check (length_in > 0),
  depth_in               numeric     not null check (depth_in > 0),
  height_in              numeric     not null check (height_in > 0),
  delivery               text        not null check (delivery in ('local','flatpack')),
  notes                  text,
  status                 text        not null default 'deposit_paid'
                         check (status in ('deposit_paid','in_build','ready','delivered','cancelled','refunded')),
  internal_notes         text
);

create index if not exists orders_created_at_idx on public.orders (created_at desc);
create index if not exists orders_status_idx     on public.orders (status);

alter table public.orders enable row level security;
