-- ════════════════════════════════════════════════════════════════
-- Başlangıç Verileri — 3 Oyun
-- ════════════════════════════════════════════════════════════════

insert into public.games (id, name, score_label, lower_better, description) values
  ('reaction',  'Reaction Tap', 'ms',     true,  'Hızlı tepki verme oyunu'),
  ('memory',    'Memory Match', 'moves',  true,  'Kart eşleştirme oyunu'),
  ('sonsaniye', 'Son Saniye',   'points', false, 'Karışık harfli kelime çözme oyunu');