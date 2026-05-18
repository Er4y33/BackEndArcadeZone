# API Uç Noktaları

Supabase, şemadan otomatik olarak REST API üretir. Tüm endpoint'ler
`https://fqkywfhkzwgoinhjcfoc.supabase.co/rest/v1/` altında yer alır.

## Authentication

| Endpoint | Method | Açıklama |
|----------|--------|----------|
| `/auth/v1/signup` | POST | Yeni kullanıcı kaydı |
| `/auth/v1/token?grant_type=password` | POST | Giriş yapma |
| `/auth/v1/logout` | POST | Çıkış yapma |

## Players

| Endpoint | Method | Açıklama |
|----------|--------|----------|
| `/rest/v1/players` | GET | Tüm oyuncuları listele |
| `/rest/v1/players?id=eq.{uuid}` | GET | Tek bir oyuncu |
| `/rest/v1/players` | PATCH | Profil güncelle (auth gerekli) |

## Games

| Endpoint | Method | Açıklama |
|----------|--------|----------|
| `/rest/v1/games` | GET | Tüm oyunları listele |
| `/rest/v1/games?id=eq.reaction` | GET | Tek bir oyun |

## Game Sessions

| Endpoint | Method | Açıklama |
|----------|--------|----------|
| `/rest/v1/game_sessions` | POST | Yeni skor kaydet (auth gerekli) |
| `/rest/v1/game_sessions?player_id=eq.{uuid}` | GET | Oyuncunun skorları |

## Leaderboard

| Endpoint | Method | Açıklama |
|----------|--------|----------|
| `/rest/v1/leaderboard_view?game_id=eq.reaction&order=best_score.asc` | GET | Reaction lider tablosu |
| `/rest/v1/leaderboard_view?game_id=eq.sonsaniye&order=best_score.desc` | GET | Son Saniye lider tablosu |