# 🎮 ArcadeZone — Backend

ArcadeZone mobil uygulamasının veritabanı ve backend altyapı dokümantasyonu.

## 📋 Genel Bakış

Bu repo, ArcadeZone projesinin **veritabanı tasarımını ve backend mimarisini** 
içermektedir. Runtime'da **Supabase (Backend-as-a-Service)** kullanılmaktadır.

## 🏗️ Mimari

- **Veritabanı:** PostgreSQL 15 (Supabase Cloud)
- **API:** Supabase REST API (PostgREST tabanlı, otomatik üretim)
- **Authentication:** Supabase Auth (JWT tabanlı)
- **Güvenlik:** PostgreSQL Row Level Security (RLS)

## 📁 Klasör Yapısı

```
BackEndArcadeZone/
├── database/                  # SQL şema dosyaları
│   ├── schema.sql             # Tablo tanımları + View
│   ├── rls-policies.sql       # Güvenlik kuralları
│   ├── functions-triggers.sql # Auth trigger
│   └── seed-data.sql          # Başlangıç verileri
├── docs/                      # Dokümantasyon
│   ├── ERD.png                # Veritabanı diyagramı
│   ├── architecture.md        # Mimari detayı
│   └── api-endpoints.md       # API kullanım rehberi
└── src/                       # NestJS referans kodları (kullanılmıyor)
```

## 🚀 Kurulum

### Supabase Üzerinde Kurulum

1. https://supabase.com adresinden yeni bir proje oluşturun
2. SQL Editor'a gidin
3. Aşağıdaki SQL dosyalarını sırayla çalıştırın:
   - `database/schema.sql`
   - `database/rls-policies.sql`
   - `database/functions-triggers.sql`
   - `database/seed-data.sql`
4. **Settings → API** sayfasından `Project URL` ve `anon key` bilgilerini alın
5. Frontend reposundaki `.env` dosyasına ekleyin

## 🔐 Güvenlik

- Tüm tablolarda **Row Level Security (RLS)** aktiftir
- Kullanıcılar sadece kendi skorlarını ekleyebilir
- `auth.uid()` ile JWT doğrulaması yapılır

## 🎯 Frontend Entegrasyonu

Frontend repo: [MobilAppArcadeZone](https://github.com/MelihAtahanAkgun/MobilAppArcadeZone)

## 👥 Geliştiriciler

- **Eray** — Backend & Veritabanı
- **Melih Atahan Akgün** — Frontend & UI/UX
