-- Apartment Funds database
create extension if not exists pgcrypto;

create table if not exists public.flats (
  id uuid primary key default gen_random_uuid(),
  flat_no text unique not null,
  owner_name text not null,
  phone text,
  monthly_maintenance numeric(12,2) not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.payments (
  id uuid primary key default gen_random_uuid(),
  flat_id uuid not null references public.flats(id) on delete cascade,
  amount numeric(12,2) not null check (amount >= 0),
  payment_date date not null,
  month text not null,
  status text not null default 'paid' check (status in ('paid','pending','cancelled')),
  reference text,
  created_at timestamptz not null default now()
);

create table if not exists public.expenses (
  id uuid primary key default gen_random_uuid(),
  category text not null,
  description text,
  vendor text,
  amount numeric(12,2) not null check (amount >= 0),
  expense_date date not null,
  created_at timestamptz not null default now()
);

create table if not exists public.funds (
  id uuid primary key default gen_random_uuid(),
  name text unique not null,
  balance numeric(12,2) not null default 0,
  description text,
  created_at timestamptz not null default now()
);

alter table public.flats enable row level security;
alter table public.payments enable row level security;
alter table public.expenses enable row level security;
alter table public.funds enable row level security;

-- MVP policy: only authenticated apartment users can access data.
create policy "authenticated flats" on public.flats for all to authenticated using (true) with check (true);
create policy "authenticated payments" on public.payments for all to authenticated using (true) with check (true);
create policy "authenticated expenses" on public.expenses for all to authenticated using (true) with check (true);
create policy "authenticated funds" on public.funds for all to authenticated using (true) with check (true);

-- Starter data
insert into public.funds(name,balance,description)
values ('Corpus Fund',0,'Apartment reserve/corpus fund')
on conflict (name) do nothing;