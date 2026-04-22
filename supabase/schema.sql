create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

alter table public.profiles enable row level security;

create or replace function public.set_current_timestamp_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = timezone('utc', now());
  return new;
end;
$$;

drop trigger if exists set_profiles_updated_at on public.profiles;
create trigger set_profiles_updated_at
before update on public.profiles
for each row
execute function public.set_current_timestamp_updated_at();

create or replace function public.handle_new_user_profile()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, display_name)
  values (
    new.id,
    coalesce(new.raw_user_meta_data ->> 'full_name', new.raw_user_meta_data ->> 'name')
  )
  on conflict (id) do nothing;

  return new;
end;
$$;

drop trigger if exists on_auth_user_created_profile on auth.users;
create trigger on_auth_user_created_profile
after insert on auth.users
for each row
execute function public.handle_new_user_profile();

drop policy if exists "Profiles are readable by owner" on public.profiles;
create policy "Profiles are readable by owner"
on public.profiles
for select
using (auth.uid() = id);

drop policy if exists "Profiles are insertable by owner" on public.profiles;
create policy "Profiles are insertable by owner"
on public.profiles
for insert
with check (auth.uid() = id);

drop policy if exists "Profiles are updatable by owner" on public.profiles;
create policy "Profiles are updatable by owner"
on public.profiles
for update
using (auth.uid() = id)
with check (auth.uid() = id);

comment on table public.profiles is 'Minimal profile table for Snake Me auth. Future cloud save, synced settings, progression, achievements, and leaderboards should be modeled in separate tables.';

create table if not exists public.user_settings (
  user_id uuid primary key references public.profiles(id) on delete cascade,
  difficulty text not null default 'medium',
  theme text not null default 'neon',
  snake_skin text not null default 'classic',
  control_layout text not null default 'classic',
  control_size text not null default 'medium',
  control_side text not null default 'center',
  audio_muted boolean not null default false,
  gadget_tips_disabled boolean not null default false,
  reduced_motion boolean not null default false,
  board_background_source text,
  updated_at timestamptz not null default timezone('utc', now())
);

alter table public.user_settings enable row level security;

drop trigger if exists set_user_settings_updated_at on public.user_settings;
create trigger set_user_settings_updated_at
before update on public.user_settings
for each row
execute function public.set_current_timestamp_updated_at();

drop policy if exists "Settings are readable by owner" on public.user_settings;
create policy "Settings are readable by owner"
on public.user_settings
for select
using (auth.uid() = user_id);

drop policy if exists "Settings are insertable by owner" on public.user_settings;
create policy "Settings are insertable by owner"
on public.user_settings
for insert
with check (auth.uid() = user_id);

drop policy if exists "Settings are updatable by owner" on public.user_settings;
create policy "Settings are updatable by owner"
on public.user_settings
for update
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

comment on table public.user_settings is 'Synced user settings for authenticated Snake Me players. URL/preset board backgrounds only in phase 1.';

create table if not exists public.user_progress (
  user_id uuid primary key references public.profiles(id) on delete cascade,
  xp integer not null default 0,
  level integer not null default 1,
  best_score integer not null default 0,
  best_level integer not null default 1,
  total_runs integer not null default 0,
  total_score bigint not null default 0,
  total_fruit integer not null default 0,
  total_enemy_kills integer not null default 0,
  total_obstacle_breaks integer not null default 0,
  total_pickups integer not null default 0,
  total_portals integer not null default 0,
  total_shots integer not null default 0,
  total_play_seconds integer not null default 0,
  achievements jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default timezone('utc', now())
);

alter table public.user_progress enable row level security;

drop trigger if exists set_user_progress_updated_at on public.user_progress;
create trigger set_user_progress_updated_at
before update on public.user_progress
for each row
execute function public.set_current_timestamp_updated_at();

drop policy if exists "Progress is readable by owner" on public.user_progress;
create policy "Progress is readable by owner"
on public.user_progress
for select
using (auth.uid() = user_id);

drop policy if exists "Progress is insertable by owner" on public.user_progress;
create policy "Progress is insertable by owner"
on public.user_progress
for insert
with check (auth.uid() = user_id);

drop policy if exists "Progress is updatable by owner" on public.user_progress;
create policy "Progress is updatable by owner"
on public.user_progress
for update
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

comment on table public.user_progress is 'Synced progression totals for authenticated Snake Me players. Mirrors the local progression profile shape in phase 1.';

create table if not exists public.run_history (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  score integer not null,
  level integer not null,
  duration_ms integer not null default 0,
  xp_earned integer not null default 0,
  difficulty text not null,
  created_at timestamptz not null default timezone('utc', now())
);

create index if not exists run_history_user_id_created_at_idx
on public.run_history (user_id, created_at desc);

alter table public.run_history enable row level security;

drop policy if exists "Run history is readable by owner" on public.run_history;
create policy "Run history is readable by owner"
on public.run_history
for select
using (auth.uid() = user_id);

drop policy if exists "Run history is insertable by owner" on public.run_history;
create policy "Run history is insertable by owner"
on public.run_history
for insert
with check (auth.uid() = user_id);

comment on table public.run_history is 'Recent authenticated run summaries for the minimal account dashboard.';
