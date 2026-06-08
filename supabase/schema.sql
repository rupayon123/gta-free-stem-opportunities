-- GTA FREE STEM Opportunities beta schema.
-- Supabase Auth handles email verification and password storage. Public browsing
-- remains account-free; accounts are only for saves, feedback, missing-program
-- submissions, and admin review.

create extension if not exists pgcrypto;
create extension if not exists postgis;
create extension if not exists pg_trgm;

do $$ begin
  create type public.account_type as enum ('parent', 'student', 'admin');
exception when duplicate_object then null;
end $$;

do $$ begin
  create type public.opportunity_status as enum ('active', 'expired', 'needs_review', 'hidden');
exception when duplicate_object then null;
end $$;

do $$ begin
  create type public.feedback_status as enum ('new', 'reviewed', 'resolved', 'archived');
exception when duplicate_object then null;
end $$;

do $$ begin
  create type public.missing_opportunity_status as enum ('new', 'reviewing', 'approved', 'rejected', 'duplicate');
exception when duplicate_object then null;
end $$;

do $$ begin
  create type public.announcement_status as enum ('active', 'archived');
exception when duplicate_object then null;
end $$;

do $$ begin
  create type public.gta_region as enum ('Toronto', 'Peel', 'York', 'Durham', 'Halton');
exception when duplicate_object then null;
end $$;

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null unique,
  full_name text not null,
  account_type public.account_type not null default 'parent',
  optional_grade text,
  language_code text not null default 'en',
  theme text not null default 'system',
  rough_postal_area text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.opportunities (
  id text primary key default gen_random_uuid()::text,
  title text not null,
  organization text not null,
  description text not null,
  city text not null,
  region public.gta_region not null,
  age_min int not null check (age_min >= 0),
  age_max int check (age_max is null or age_max >= age_min),
  category text not null,
  cost text not null default 'Free to join' check (cost = 'Free to join'),
  language text[] not null default '{en}',
  deadline timestamptz,
  start_date timestamptz not null,
  end_date timestamptz,
  source_url text not null,
  last_checked date not null,
  last_seen date not null,
  status public.opportunity_status not null default 'needs_review',
  tags text[] not null default '{}',
  address text,
  location geography(point, 4326),
  created_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  search_vector tsvector generated always as (
    setweight(to_tsvector('english', coalesce(title, '')), 'A') ||
    setweight(to_tsvector('english', coalesce(organization, '')), 'A') ||
    setweight(to_tsvector('english', coalesce(description, '')), 'B') ||
    setweight(to_tsvector('english', coalesce(city, '')), 'C') ||
    setweight(to_tsvector('english', coalesce(category, '') || ' ' || array_to_string(tags, ' ')), 'C')
  ) stored
);

create table if not exists public.saved_opportunities (
  user_id uuid not null references auth.users(id) on delete cascade,
  opportunity_id text not null,
  created_at timestamptz not null default now(),
  primary key (user_id, opportunity_id)
);

create table if not exists public.feedback (
  id text primary key default gen_random_uuid()::text,
  opportunity_id text,
  user_id uuid references auth.users(id) on delete set null,
  name text,
  email text,
  message text not null,
  status public.feedback_status not null default 'new',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.missing_opportunity_submissions (
  id text primary key default gen_random_uuid()::text,
  title text not null,
  organization text,
  city text,
  region public.gta_region,
  source_url text,
  contact_email text,
  notes text not null,
  status public.missing_opportunity_status not null default 'new',
  user_id uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.announcements (
  id text primary key default gen_random_uuid()::text,
  title text not null,
  message text not null,
  status public.announcement_status not null default 'active',
  created_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists opportunities_status_dates_idx on public.opportunities(status, start_date, end_date, deadline);
create index if not exists opportunities_region_city_idx on public.opportunities(region, city);
create index if not exists opportunities_location_idx on public.opportunities using gist(location);
create index if not exists opportunities_search_idx on public.opportunities using gin(search_vector);
create index if not exists opportunities_title_trgm_idx on public.opportunities using gin(title gin_trgm_ops);
create index if not exists feedback_status_idx on public.feedback(status, created_at desc);
create index if not exists missing_submission_status_idx on public.missing_opportunity_submissions(status, created_at desc);
create index if not exists announcements_status_idx on public.announcements(status, created_at desc);

drop trigger if exists profiles_updated_at on public.profiles;
create trigger profiles_updated_at
before update on public.profiles
for each row execute function public.set_updated_at();

drop trigger if exists opportunities_updated_at on public.opportunities;
create trigger opportunities_updated_at
before update on public.opportunities
for each row execute function public.set_updated_at();

drop trigger if exists feedback_updated_at on public.feedback;
create trigger feedback_updated_at
before update on public.feedback
for each row execute function public.set_updated_at();

drop trigger if exists missing_opportunity_submissions_updated_at on public.missing_opportunity_submissions;
create trigger missing_opportunity_submissions_updated_at
before update on public.missing_opportunity_submissions
for each row execute function public.set_updated_at();

drop trigger if exists announcements_updated_at on public.announcements;
create trigger announcements_updated_at
before update on public.announcements
for each row execute function public.set_updated_at();

create or replace function public.handle_new_user_profile()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  requested_account_type text := new.raw_user_meta_data ->> 'account_type';
begin
  insert into public.profiles (id, email, full_name, account_type, optional_grade)
  values (
    new.id,
    coalesce(new.email, ''),
    coalesce(new.raw_user_meta_data ->> 'full_name', 'GTA STEM user'),
    case
      when requested_account_type in ('parent', 'student') then requested_account_type::public.account_type
      else 'parent'::public.account_type
    end,
    nullif(new.raw_user_meta_data ->> 'optional_grade', '')
  )
  on conflict (id) do update
    set email = excluded.email,
        full_name = excluded.full_name,
        optional_grade = excluded.optional_grade;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row execute function public.handle_new_user_profile();

create or replace function public.is_admin()
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select exists (
    select 1 from public.profiles
    where profiles.id = auth.uid()
      and profiles.account_type = 'admin'
  );
$$;

alter table public.profiles enable row level security;
alter table public.opportunities enable row level security;
alter table public.saved_opportunities enable row level security;
alter table public.feedback enable row level security;
alter table public.missing_opportunity_submissions enable row level security;
alter table public.announcements enable row level security;

drop policy if exists "Profiles are readable by owner" on public.profiles;
create policy "Profiles are readable by owner"
  on public.profiles for select
  using (auth.uid() = id);

drop policy if exists "Profiles are insertable by owner without admin role" on public.profiles;
create policy "Profiles are insertable by owner without admin role"
  on public.profiles for insert
  with check (auth.uid() = id and account_type in ('parent', 'student'));

drop policy if exists "Profiles are updatable by owner without admin role" on public.profiles;
create policy "Profiles are updatable by owner without admin role"
  on public.profiles for update
  using (auth.uid() = id)
  with check (auth.uid() = id and account_type in ('parent', 'student'));

drop policy if exists "Admins can manage profiles" on public.profiles;
create policy "Admins can manage profiles"
  on public.profiles for all
  using (public.is_admin())
  with check (public.is_admin());

drop policy if exists "Active opportunities are public" on public.opportunities;
create policy "Active opportunities are public"
  on public.opportunities for select
  using (
    status = 'active'
    and coalesce(end_date, deadline, start_date) >= (now() - interval '1 day')
  );

drop policy if exists "Admins can manage opportunities" on public.opportunities;
create policy "Admins can manage opportunities"
  on public.opportunities for all
  using (public.is_admin())
  with check (public.is_admin());

drop policy if exists "Users can read own saves" on public.saved_opportunities;
create policy "Users can read own saves"
  on public.saved_opportunities for select
  using (auth.uid() = user_id);

drop policy if exists "Users can insert own saves" on public.saved_opportunities;
create policy "Users can insert own saves"
  on public.saved_opportunities for insert
  with check (auth.uid() = user_id);

drop policy if exists "Users can delete own saves" on public.saved_opportunities;
create policy "Users can delete own saves"
  on public.saved_opportunities for delete
  using (auth.uid() = user_id);

drop policy if exists "Anyone can insert feedback" on public.feedback;
create policy "Anyone can insert feedback"
  on public.feedback for insert
  with check (user_id is null or auth.uid() = user_id);

drop policy if exists "Users can read own feedback" on public.feedback;
create policy "Users can read own feedback"
  on public.feedback for select
  using (auth.uid() = user_id);

drop policy if exists "Admins can manage feedback" on public.feedback;
create policy "Admins can manage feedback"
  on public.feedback for all
  using (public.is_admin())
  with check (public.is_admin());

drop policy if exists "Anyone can insert missing opportunities" on public.missing_opportunity_submissions;
create policy "Anyone can insert missing opportunities"
  on public.missing_opportunity_submissions for insert
  with check (user_id is null or auth.uid() = user_id);

drop policy if exists "Users can read own missing submissions" on public.missing_opportunity_submissions;
create policy "Users can read own missing submissions"
  on public.missing_opportunity_submissions for select
  using (auth.uid() = user_id);

drop policy if exists "Admins can manage missing submissions" on public.missing_opportunity_submissions;
create policy "Admins can manage missing submissions"
  on public.missing_opportunity_submissions for all
  using (public.is_admin())
  with check (public.is_admin());

drop policy if exists "Active announcements are public" on public.announcements;
create policy "Active announcements are public"
  on public.announcements for select
  using (status = 'active');

drop policy if exists "Admins can manage announcements" on public.announcements;
create policy "Admins can manage announcements"
  on public.announcements for all
  using (public.is_admin())
  with check (public.is_admin());

-- First admin setup after creating/verifying your admin Auth user:
-- update public.profiles
-- set account_type = 'admin'
-- where email = 'admin@example.org';
