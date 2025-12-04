# MailSight

<div align="center">
  
  ![MailSight Logo](https://img.shields.io/badge/MailSight-Email%20Tracking-black?style=for-the-badge)
  
  [![Next.js](https://img.shields.io/badge/Next.js-14-black?style=flat-square&logo=next.js)](https://nextjs.org/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
  [![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-green?style=flat-square&logo=supabase)](https://supabase.com/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
  [![License](https://img.shields.io/badge/License-MIT-yellow?style=flat-square)](LICENSE)
  
  **Modern, minimalist e-posta izleme platformu**
  
  [Demo](https://mailsight.vercel.app) • [Dokümantasyon](./README.md) • [Kurulum](#-kurulum)

</div>

---

## ✨ Özellikler

- 🔍 **Gerçek Zamanlı İzleme** - E-postalar açıldığı anda bildirim
- 📊 **Detaylı Analytics** - Cihaz, tarayıcı, konum ve zaman bilgileri
- 🎨 **Minimal Tasarım** - Google Antigravity benzeri temiz UI
- 🔐 **Güvenli** - Row Level Security (RLS) ile tam güvenlik
- ⚡ **Hızlı** - Next.js 14 App Router ile optimize edilmiş
- 📱 **Responsive** - Tüm cihazlarda mükemmel görünüm

## 🚀 Hızlı Başlangıç

### Gereksinimler

- Node.js 18+
- npm veya yarn
- Supabase hesabı

### Kurulum

1. **Repository'yi klonlayın**
```bash
git clone https://github.com/malikilic66-coder/mailtrack.git
cd mailtrack
```

2. **Bağımlılıkları yükleyin**
```bash
npm install
```

3. **Environment variables**
```bash
cp .env.local.example .env.local
# .env.local dosyasını Supabase credentials ile güncelleyin
```

4. **Supabase Setup**
- Supabase Dashboard → SQL Editor
- `supabase/schema.sql` dosyasını çalıştırın
- Database → Replication → `mailtrack_read_logs` tablosunu enable edin

5. **Development server**
```bash
npm run dev
```

Tarayıcıda açın: http://localhost:3000

## 📖 Dokümantasyon

- [Kurulum Kılavuzu](./SUPABASE_SETUP.md)
- [Dosya Yapısı](./FILE_STRUCTURE.md)
- [Launch Checklist](./LAUNCH_CHECKLIST.md)
- [Deployment Guide](./.github/DEPLOYMENT.md)

## 🛠 Teknoloji Stack

| Kategori | Teknoloji |
|----------|-----------|
| Framework | Next.js 14 |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Database | Supabase (PostgreSQL) |
| Auth | Supabase Auth |
| Realtime | Supabase Realtime |
| Icons | Lucide React |
| Deployment | Vercel |

## 📊 Veritabanı Yapısı

```
auth.users (Supabase)
    ├─→ mailtrack_mail_items
    │       └─→ mailtrack_tracking_pixels
    │               └─→ mailtrack_read_logs
    │
    └─→ Views:
            ├─→ mailtrack_mail_stats
            └─→ mailtrack_user_dashboard
```

## 🎯 Kullanım

1. **Kayıt olun** → `/auth/register`
2. **Dashboard'a gidin** → `/dashboard`
3. **Yeni izleme oluşturun**
4. **Pixel kodunu kopyalayın**
5. **E-postanıza ekleyin**
6. **İzleyin!** 📬

## 🔐 Güvenlik

- ✅ Row Level Security (RLS)
- ✅ JWT Authentication
- ✅ Service Role Key (server-only)
- ✅ IP Masking
- ✅ HTTPS Only

## 📈 API Endpoints

### Tracking Pixel
```
GET /api/pixel/[code].gif
```

**Response:**
- Content-Type: `image/gif`
- Body: 1x1 transparent GIF

**Side Effects:**
- Logs read event
- Updates mail status
- Triggers realtime notification

## 🚢 Production Deploy

### Vercel (Önerilen)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/malikilic66-coder/mailtrack)

### Manuel Deploy

1. Vercel hesabı oluştur
2. GitHub'a push et
3. Vercel'de import et
4. Environment variables ekle
5. Deploy!

Detaylar: [Deployment Guide](./.github/DEPLOYMENT.md)

## 🤝 Katkıda Bulunma

Pull request'ler memnuniyetle karşılanır!

1. Fork edin
2. Feature branch oluşturun (`git checkout -b feature/amazing`)
3. Commit edin (`git commit -m 'feat: amazing feature'`)
4. Push edin (`git push origin feature/amazing`)
5. Pull Request açın

## 📝 License

[MIT License](LICENSE)

## 🙏 Teşekkürler

- [Next.js](https://nextjs.org/)
- [Supabase](https://supabase.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Lucide Icons](https://lucide.dev/)

## 📞 İletişim

Sorularınız için: [Issues](https://github.com/malikilic66-coder/mailtrack/issues)

---

<div align="center">
  
  **MailSight ile e-posta takibini basit hale getirin** 🚀
  
  ⭐ Star vermeyi unutmayın!
  
</div>
