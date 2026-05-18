-- ════════════════════════════════════════════════════════════════
-- ArcadeZone — Veritabanı Şeması
-- PostgreSQL (Supabase)
-- ════════════════════════════════════════════════════════════════

-- 1) PLAYERS TABLOSU
-- Supabase Auth ile entegre: auth.users tablosuna FK ile bağlı
create table public.players (
  id          uuid primary key references auth.users(id) on delete cascade,
  username    text unique not null,
  level       int not null default 1,
  coins       int not null default 0,
  avatar_url  text,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

-- 2) GAMES TABLOSU
-- 3 oyunun tanımı (reaction, memory, sonsaniye)
create table public.games (
  id            text primary key,
  name          text not null,
  score_label   text not null,
  lower_better  boolean not null default false,
  description   text
);

-- 3) GAME_SESSIONS TABLOSU
-- Her oynanan oyun burada kayıt altına alınır
create table public.game_sessions (
  id          bigserial primary key,
  player_id   uuid not null references public.players(id) on delete cascade,
  game_id     text not null references public.games(id),
  score       int not null,
  played_at   timestamptz not null default now()
);

-- Performans için index'ler
create index idx_sessions_player on public.game_sessions(player_id);
create index idx_sessions_game on public.game_sessions(game_id);
create index idx_sessions_score on public.game_sessions(game_id, score);

-- 4) LEADERBOARD VIEW
-- Frontend bu view'ı çekerek lider tablosunu gösterir
create or replace view public.leaderboard_view as
select
  gs.game_id,
  g.name           as game_name,
  g.score_label,
  p.id             as player_id,
  p.username,
  p.avatar_url,
  case
    when g.lower_better then min(gs.score)
    else max(gs.score)
  end              as best_score,
  count(*)         as total_plays
from public.game_sessions gs
join public.games g   on g.id = gs.game_id
join public.players p on p.id = gs.player_id
group by gs.game_id, g.name, g.score_label, g.lower_better, p.id, p.username, p.avatar_url;