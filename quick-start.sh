#!/bin/bash

# MailSight Quick Start Script

echo "🚀 MailSight Kurulum Başlatılıyor..."
echo ""

# 1. Bağımlılıkları kontrol et
echo "📦 Bağımlılıklar kontrol ediliyor..."
if [ ! -d "node_modules" ]; then
    echo "⚙️  npm install çalıştırılıyor..."
    npm install
else
    echo "✅ node_modules mevcut"
fi

echo ""
echo "📋 Sonraki adımlar:"
echo ""
echo "1. Supabase'de SQL schema'yı çalıştırın:"
echo "   → Supabase Dashboard → SQL Editor"
echo "   → supabase/schema.sql dosyasını kopyalayıp çalıştırın"
echo ""
echo "2. Realtime'ı etkinleştirin:"
echo "   → Database → Replication"
echo "   → mailtrack_read_logs tablosunu enable edin"
echo ""
echo "3. Environment variables kontrol edin:"
echo "   → .env.local dosyasını açın"
echo "   → Supabase URL ve Key'leri kontrol edin"
echo ""
echo "4. Development server'ı başlatın:"
echo "   → npm run dev"
echo ""
echo "5. Tarayıcıda açın:"
echo "   → http://localhost:3000"
echo ""
echo "📚 Detaylı kurulum için: SUPABASE_SETUP.md"
echo ""
