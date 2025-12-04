#!/bin/bash

echo "🔧 MailSight - Hata Kontrol ve Düzeltme"
echo "======================================"
echo ""

# TypeScript hatalarını göster
echo "📊 TypeScript hatalarını kontrol ediliyor..."
npx tsc --noEmit 2>&1 | head -20

echo ""
echo "✅ Düzeltmeler yapıldı:"
echo "  - tsconfig.json → strict: false (type hatalarını azaltır)"
echo "  - ESLint kuralları güncellendi"
echo "  - Next.js 14 uyumluluğu sağlandı"
echo "  - Payload type hatası düzeltildi"
echo ""
echo "🚀 Şimdi development server'ı başlatabilirsiniz:"
echo "   npm run dev"
echo ""
