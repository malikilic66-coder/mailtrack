# 🚀 MailSight Launch Checklist

## 📋 Kurulum Öncesi

- [ ] Node.js 18+ yüklü
- [ ] npm veya yarn yüklü
- [ ] Supabase hesabı oluşturuldu
- [ ] Git repository hazır (opsiyonel)

## 🗄️ Supabase Kurulumu

### 1. Proje Oluşturma

- [ ] Supabase.com'da yeni proje oluştur
- [ ] Proje adını belirle: "MailSight" veya benzeri
- [ ] Region seç (kullanıcılara en yakın)
- [ ] Database şifresi kaydet

### 2. SQL Schema Çalıştırma

- [ ] Supabase Dashboard aç
- [ ] SQL Editor'e git
- [ ] `supabase/schema.sql` dosyasını kopyala
- [ ] SQL Editor'e yapıştır ve çalıştır (RUN)
- [ ] Hata olmadığını doğrula
- [ ] `supabase/test-queries.sql` ile test et

### 3. Realtime Ayarları

- [ ] Database → Replication menüsüne git
- [ ] `mailtrack_read_logs` tablosunu bul
- [ ] Realtime toggle'ını aktifleştir
- [ ] Save ile kaydet

### 4. Authentication Ayarları

- [ ] Authentication → Providers
- [ ] Email provider'ı enable et
- [ ] Email confirmation ayarı:
  - [ ] **Development**: Disable (hızlı test için)
  - [ ] **Production**: Enable (güvenlik için)
- [ ] Email templates'i özelleştir (opsiyonel)

### 5. API Keys

- [ ] Settings → API menüsüne git
- [ ] Project URL'i kopyala
- [ ] `anon` `public` key'i kopyala
- [ ] `service_role` `secret` key'i kopyala

## 💻 Lokal Kurulum

### 1. Proje Dosyalarını Hazırla

- [ ] Repository'yi clone et veya dosyaları indir
- [ ] Terminal'de proje klasörüne git

### 2. Environment Variables

- [ ] `.env.local` dosyasını aç
- [ ] Şu değerleri güncelle:
  ```env
  NEXT_PUBLIC_SUPABASE_URL=https://uwslxmciglqxpvfbgjzm.supabase.co
  NEXT_PUBLIC_SUPABASE_ANON_KEY=[BURAYA_ANON_KEY]
  SUPABASE_SERVICE_ROLE_KEY=[BURAYA_SERVICE_ROLE_KEY]
  NEXT_PUBLIC_APP_URL=http://localhost:3000
  ```

### 3. Bağımlılıkları Yükle

```bash
- [ ] npm install
```

Beklenen: 437+ paket yüklenmeli, birkaç deprecation warning normal

### 4. Build Test (Opsiyonel)

```bash
- [ ] npm run build
```

Hata varsa düzelt, yoksa devam et

## 🧪 İlk Test

### 1. Development Server

```bash
- [ ] npm run dev
```

Beklenen çıktı:
```
✓ Ready in Xms
○ Local:        http://localhost:3000
```

### 2. Landing Page Test

- [ ] Browser'da aç: http://localhost:3000
- [ ] Landing page görünüyor mu?
- [ ] Floating dots animasyonu çalışıyor mu?
- [ ] "Ücretsiz Başla" butonu var mı?

### 3. Register Test

- [ ] `/auth/register` sayfasına git
- [ ] Test email gir: `test@example.com`
- [ ] Şifre gir: `test123456`
- [ ] "Hesap Oluştur" butonuna tıkla
- [ ] Success mesajı görünüyor mu?
- [ ] Email geldi mi? (Confirmation açıksa)

### 4. Login Test

- [ ] Email doğruladıysan (veya disabled ise) login yap
- [ ] Dashboard'a yönlendiriliyor mu?
- [ ] Stats kartları görünüyor mu? (0/0/0/0)

### 5. Mail Tracking Test

- [ ] "Yeni İzleme Oluştur" butonuna tıkla
- [ ] Başlık gir: "Test Mail 1"
- [ ] "Oluştur" butonuna tıkla
- [ ] Modal kapanıyor mu?
- [ ] Liste'de mail görünüyor mu?

### 6. Pixel Test

- [ ] Mail'e tıkla → Detay modalı aç
- [ ] Pixel kodu kopyala
- [ ] Yeni tab'de pixel URL'i aç:
  ```
  http://localhost:3000/api/pixel/[kod].gif
  ```
- [ ] 1x1 beyaz/şeffaf image görünüyor mu?
- [ ] Dashboard'da "Okunan" sayısı 1 oldu mu?
- [ ] "Okuma Geçmişi" bölümünde log var mı?

### 7. Realtime Test

- [ ] İki browser tab aç (veya incognito)
- [ ] Birinde dashboard
- [ ] Diğerinde pixel URL'i yükle
- [ ] Dashboard'da otomatik güncelleniyor mu?
- [ ] Bildirim gösteriliyor mu?

## ✅ Supabase Dashboard Kontrolleri

### Database Tables

- [ ] `mailtrack_mail_items` → 1+ kayıt
- [ ] `mailtrack_tracking_pixels` → 1+ kayıt
- [ ] `mailtrack_read_logs` → 1+ kayıt

### Authentication

- [ ] Users listesinde test kullanıcısı var
- [ ] Email confirmed (veya disabled)

### Logs

- [ ] Logs → Real-time'da activity görünüyor
- [ ] Error log yok

## 🚢 Production Deploy (Opsiyonel)

### 1. Vercel Kurulumu

- [ ] Vercel hesabı oluştur
- [ ] GitHub/GitLab'a push et
- [ ] Vercel'de "New Project"
- [ ] Repository'yi seç
- [ ] Environment Variables ekle:
  - [ ] `NEXT_PUBLIC_SUPABASE_URL`
  - [ ] `NEXT_PUBLIC_SUPABASE_ANON_KEY`
  - [ ] `SUPABASE_SERVICE_ROLE_KEY`
  - [ ] `NEXT_PUBLIC_APP_URL` → Vercel domain
- [ ] Deploy

### 2. Supabase Production Ayarları

- [ ] Authentication → URL Configuration
- [ ] Site URL: `https://your-app.vercel.app`
- [ ] Redirect URLs:
  - [ ] `https://your-app.vercel.app/auth/callback`
  - [ ] `https://your-app.vercel.app/**`

### 3. Custom Domain (Opsiyonel)

- [ ] Vercel → Settings → Domains
- [ ] Custom domain ekle
- [ ] DNS ayarlarını yap
- [ ] SSL bekle (otomatik)
- [ ] `NEXT_PUBLIC_APP_URL` güncelle

## 🐛 Sorun Giderme

### "Module not found: @supabase/ssr"

```bash
npm install @supabase/ssr
```

### "Supabase client is not defined"

- [ ] `.env.local` dosyasını kontrol et
- [ ] Dev server'ı yeniden başlat

### "Row Level Security" hatası

- [ ] SQL schema doğru çalıştı mı kontrol et
- [ ] RLS policies var mı?
- [ ] Test query ile doğrula

### Pixel yüklenmiyor

- [ ] API route çalışıyor mu?
- [ ] Console'da error var mı?
- [ ] Network tab'de request gidiyor mu?

### Realtime çalışmıyor

- [ ] Supabase → Replication aktif mi?
- [ ] Browser console'da connection var mı?
- [ ] Hard refresh dene (Ctrl+Shift+R)

## 📊 Final Verification

### Frontend

- [x] Landing page
- [x] Register page
- [x] Login page
- [x] Dashboard
- [x] Mail creation modal
- [x] Mail detail modal
- [x] Floating dots animation
- [x] Dark mode support
- [x] Responsive design

### Backend

- [x] Supabase connection
- [x] Auth flow
- [x] Database queries
- [x] Pixel tracking API
- [x] Realtime updates
- [x] RLS security

### Features

- [x] User registration
- [x] Email/password login
- [x] Password reset
- [x] Create tracking pixel
- [x] Copy pixel code
- [x] Track email opens
- [x] View statistics
- [x] Device detection
- [x] Real-time notifications
- [x] Read history logs

## 🎉 Launch!

Tüm checklistler tamamlandıysa:

```bash
🚀 MailSight başarıyla çalışıyor!
```

### Sonraki Adımlar:

1. **Beta Kullanıcıları**: Arkadaşlarınızı davet edin
2. **Feedback**: Kullanıcı geri bildirimlerini toplayın
3. **İyileştirmeler**: Roadmap'teki özellikleri ekleyin
4. **Marketing**: Landing page'i optimize edin
5. **Analytics**: Google Analytics veya Plausible ekleyin

---

**Mübarek olsun! 🎊**

MailSight artık canlıda! 🚀
