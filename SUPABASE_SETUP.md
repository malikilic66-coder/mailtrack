-- ========================================
-- SUPABASE KURULUM KILAVUZU
-- ========================================

## 1. Supabase Projesi Oluşturma

1. https://supabase.com adresine gidin
2. Yeni bir proje oluşturun
3. Proje bilgilerini kaydedin:
   - Project URL
   - Anon Key
   - Service Role Key

## 2. SQL Schema'yı Çalıştırma

1. Supabase Dashboard açın
2. Sol menüden **SQL Editor** seçin
3. **New Query** butonuna tıklayın
4. `supabase/schema.sql` dosyasının tamamını kopyalayın
5. SQL Editor'e yapıştırın
6. **RUN** butonuna tıklayın

### Beklenen Sonuç:

```
✅ 3 tablo oluşturuldu
✅ 12+ index oluşturuldu
✅ 2 trigger oluşturuldu
✅ 2 view oluşturuldu
✅ 2 function oluşturuldu
✅ RLS policies oluşturuldu
```

## 3. Realtime Etkinleştirme

1. Sol menüden **Database** → **Replication**
2. `mailtrack_read_logs` tablosunu bulun
3. Sağdaki toggle'ı açın (Enable)
4. Save değişikliklerini kaydedin

## 4. Email Authentication Ayarları

1. Sol menüden **Authentication** → **Providers**
2. **Email** provider'ı bulun
3. **Enable Email provider** toggle'ı açın
4. **Confirm email** ayarını isteğe göre yapın:
   - Enabled: Kullanıcılar email doğrulaması yapmalı
   - Disabled: Hemen giriş yapabilir (test için kolaylık)

## 5. Environment Variables

`.env.local` dosyasını güncelleyin:

```env
NEXT_PUBLIC_SUPABASE_URL=https://uwslxmciglqxpvfbgjzm.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=[Supabase'den alın]
SUPABASE_SERVICE_ROLE_KEY=[Supabase'den alın]
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### Anahtarları Nerede Bulabilirim?

1. Supabase Dashboard → **Settings** → **API**
2. **Project URL** kopyalayın
3. **Project API keys** bölümünden:
   - `anon` `public` key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `service_role` `secret` key → `SUPABASE_SERVICE_ROLE_KEY`

## 6. Kurulum Doğrulama

SQL Editor'de çalıştırın:

```sql
-- Tabloları kontrol et
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name LIKE 'mailtrack_%';
```

Beklenen sonuç: 3 tablo

```
mailtrack_mail_items
mailtrack_tracking_pixels
mailtrack_read_logs
```

## 7. İlk Test

1. Uygulamayı başlatın: `npm run dev`
2. http://localhost:3000 adresine gidin
3. **Ücretsiz Başla** ile kayıt olun
4. Dashboard'da **Yeni İzleme Oluştur**
5. Pixel kodunu kopyalayın

## 8. Sorun Giderme

### Tablo oluşturma hatası

- Eski tabloları silin:
```sql
DROP TABLE IF EXISTS mailtrack_read_logs CASCADE;
DROP TABLE IF EXISTS mailtrack_tracking_pixels CASCADE;
DROP TABLE IF EXISTS mailtrack_mail_items CASCADE;
```

### RLS hatası

- RLS'i geçici olarak devre dışı bırakın (sadece test için):
```sql
ALTER TABLE mailtrack_mail_items DISABLE ROW LEVEL SECURITY;
```

### Realtime çalışmıyor

- Database → Replication'dan table'ı enable edin
- Browser console'da Supabase connection'ı kontrol edin

## 9. Production Deploy

1. Vercel'e deploy edin
2. Environment variables ekleyin (Vercel Dashboard)
3. `NEXT_PUBLIC_APP_URL`'i production domain ile güncelleyin
4. Supabase → Authentication → URL Configuration:
   - Site URL: `https://your-domain.com`
   - Redirect URLs: `https://your-domain.com/auth/callback`

---

✅ Kurulum tamamlandı! Artık MailSight kullanıma hazır.
