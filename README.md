# 📧 MailSight - Email Tracking System

Modern, minimalist ve Google Antigravity tarzında tasarlanmış e-posta izleme platformu.

## 🚀 Özellikler

- ✅ **Gerçek Zamanlı İzleme**: E-postalar açıldığı anda bildirim
- 📊 **Detaylı Analitik**: Cihaz, tarayıcı, konum ve zaman bilgileri
- 🎨 **Minimal Tasarım**: Google Antigravity benzeri temiz UI
- 🔐 **Güvenli**: Supabase Auth ile tam güvenlik
- ⚡ **Hızlı**: Next.js 14 App Router ile optimize edilmiş
- 📱 **Responsive**: Tüm cihazlarda mükemmel görünüm

## 🛠 Teknoloji Stack

- **Frontend**: Next.js 14 (App Router), React, TypeScript
- **Styling**: Tailwind CSS
- **Backend**: Supabase (PostgreSQL + Auth + Realtime)
- **Icons**: Lucide React
- **Charts**: Recharts
- **Date**: date-fns

## 📋 Kurulum

### 1. Bağımlılıkları Yükleyin

```bash
npm install
```

### 2. Supabase Veritabanını Oluşturun

Supabase Dashboard'da SQL Editor'ü açın ve `supabase/schema.sql` dosyasındaki SQL kodunu çalıştırın.

### 3. Environment Variables

`.env.local` dosyası zaten oluşturuldu. Gerekli tüm değerler mevcut:

```env
NEXT_PUBLIC_SUPABASE_URL=https://uwslxmciglqxpvfbgjzm.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 4. Development Server'ı Başlatın

```bash
npm run dev
```

Uygulama http://localhost:3000 adresinde çalışacak.

## 📊 Veritabanı Yapısı

### Tablolar

1. **mailtrack_mail_items**: Mail izleme kayıtları
2. **mailtrack_tracking_pixels**: Tracking pixel URL'leri
3. **mailtrack_read_logs**: Her pixel yüklendiğinde log kaydı

### Önemli Özellikler

- **Row Level Security (RLS)**: Kullanıcılar sadece kendi verilerini görebilir
- **Triggers**: Mail durumu otomatik güncellenir
- **Realtime**: Anlık bildirimler için Supabase Realtime
- **Views**: Dashboard istatistikleri için optimize edilmiş viewlar

## 🔧 Supabase Ayarları

### 1. SQL Schema'yı Çalıştırın

Supabase Dashboard → SQL Editor:

```sql
-- supabase/schema.sql dosyasındaki tüm kodu yapıştırın
```

### 2. Realtime'ı Aktifleştirin

Supabase Dashboard → Database → Replication:

- `mailtrack_read_logs` tablosunu Realtime için etkinleştirin

### 3. Email Authentication

Supabase Dashboard → Authentication → Providers:

- Email provider'ı etkinleştirin
- Email confirmation'ı ayarlayın (opsiyonel)

## 📱 Kullanım

### 1. Kayıt Olun

```
/auth/register
```

### 2. Dashboard'a Gidin

```
/dashboard
```

### 3. Yeni İzleme Oluşturun

- "Yeni İzleme Oluştur" butonuna tıklayın
- Mail başlığı girin
- Pixel kodunu kopyalayın

### 4. E-postanıza Ekleyin

Kopyalanan HTML kodunu e-postanızın en altına yapıştırın:

```html
<img src="https://your-domain.com/api/pixel/XXXXXX.gif" width="1" height="1" style="display:none" alt="" />
```

### 5. İzleyin

E-posta açıldığında dashboard'da gerçek zamanlı bildirim alacaksınız!

## 🎨 UI/UX Özellikleri

- **Floating Dots Animation**: Google Antigravity benzeri arka plan
- **Minimalist Kartlar**: Temiz, sade tasarım
- **Dark Mode**: Otomatik sistem teması desteği
- **Responsive**: Mobil-first tasarım
- **Smooth Transitions**: Tüm etkileşimlerde akıcı animasyonlar

## 🔐 Güvenlik

- ✅ Row Level Security (RLS) tüm tablolarda aktif
- ✅ JWT token bazlı authentication
- ✅ Service role key sadece API route'larında
- ✅ IP maskeleme (GDPR uyumlu)
- ✅ XSS koruması

## 📈 API Endpoints

### Tracking Pixel

```
GET /api/pixel/[code].gif
```

- Tracking pixel'i yükler
- Read log kaydı oluşturur
- User agent parse eder
- 1x1 transparent GIF döner

## 🚀 Production Deploy

### Vercel Deploy

```bash
npm run build
vercel --prod
```

### Environment Variables (Production)

Vercel Dashboard'da şunları ekleyin:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `NEXT_PUBLIC_APP_URL` (production domain)

## 📝 SQL Schema Özeti

Veritabanı yapısı `supabase/schema.sql` dosyasında:

- ✅ 3 Ana Tablo (mail_items, tracking_pixels, read_logs)
- ✅ RLS Policies
- ✅ Triggers (otomatik güncelleme)
- ✅ Views (istatistikler için)
- ✅ Indexes (performans için)
- ✅ Functions (helper fonksiyonlar)

## 🎯 Roadmap

- [ ] E-posta şablonları
- [ ] Bulk tracking pixel oluşturma
- [ ] CSV export
- [ ] Webhook entegrasyonları
- [ ] API key yönetimi
- [ ] Team collaboration

## 📄 Lisans

MIT License - Kullanım için tamamen özgür!

## 🤝 Katkıda Bulunma

Pull request'ler memnuniyetle karşılanır!

## 📞 Destek

Sorularınız için: support@mailsight.com

---

**MailSight** - E-posta takibini basit hale getirin 🚀
