-- ========================================
-- MailSight - Test & Verification Queries
-- ========================================
-- Bu dosyayı Supabase SQL Editor'de çalıştırarak
-- kurulumun doğru yapıldığını kontrol edebilirsiniz

-- ========================================
-- 1. TABLOLARI KONTROL ET
-- ========================================
SELECT 
    table_name,
    table_type
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name LIKE 'mailtrack_%'
ORDER BY table_name;

-- Beklenen: 3 tablo
-- mailtrack_mail_items
-- mailtrack_read_logs
-- mailtrack_tracking_pixels

-- ========================================
-- 2. RLS (Row Level Security) KONTROL
-- ========================================
SELECT 
    schemaname,
    tablename,
    policyname,
    permissive,
    roles,
    cmd
FROM pg_policies 
WHERE tablename LIKE 'mailtrack_%'
ORDER BY tablename, policyname;

-- Beklenen: 6+ policy

-- ========================================
-- 3. TRIGGER'LARI KONTROL ET
-- ========================================
SELECT 
    trigger_name,
    event_manipulation,
    event_object_table,
    action_timing
FROM information_schema.triggers 
WHERE event_object_table LIKE 'mailtrack_%'
ORDER BY event_object_table;

-- Beklenen: 2 trigger
-- update_mail_items_updated_at
-- trigger_update_mail_on_read

-- ========================================
-- 4. VIEW'LARI KONTROL ET
-- ========================================
SELECT 
    table_name as view_name,
    view_definition
FROM information_schema.views 
WHERE table_schema = 'public' 
AND table_name LIKE 'mailtrack_%';

-- Beklenen: 2 view
-- mailtrack_mail_stats
-- mailtrack_user_dashboard

-- ========================================
-- 5. FUNCTION'LARI KONTROL ET
-- ========================================
SELECT 
    routine_name,
    routine_type,
    data_type as return_type
FROM information_schema.routines
WHERE routine_schema = 'public'
AND (
    routine_name LIKE '%mail%' 
    OR routine_name LIKE '%pixel%'
    OR routine_name = 'update_updated_at_column'
);

-- Beklenen: 3 function
-- generate_pixel_code
-- update_mail_status_on_read
-- update_updated_at_column

-- ========================================
-- 6. INDEX'LERI KONTROL ET
-- ========================================
SELECT 
    tablename,
    indexname,
    indexdef
FROM pg_indexes
WHERE schemaname = 'public'
AND tablename LIKE 'mailtrack_%'
ORDER BY tablename, indexname;

-- Beklenen: 12+ index

-- ========================================
-- 7. KOLON YAPILARINI KONTROL ET
-- ========================================

-- mailtrack_mail_items kolonları
SELECT 
    column_name,
    data_type,
    is_nullable,
    column_default
FROM information_schema.columns
WHERE table_schema = 'public'
AND table_name = 'mailtrack_mail_items'
ORDER BY ordinal_position;

-- mailtrack_tracking_pixels kolonları
SELECT 
    column_name,
    data_type,
    is_nullable,
    column_default
FROM information_schema.columns
WHERE table_schema = 'public'
AND table_name = 'mailtrack_tracking_pixels'
ORDER BY ordinal_position;

-- mailtrack_read_logs kolonları
SELECT 
    column_name,
    data_type,
    is_nullable,
    column_default
FROM information_schema.columns
WHERE table_schema = 'public'
AND table_name = 'mailtrack_read_logs'
ORDER BY ordinal_position;

-- ========================================
-- 8. FOREIGN KEY CONSTRAINTS
-- ========================================
SELECT
    tc.table_name,
    kcu.column_name,
    ccu.table_name AS foreign_table_name,
    ccu.column_name AS foreign_column_name
FROM information_schema.table_constraints AS tc
JOIN information_schema.key_column_usage AS kcu
    ON tc.constraint_name = kcu.constraint_name
    AND tc.table_schema = kcu.table_schema
JOIN information_schema.constraint_column_usage AS ccu
    ON ccu.constraint_name = tc.constraint_name
    AND ccu.table_schema = tc.table_schema
WHERE tc.constraint_type = 'FOREIGN KEY'
AND tc.table_name LIKE 'mailtrack_%'
ORDER BY tc.table_name;

-- ========================================
-- 9. TEST DATA EKLE (OPSIYONEL)
-- ========================================
-- UYARI: Bu sadece test içindir. Production'da çalıştırmayın.

-- Test kullanıcı ID'si (kendi user_id'nizi buraya yazın)
-- Önce Supabase Dashboard → Authentication'dan bir user oluşturun
-- Veya uygulamada kayıt olun

-- Örnek:
-- DO $$
-- DECLARE
--     test_user_id uuid := 'YOUR-USER-ID-HERE';
--     test_mail_id uuid;
--     test_pixel_id uuid;
--     test_pixel_code text := 'test123abc45';
-- BEGIN
--     -- Test mail oluştur
--     INSERT INTO mailtrack_mail_items (user_id, title, description)
--     VALUES (test_user_id, 'Test Mail 1', 'Bu bir test mailidir')
--     RETURNING id INTO test_mail_id;
--
--     -- Test pixel oluştur
--     INSERT INTO mailtrack_tracking_pixels (mail_id, pixel_url, pixel_code)
--     VALUES (
--         test_mail_id, 
--         'http://localhost:3000/api/pixel/' || test_pixel_code || '.gif',
--         test_pixel_code
--     )
--     RETURNING id INTO test_pixel_id;
--
--     -- Test read log ekle
--     INSERT INTO mailtrack_read_logs (
--         pixel_id, mail_id, user_id,
--         ip_address, user_agent, device_type, browser, os
--     )
--     VALUES (
--         test_pixel_id, test_mail_id, test_user_id,
--         '192.168.1.1', 'Mozilla/5.0', 'desktop', 'Chrome', 'Windows'
--     );
--
--     RAISE NOTICE 'Test data başarıyla eklendi!';
-- END $$;

-- ========================================
-- 10. TEST DATA TEMIZLEME
-- ========================================
-- Test datayı silmek için (dikkatli kullanın!)

-- DELETE FROM mailtrack_read_logs WHERE ip_address = '192.168.1.1';
-- DELETE FROM mailtrack_tracking_pixels WHERE pixel_code = 'test123abc45';
-- DELETE FROM mailtrack_mail_items WHERE title = 'Test Mail 1';

-- ========================================
-- 11. ISTATISTIK SORGULARI
-- ========================================

-- Toplam kayıt sayıları
SELECT 
    'mail_items' as table_name,
    COUNT(*) as total_records
FROM mailtrack_mail_items
UNION ALL
SELECT 
    'tracking_pixels' as table_name,
    COUNT(*) as total_records
FROM mailtrack_tracking_pixels
UNION ALL
SELECT 
    'read_logs' as table_name,
    COUNT(*) as total_records
FROM mailtrack_read_logs;

-- ========================================
-- 12. REALTIME PUBLICATION KONTROL
-- ========================================
SELECT 
    pubname,
    puballtables
FROM pg_publication
WHERE pubname = 'supabase_realtime';

-- Realtime için publish edilen tablolar
SELECT 
    schemaname,
    tablename
FROM pg_publication_tables
WHERE pubname = 'supabase_realtime'
AND tablename LIKE 'mailtrack_%';

-- ========================================
-- SONUÇ: TÜM KONTROLLER BAŞARILI MI?
-- ========================================

-- ✅ 3 Tablo oluşturuldu
-- ✅ 6+ RLS Policy aktif
-- ✅ 2 Trigger çalışıyor
-- ✅ 2 View hazır
-- ✅ 3 Function tanımlı
-- ✅ 12+ Index oluşturuldu
-- ✅ Foreign keys doğru
-- ✅ Realtime yapılandırıldı

-- Eğer tüm sorguların sonuçları beklediğiniz gibiyse,
-- MailSight veritabanı kurulumu BAŞARILI! 🎉
