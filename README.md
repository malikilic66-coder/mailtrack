# MailTrack

E-posta izleme sistemi - E-postalarınızın ne zaman okunduğunu takip edin.

## Özellikler

- 🔐 **Supabase Auth** ile kullanıcı kaydı ve girişi
- 📧 **E-posta takibi** - Her e-posta için benzersiz tracking pikseli
- 👁️ **1x1 Görünmez GIF** - E-postalara eklenebilen görünmez takip pikseli
- 🔔 **Gerçek zamanlı bildirimler** - E-postanız okunduğunda anında bildirim
- 📊 **Dashboard** - Tüm e-postalarınızı ve okuma istatistiklerini görün
- 🎨 **Minimal tasarım** - Google Antigravity tarzında modern arayüz

## Teknolojiler

### Frontend
- React 19 + Vite
- Tailwind CSS v4
- React Router v7
- Lucide React (ikonlar)
- Supabase JS Client

### Backend
- Express.js
- Supabase JS Client
- CORS

### Veritabanı
- Supabase (PostgreSQL)
- Row Level Security
- Realtime Subscriptions

## Kurulum

### 1. Supabase Projesi Oluşturun

1. [Supabase](https://supabase.com) hesabı oluşturun
2. Yeni bir proje oluşturun
3. `supabase/schema.sql` dosyasındaki SQL'i Supabase SQL editöründe çalıştırın
4. Proje ayarlarından API anahtarlarını alın

### 2. Frontend Kurulumu

```bash
cd frontend
cp .env.example .env
# .env dosyasını Supabase anahtarlarınızla güncelleyin
npm install
npm run dev
```

### 3. Backend Kurulumu

```bash
cd backend
cp .env.example .env
# .env dosyasını Supabase anahtarlarınızla güncelleyin
npm install
npm start
```

## Ortam Değişkenleri

### Frontend (.env)
```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
VITE_BACKEND_URL=http://localhost:3001
```

### Backend (.env)
```
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_KEY=your-service-role-key
PORT=3001
FRONTEND_URL=http://localhost:5173
```

## Kullanım

1. Kayıt olun veya giriş yapın
2. Dashboard'da "Yeni Piksel" butonuna tıklayın
3. E-posta konusu ve alıcı adresini girin
4. Oluşturulan HTML kodunu kopyalayın
5. E-posta içeriğinize yapıştırın ve gönderin
6. E-posta okunduğunda gerçek zamanlı bildirim alın

## API Endpoints

### Tracking Pixel
```
GET /track/:emailId
```
1x1 görünmez GIF döner ve okumayı kaydeder.

### Health Check
```
GET /health
```
API durumunu kontrol eder.

### Tracking Stats
```
GET /api/stats/:emailId
```
E-posta için açılma istatistiklerini döner.

## Lisans

MIT
