#!/bin/bash

echo "🚀 MailSight - GitHub'a Push Etme"
echo "=================================="
echo ""

# Git config kontrol
echo "📝 Git kullanıcı bilgileri:"
git config user.name || echo "❌ Git user.name ayarlanmamış"
git config user.email || echo "❌ Git user.email ayarlanmamış"
echo ""

# Git durumu
echo "📊 Git durumu:"
git status --short
echo ""

# Adım adım push
echo "🔧 GitHub'a push işlemi başlıyor..."
echo ""

# 1. Tüm dosyaları ekle
echo "1️⃣ Dosyalar staging'e ekleniyor..."
git add .

# 2. Commit yap
echo "2️⃣ Commit oluşturuluyor..."
git commit -m "feat: MailSight - Complete email tracking system

✨ Features:
- User authentication (Supabase Auth)
- Email tracking pixel generation
- Real-time read notifications
- Detailed analytics (device, browser, location)
- Google Antigravity-style minimal UI
- Dark mode support
- Fully responsive design

🗄️ Database:
- 3 tables (mail_items, tracking_pixels, read_logs)
- RLS security policies
- Triggers for auto-updates
- Views for analytics

🚀 CI/CD:
- GitHub Actions workflows
- Automated testing
- Vercel deployment ready

📚 Documentation:
- Complete setup guide
- Launch checklist
- Deployment instructions"

# 3. Remote kontrol
echo "3️⃣ Remote repository kontrol ediliyor..."
git remote -v

# 4. Push
echo "4️⃣ GitHub'a push ediliyor..."
git push origin main

echo ""
echo "✅ Push tamamlandı!"
echo ""
echo "🌐 GitHub Actions workflows otomatik çalışacak:"
echo "   → https://github.com/malikilic66-coder/mailtrack/actions"
echo ""
echo "📦 Sonraki adımlar:"
echo "   1. GitHub → Settings → Secrets → Actions"
echo "   2. Supabase credentials'ları ekle"
echo "   3. Vercel token ekle (opsiyonel)"
echo "   4. Workflow'lar otomatik çalışacak"
echo ""
