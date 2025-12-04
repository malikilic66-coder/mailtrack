# GitHub Actions Deployment Guide

## 🚀 Kurulum Adımları

### 1. GitHub Repository Secrets Ekle

GitHub repository → **Settings** → **Secrets and variables** → **Actions** → **New repository secret**

Aşağıdaki secrets'ları ekleyin:

#### Supabase Secrets:
```
NEXT_PUBLIC_SUPABASE_URL=https://uwslxmciglqxpvfbgjzm.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV3c2x4bWNpZ2xxeHB2ZmJnanptIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQzMzU3NDcsImV4cCI6MjA3OTkxMTc0N30.Pzk2Zrp08-f93VoApIj6QjWx_9nEQSkZFRU_t1UX_ow
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV3c2x4bWNpZ2xxeHB2ZmJnanptIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2NDMzNTc0NywiZXhwIjoyMDc5OTExNzQ3fQ.Rs6mXPpNG6kzLTxJtPD4Ei_G1uOCBdqe7cXBa1750CY
```

#### Vercel Secrets (Opsiyonel - Vercel deploy için):
```
VERCEL_TOKEN=<Vercel dashboard'dan alın>
VERCEL_ORG_ID=<Vercel org ID>
VERCEL_PROJECT_ID=<Vercel project ID>
```

### 2. Vercel Token Alma (Opsiyonel)

1. https://vercel.com/account/tokens
2. "Create Token" → Token adı: "GitHub Actions"
3. Token'ı kopyala ve GitHub secrets'a `VERCEL_TOKEN` olarak ekle

### 3. Vercel Proje ID'lerini Alma

Terminal'de:
```bash
npm i -g vercel
vercel login
vercel link
```

`.vercel/project.json` dosyasından:
- `orgId` → `VERCEL_ORG_ID`
- `projectId` → `VERCEL_PROJECT_ID`

## 📋 Workflows

### `deploy.yml` - Production Deploy
- **Tetikleme**: `main` branch'e push
- **İşlemler**:
  1. TypeScript kontrol
  2. ESLint çalıştır
  3. Build oluştur
  4. Vercel'e deploy et

### `ci.yml` - Code Quality
- **Tetikleme**: Her push ve PR
- **İşlemler**:
  1. Lint kontrolü
  2. Type check
  3. Build test

## 🎯 Kullanım

### Otomatik Deploy (main branch):
```bash
git add .
git commit -m "feat: yeni özellik"
git push origin main
```

### Pull Request için:
```bash
git checkout -b feature/yeni-ozellik
git add .
git commit -m "feat: yeni özellik"
git push origin feature/yeni-ozellik
# GitHub'da PR oluştur
```

## 🔧 Workflow Dosyaları

- `.github/workflows/deploy.yml` - Production deployment
- `.github/workflows/ci.yml` - Code quality checks

## ✅ İlk Deploy Checklist

- [ ] GitHub secrets eklendi
- [ ] Vercel token alındı (opsiyonel)
- [ ] Supabase SQL schema çalıştırıldı
- [ ] `main` branch'e push yapıldı
- [ ] GitHub Actions sekmesinde workflow çalıştı
- [ ] Deploy başarılı ✓

## 🐛 Sorun Giderme

### Build Hatası
- GitHub Actions logs'u kontrol et
- Secrets doğru mu kontrol et
- Local'de `npm run build` çalışıyor mu?

### Deploy Başarısız
- Vercel token geçerli mi?
- Environment variables eksiksiz mi?
- Supabase connection çalışıyor mu?

## 🌐 Production URL

Deploy sonrası URL:
- Vercel: `https://mailsight.vercel.app`
- veya custom domain

## 📊 Monitoring

- GitHub Actions: https://github.com/malikilic66-coder/mailtrack/actions
- Vercel Dashboard: https://vercel.com/dashboard

---

**Not**: İlk deploy için Vercel kısmı opsiyonel. Sadece CI/CD için GitHub Actions kullanabilirsiniz.
