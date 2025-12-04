-- ========================================
-- MailSight - Supabase Setup Instructions
-- ========================================

-- Bu dosyayı Supabase Dashboard → SQL Editor'de çalıştırın

-- ADIM 1: Ana SQL Schema'yı çalıştırın
-- supabase/schema.sql dosyasındaki tüm kodu kopyalayıp buraya yapıştırın

-- ADIM 2: Realtime'ı Etkinleştirin
-- Supabase Dashboard → Database → Replication
-- mailtrack_read_logs tablosunu Realtime için etkinleştirin

-- ADIM 3: Email Authentication
-- Supabase Dashboard → Authentication → Providers
-- Email provider'ı aktifleştirin

-- ADIM 4: Test Kullanıcısı Oluşturun (Opsiyonel)
-- Dashboard → Authentication → Users → Add User
-- veya uygulamada /auth/register sayfasını kullanın

-- ========================================
-- Supabase Dashboard Kontrol Listesi
-- ========================================

-- ✅ SQL Schema çalıştırıldı mı?
-- ✅ 3 tablo oluşturuldu mu? (mailtrack_mail_items, mailtrack_tracking_pixels, mailtrack_read_logs)
-- ✅ RLS (Row Level Security) aktif mi?
-- ✅ Triggers oluşturuldu mu?
-- ✅ Views oluşturuldu mu?
-- ✅ Realtime etkin mi?
-- ✅ Email auth aktif mi?

-- ========================================
-- Test Komutları
-- ========================================

-- Test 1: Tabloları kontrol et
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name LIKE 'mailtrack_%';

-- Test 2: RLS politikalarını kontrol et
SELECT schemaname, tablename, policyname 
FROM pg_policies 
WHERE tablename LIKE 'mailtrack_%';

-- Test 3: Trigger'ları kontrol et
SELECT trigger_name, event_object_table 
FROM information_schema.triggers 
WHERE event_object_table LIKE 'mailtrack_%';

-- Test 4: View'ları kontrol et
SELECT table_name 
FROM information_schema.views 
WHERE table_schema = 'public' 
AND table_name LIKE 'mailtrack_%';
