# 📂 MailSight - Proje Dosya Yapısı

```
mailtrack/
│
├── 📱 app/                              # Next.js 14 App Router
│   ├── api/                            # API Routes
│   │   └── pixel/
│   │       └── [code]/
│   │           └── route.ts            # 🎯 Tracking Pixel API Endpoint
│   │
│   ├── auth/                           # Authentication Pages
│   │   ├── callback/
│   │   │   └── route.ts               # Auth callback handler
│   │   ├── forgot-password/
│   │   │   └── page.tsx               # Şifre sıfırlama
│   │   ├── login/
│   │   │   └── page.tsx               # Giriş sayfası
│   │   └── register/
│   │       └── page.tsx               # Kayıt sayfası
│   │
│   ├── dashboard/                      # Dashboard
│   │   ├── DashboardClient.tsx        # Dashboard ana component (client)
│   │   └── page.tsx                   # Dashboard page (server)
│   │
│   ├── globals.css                     # Global CSS + Tailwind
│   ├── layout.tsx                      # Root layout
│   └── page.tsx                        # 🏠 Landing Page (Ana sayfa)
│
├── 🎨 components/                       # React Components
│   ├── CreateMailModal.tsx            # Yeni mail izleme modal
│   ├── FloatingDots.tsx               # Google Antigravity animasyon
│   └── MailDetailModal.tsx            # Mail detay ve read logs
│
├── 🔧 lib/                              # Utility & Config
│   ├── supabase/
│   │   ├── client.ts                  # Browser Supabase client
│   │   ├── database.types.ts          # TypeScript types
│   │   ├── middleware.ts              # Supabase middleware
│   │   └── server.ts                  # Server Supabase client
│   └── locale.ts                       # Date locale (TR)
│
├── 🗄️ supabase/                         # Supabase Related
│   ├── schema.sql                     # ⭐ Tam SQL Schema
│   ├── setup-instructions.sql         # Kurulum SQL'leri
│   └── test-queries.sql               # Test ve doğrulama sorguları
│
├── ⚙️ Configuration Files
│   ├── .env.local                     # 🔑 Environment variables (LOCAL)
│   ├── .env.local.example             # Environment örneği
│   ├── .eslintrc.json                 # ESLint config
│   ├── .gitignore                     # Git ignore
│   ├── middleware.ts                  # Next.js middleware
│   ├── next.config.js                 # Next.js config
│   ├── package.json                   # Dependencies
│   ├── postcss.config.js              # PostCSS config
│   ├── tailwind.config.ts             # Tailwind config
│   └── tsconfig.json                  # TypeScript config
│
└── 📚 Documentation
    ├── LAUNCH_CHECKLIST.md            # ✅ Kurulum checklist
    ├── PROJECT_SUMMARY.md             # 📊 Proje özeti
    ├── README.md                      # 📖 Ana dokümantasyon
    ├── SUPABASE_SETUP.md              # 🗄️ Supabase kurulum rehberi
    └── quick-start.sh                 # 🚀 Quick start script

```

## 📊 Dosya İstatistikleri

### Frontend (React/Next.js)
- **Pages**: 7 (Landing, Login, Register, Forgot Password, Dashboard, etc.)
- **Components**: 3 (FloatingDots, CreateMailModal, MailDetailModal)
- **API Routes**: 1 (Pixel tracking)
- **Layouts**: 1 (Root layout)

### Backend (Supabase)
- **Tables**: 3 (mail_items, tracking_pixels, read_logs)
- **Views**: 2 (mail_stats, user_dashboard)
- **Functions**: 3 (update triggers, pixel code generator)
- **Policies**: 6+ (RLS security)
- **Indexes**: 12+ (Performance)

### Configuration
- **TypeScript**: Tam tip güvenliği
- **Tailwind**: Utility-first CSS
- **ESLint**: Code quality
- **PostCSS**: CSS processing

### Documentation
- **README**: Genel bilgi ve kullanım
- **SUPABASE_SETUP**: Detaylı Supabase kurulumu
- **LAUNCH_CHECKLIST**: Adım adım başlatma
- **PROJECT_SUMMARY**: Teknik özet

## 🎯 Kritik Dosyalar

### 1. `supabase/schema.sql` ⭐⭐⭐⭐⭐
**EN ÖNEMLİ DOSYA**
- Tüm veritabanı yapısı
- RLS policies
- Triggers ve functions
- İlk çalıştırılması gereken

### 2. `.env.local` 🔑
- Supabase credentials
- API keys
- App URL

### 3. `app/api/pixel/[code]/route.ts` 🎯
- Tracking pixel endpoint
- Email açılma detection
- Log kaydetme

### 4. `app/dashboard/DashboardClient.tsx` 📊
- Ana dashboard UI
- Realtime updates
- Mail yönetimi

### 5. `lib/supabase/client.ts` & `server.ts` 🔧
- Supabase connection
- Auth yönetimi

## 🚀 Çalışma Akışı

### 1. İlk Kurulum
```
1. supabase/schema.sql → Supabase'de çalıştır
2. .env.local → API keys ekle
3. npm install
4. npm run dev
```

### 2. Development Flow
```
User Flow:
┌─────────────┐
│ Landing (/) │
└──────┬──────┘
       │
       ├─→ /auth/register → Kayıt
       │                      │
       ├─→ /auth/login ────→ /dashboard
       │                      │
       └─→ /auth/forgot    Create Mail
                               │
                          Copy Pixel Code
                               │
                          Send Email
                               │
                          Recipient Opens
                               │
                     /api/pixel/[code].gif
                               │
                          Log to DB
                               │
                     Realtime Update
                               │
                      Dashboard Refresh
```

### 3. Tracking Flow
```
Email Sent → Pixel Loaded → API Hit → DB Log → Trigger → Realtime → UI Update
```

## 📦 Dependencies Breakdown

### Core
- `next` - Framework
- `react` - UI library
- `typescript` - Type safety

### Supabase
- `@supabase/supabase-js` - Client library
- `@supabase/ssr` - Server-side rendering

### UI/UX
- `tailwindcss` - Styling
- `lucide-react` - Icons
- `framer-motion` - Animations

### Utilities
- `date-fns` - Date formatting
- `recharts` - Charts (future)

## 🔐 Security Layers

1. **RLS (Row Level Security)**
   - User sadece kendi verilerini görür
   - SQL seviyesinde kontrol

2. **JWT Authentication**
   - Supabase Auth
   - Token bazlı

3. **Environment Variables**
   - Sensitive data .env'de
   - Git'e commit edilmez

4. **API Route Protection**
   - Service role key sadece server-side
   - CORS ayarları

## 🎨 UI Architecture

### Design System
```
Components
    ├── Atoms (Buttons, Inputs)
    ├── Molecules (Cards, Modals)
    └── Organisms (Dashboard, Landing)

Styling
    ├── Tailwind Utility Classes
    ├── Custom Components (.btn-primary)
    └── Animations (floating-dots)
```

### Color Scheme
```css
Primary: Black (#000000)
Secondary: Gray shades
Accent: Green (success), Red (error), Blue (info)
Background: White / Dark mode auto
```

## 📱 Responsive Breakpoints

```css
sm: 640px   /* Mobile landscape */
md: 768px   /* Tablet */
lg: 1024px  /* Desktop */
xl: 1280px  /* Large desktop */
2xl: 1536px /* Extra large */
```

## 🗄️ Database Schema Visual

```
auth.users (Supabase managed)
    ├─→ mailtrack_mail_items
    │       └─→ mailtrack_tracking_pixels
    │               └─→ mailtrack_read_logs
    │
    └─→ Views:
            ├─→ mailtrack_mail_stats
            └─→ mailtrack_user_dashboard
```

## 🔄 State Management

```
Client State:
    - React useState (local)
    - Supabase Realtime (sync)

Server State:
    - Supabase queries (server components)
    - SWR/React Query (future, opsiyonel)
```

## 📈 Performance

### Optimizations
- ✅ Server Components (default)
- ✅ Database indexes
- ✅ RLS policies (filtered queries)
- ✅ Image optimization (1x1 GIF)
- ✅ CSS-in-JS minimized (Tailwind)

### Future Improvements
- [ ] Redis caching
- [ ] CDN for static assets
- [ ] Database connection pooling
- [ ] Edge functions

---

**Dosya yapısı tam ve organize! 🎉**

Her dosyanın rolü net, modüler yapı hazır.
