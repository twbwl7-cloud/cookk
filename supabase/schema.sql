-- LALIBAKERY commerce + hybrid cake builder specs
-- Run in Supabase SQL editor when connecting production DB.

create extension if not exists "pgcrypto";

create table if not exists products (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  category text not null check (category in ('gan', 'misparim', 'meutzavot')),
  base_price_ils int not null,
  active boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists product_variants (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references products(id) on delete cascade,
  sku text unique not null,
  label text not null,
  price_ils int not null,
  stock int not null default 0
);

create table if not exists orders (
  id uuid primary key default gen_random_uuid(),
  order_number text unique not null,
  guest_name text not null,
  guest_phone text not null,
  guest_email text,
  total_ils int not null,
  status text not null default 'pending',
  created_at timestamptz not null default now()
);

-- order_lines.custom_spec holds CakeCustomSpec JSON including hybrid fusion
create table if not exists order_lines (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references orders(id) on delete cascade,
  product_id uuid references products(id),
  variant_id uuid references product_variants(id),
  quantity int not null default 1,
  unit_price_ils int not null,
  line_total_ils int not null,
  custom_spec jsonb not null default '{}'::jsonb
  -- expected keys when hybrid:
  -- {
  --   "kind": "hybrid",
  --   "hybridMode": true,
  --   "baseStyle": { "category","frost","piping","accents","label" },
  --   "secondaryStyle": { ... },
  --   "fusionRatio": 0.55,
  --   "plaqueText": "",
  --   "numbersText": "",
  --   "sugarSheet": false,
  --   "sugarNote": "",
  --   "notes": ""
  -- }
);

create index if not exists order_lines_spec_gin on order_lines using gin (custom_spec);

comment on column order_lines.custom_spec is
  'CakeCustomSpec: hybridMode, baseStyle, secondaryStyle, fusionRatio, plaque, sugar';
