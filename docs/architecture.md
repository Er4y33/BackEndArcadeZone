# ArcadeZone — Mimari Açıklama

## Backend Stratejisi

Bu proje, klasik bir Node.js/NestJS backend yerine **Backend-as-a-Service (BaaS)** 
yaklaşımı olan **Supabase** kullanmaktadır. Supabase altında PostgreSQL veritabanı, 
otomatik REST API, Authentication ve Row Level Security özellikleri yer almaktadır.

## Teknoloji Seçimi

| Katman | Teknoloji | Sebep |
|--------|-----------|-------|
| Veritabanı | PostgreSQL 15 (Supabase) | İlişkisel veri, ACID uyumu |
| API | Supabase REST API (PostgREST) | Şemadan otomatik üretilen API |
| Auth | Supabase Auth | E-posta/Şifre + JWT |
| Güvenlik | Row Level Security (RLS) | Veritabanı seviyesinde yetkilendirme |

## Veritabanı Şeması

### Tablolar

**`players`** — Oyuncu profilleri
- `id` (uuid, PK, FK → auth.users)
- `username` (text, unique)
- `level`, `coins` (int)

**`games`** — Oyun tanımları
- `id` (text, PK) — 'reaction', 'memory', 'sonsaniye'
- `score_label` — 'ms', 'moves', 'points'
- `lower_better` — Düşük skor mu kazandırır?

**`game_sessions`** — Oynama kayıtları
- `id` (bigserial, PK)
- `player_id` (FK → players)
- `game_id` (FK → games)
- `score`, `played_at`

### İlişkiler

- `players` 1 — N `game_sessions` (Bir oyuncunun birden fazla skoru)
- `games` 1 — N `game_sessions` (Bir oyunun birden fazla skoru)

### View

**`leaderboard_view`** — Her oyun için her oyuncunun en iyi skorunu hesaplar.
`lower_better` değerine göre MIN veya MAX agregasyonu yapar.

## Güvenlik

Tüm tablolar üzerinde **Row Level Security (RLS)** aktiftir:
- Oyuncular tüm profilleri görebilir, sadece kendisininkini güncelleyebilir
- Skorlar herkese açıktır, ancak kullanıcı sadece kendi skorunu kaydedebilir
- `auth.uid()` fonksiyonu ile JWT'den gelen kullanıcı kimliği doğrulanır

## Eski NestJS Kodları

`src/` klasöründeki TypeORM entity'leri, projenin ilk fazında denenmiş ve 
veritabanı şemasının referans tasarımı olarak korunmuştur. Runtime'da bu kodlar 
çalışmamaktadır; gerçek backend Supabase üzerinde host edilmektedir.