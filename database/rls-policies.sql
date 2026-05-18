-- ════════════════════════════════════════════════════════════════
-- Row Level Security (RLS) — Güvenlik Kuralları
-- ════════════════════════════════════════════════════════════════

-- PLAYERS tablosu
alter table public.players enable row level security;

create policy "Herkes oyuncu profillerini görebilir"
  on public.players for select using (true);

create policy "Kullanıcı sadece kendi profilini oluşturabilir"
  on public.players for insert with check (auth.uid() = id);

create policy "Kullanıcı sadece kendi profilini güncelleyebilir"
  on public.players for update using (auth.uid() = id);

-- GAMES tablosu (herkese açık okuma, kimse yazamaz)
alter table public.games enable row level security;

create policy "Oyunlar herkese açık"
  on public.games for select using (true);

-- GAME_SESSIONS tablosu
alter table public.game_sessions enable row level security;

create policy "Tüm skorlar görüntülenebilir"
  on public.game_sessions for select using (true);

create policy "Kullanıcı sadece kendi skorunu kaydedebilir"
  on public.game_sessions for insert with check (auth.uid() = player_id);