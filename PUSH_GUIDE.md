# 🚀 GitHub Push ve Deploy Komutları

## Manuel Push Komutları

Terminal'de sırayla çalıştırın:

### 1. Git Konfigürasyonu (İlk kez)
```bash
git config user.name "Malik İliç"
git config user.email "malikilic66@gmail.com"
```

### 2. Dosyaları Staging'e Ekle
```bash
git add .
```

### 3. Commit Oluştur
```bash
git commit -m "feat: MailSight email tracking system - Complete implementation

✨ Features:
- User authentication with Supabase Auth
- Email tracking pixel generation
- Real-time read notifications
- Detailed analytics dashboard
- Google Antigravity UI design
- Dark mode support
- Fully responsive

🗄️ Database:
- Complete Supabase schema
- RLS security
- Triggers & views
- Performance indexes

🚀 CI/CD:
- GitHub Actions workflows
- Automated testing
- Vercel deployment ready

📚 Full documentation included"
```

### 4. GitHub'a Push Et
```bash
git push origin main
```

## Otomatik Push Script

Veya tek komutla:

```bash
chmod +x deploy-to-github.sh
./deploy-to-github.sh
```

## 📋 Push Sonrası Yapılacaklar

### 1. GitHub Secrets Ekle

GitHub Repository → **Settings** → **Secrets and variables** → **Actions**

**New repository secret** ile şunları ekle:

```
NEXT_PUBLIC_SUPABASE_URL
Değer: https://uwslxmciglqxpvfbgjzm.supabase.co

NEXT_PUBLIC_SUPABASE_ANON_KEY
Değer: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

SUPABASE_SERVICE_ROLE_KEY
Değer: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### 2. GitHub Actions Kontrol

Push sonrası:
- https://github.com/malikilic66-coder/mailtrack/actions
- Workflow'ların çalışmasını izle

### 3. Vercel Deploy (Opsiyonel)

**Vercel ile deploy için:**

1. https://vercel.com → New Project
2. GitHub repo'yu import et
3. Environment variables ekle
4. Deploy!

**Veya Vercel CLI:**
```bash
npm i -g vercel
vercel login
vercel
```

## 🔍 Workflow'lar

### CI Workflow (`.github/workflows/ci.yml`)
- Her push'ta çalışır
- TypeScript check
- ESLint
- Build test

### Deploy Workflow (`.github/workflows/deploy.yml`)
- `main` branch push'unda çalışır
- Full build
- Vercel deploy (token varsa)

## ✅ Checklist

- [ ] Git config ayarlandı
- [ ] Tüm dosyalar commit edildi
- [ ] GitHub'a push edildi
- [ ] GitHub Actions çalıştı
- [ ] Secrets eklendi
- [ ] Workflow başarılı ✓

## 🐛 Sorun Giderme

### Push reddedildi
```bash
git pull origin main --rebase
git push origin main
```

### Merge conflict
```bash
git status
# Conflictleri düzelt
git add .
git commit -m "fix: merge conflicts"
git push origin main
```

### GitHub Actions başarısız
- Actions sekmesinde logs kontrol et
- Secrets doğru mu kontrol et
- Build local'de çalışıyor mu test et

## 📊 Sonuç

Push başarılı olduğunda:
- ✅ Kod GitHub'da
- ✅ CI/CD pipeline çalışıyor
- ✅ Deploy ready
- ✅ Issue tracking aktif

---

**Ready to push!** 🚀
