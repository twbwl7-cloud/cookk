-- LALIBAKERY Supabase schema (Option B — CMS + orders)
-- Apply in Supabase SQL editor before wiring the Next.js client.

create extension if not exists "pgcrypto";

create table if not exists products (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  short_description text,
  description text,
  category text not null check (category in ('gan','misparim','meutzavot','yom_huledet','business','custom_patisserie')),
  tags text[] default '{}',
  image_path text not null,
  image_credit text not null default 'real' check (image_credit in ('real','mockup')),
  featured boolean default false,
  shape text,
  active boolean default true,
  lead_days_min int not null default 3,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists product_variants (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references products(id) on delete cascade,
  label text not null,
  sku text unique not null,
  price_ils numeric(10,2) not null check (price_ils >= 0),
  compare_at_ils numeric(10,2),
  flavor_options jsonb default '[]',
  max_inscription_chars int default 40,
  active boolean default true
);

create table if not exists promotions (
  id uuid primary key default gen_random_uuid(),
  code text unique not null,
  percent_off numeric(5,2) not null check (percent_off >= 0 and percent_off <= 100),
  active boolean default true,
  starts_at timestamptz,
  ends_at timestamptz,
  applies_to text default 'subtotal'
);

create table if not exists daily_slots (
  id uuid primary key default gen_random_uuid(),
  slot_date date unique not null,
  max_complex_orders int not null default 5,
  reserved_count int not null default 0 check (reserved_count >= 0),
  pickup_windows jsonb not null default '["09:00-12:00","12:00-15:00","15:00-18:00"]',
  closed boolean default false
);

create table if not exists orders (
  id uuid primary key default gen_random_uuid(),
  order_number text unique not null,
  status text not null default 'received'
    check (status in ('received','in_baking','decorating','ready_for_pickup','cancelled')),
  customer_name text not null,
  phone text not null,
  email text not null,
  fulfillment text not null check (fulfillment in ('pickup','delivery')),
  slot_date date not null,
  slot_window text not null,
  address_city text,
  address_line text,
  notes text,
  allergy_flags text[] default '{}',
  coupon_code text,
  subtotal_ils numeric(10,2) not null,
  discount_ils numeric(10,2) not null default 0,
  shipping_ils numeric(10,2) not null default 0,
  total_ils numeric(10,2) not null,
  payment_method text not null,
  payment_status text not null default 'pending'
    check (payment_status in ('pending','paid','failed')),
  tranzila_ref text,
  idempotency_key text unique not null,
  whatsapp_notified_at timestamptz,
  user_id uuid,
  created_at timestamptz default now()
);

create table if not exists order_lines (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references orders(id) on delete cascade,
  line_type text not null check (line_type in ('catalog','custom_cake')),
  product_id uuid,
  variant_id uuid,
  title_snapshot text not null,
  quantity int not null check (quantity > 0 and quantity <= 20),
  unit_price_ils numeric(10,2) not null,
  line_total_ils numeric(10,2) not null,
  inscription text,
  flavor text,
  custom_spec jsonb
);

-- Internal reviews (Script 2 — no Yotpo/Loox in MVP). Moderation queue.
create table if not exists reviews (
  id uuid primary key default gen_random_uuid(),
  author_display text not null,
  city text,
  rating int not null check (rating >= 1 and rating <= 5),
  body text not null check (char_length(body) between 2 and 2000),
  product_slug text,
  source text not null default 'site'
    check (source in ('site','whatsapp','import')),
  verified_purchase boolean not null default false,
  status text not null default 'pending'
    check (status in ('pending','approved','rejected')),
  created_at timestamptz default now()
);

alter table products enable row level security;
alter table product_variants enable row level security;
alter table promotions enable row level security;
alter table daily_slots enable row level security;
alter table orders enable row level security;
alter table order_lines enable row level security;
alter table reviews enable row level security;

-- Public read for catalog + approved reviews only
create policy "public read products" on products for select using (active = true);
create policy "public read variants" on product_variants for select using (active = true);
create policy "public read promos" on promotions for select using (active = true);
create policy "public read approved reviews" on reviews
  for select using (status = 'approved');

-- Orders / review writes: service role only (no public insert of totals)
-- Use SUPABASE_SERVICE_ROLE_KEY from Next server actions.
