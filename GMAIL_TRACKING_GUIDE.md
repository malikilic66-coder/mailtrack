# 📧 MailSight - Gmail İzleme Kullanım Rehberi

## 🎯 Sorun: Gmail HTML Yapıştırma

Gmail, güvenlik nedeniyle doğrudan HTML yapıştırmayı engelliyor. Bu yüzden tracking pixel'i doğru şekilde eklemeniz gerekiyor.

---

## ✅ ÇÖZÜM 1: Basit IMG Tag (ÖNERİLEN)

### Adımlar:
1. **MailSight Dashboard'da** mail oluştur
2. **Yeşil kutudaki kodu kopyala** (Gmail İçin Basit Format)
3. **Gmail'de yeni mail yaz**
4. **Mail içeriğini yaz**
5. **Mail sonuna Ctrl+V** ile kodu yapıştır
6. **Gönder!**

### Kod Formatı:
```html
<img src="https://mailtrack-eight.vercel.app/api/pixel/C9W8dNmOZZaX.gif" width="1" height="1" alt="" />
```

**✓ Neden çalışır?**
- Gmail, IMG tag'ini HTML olarak kabul eder
- Width/height=1 → Görünmez
- Alt="" → Accessibility için boş

---

## ✅ ÇÖZÜM 2: Gmail Resim URL

### Adımlar:
1. **MailSight Dashboard'da** "Sadece URL" kodunu kopyala
2. **Gmail'de İmza ayarlarına git**
   - Ayarlar (⚙️) → Tüm ayarları gör
   - Genel → İmza
3. **Resim ekle** düğmesine tıkla
4. **"URL ile"** seç
5. **Kopyaladığın URL'i yapıştır**
6. **Boyutları 1x1 olarak ayarla**
7. **Kaydet**

**✓ Artık her mailinizde otomatik tracking olacak!**

---

## ✅ ÇÖZÜM 3: Outlook / Thunderbird

### Adımlar:
1. **"HTML Gizli Stil"** kodunu kopyala
2. **Mail istemcinde yeni mail**
3. **HTML mod**unu aktifleştir
4. **Kodu yapıştır**
5. **Gönder**

### Kod Formatı:
```html
<img src="..." width="1" height="1" style="display:none;opacity:0;position:absolute;" alt="" />
```

---

## 🔥 PROFESYONELLEŞTİRME

### 1. Alıcı ve Konu Bilgisi Ekle

Dashboard'da mail oluştururken:
- **Alıcı E-posta**: Mail gönderdiğiniz kişinin emaili
- **Alıcı Adı**: Kişinin adı (opsiyonel)
- **Mail Konusu**: Gönderdiğiniz mailin konusu
- **Notlar**: İçinize ne yazdırıyorsanız

**Faydası:**
- Hangi maili gönderdiğinizi hatırlarsınız
- Raporlama ve takip kolay
- Analytics daha detaylı

### 2. Farklı Formatlar

| Format | Kullanım | Avantaj |
|--------|----------|---------|
| **Basit IMG** | Gmail direkt yapıştır | En kolay, hızlı |
| **Sadece URL** | Gmail imza | Otomatik her mailde |
| **Gmail Optimize** | Gmail + stil desteği | En iyi uyumluluk |
| **HTML Gizli** | Outlook, Thunderbird | Tam gizli |

---

## 📊 Nasıl Çalışır?

### 1. Tracking Pixel Nedir?

- **1x1 piksel** boyutunda **şeffaf GIF** resmi
- **Görünmez** ama mail açıldığında **yükleniyor**
- Yüklenme = **Mail okundu** ✓

### 2. Ne Bilgi Toplar?

- ✅ **Okuma zamanı** (tarih + saat)
- ✅ **Cihaz tipi** (desktop, mobile, tablet)
- ✅ **Tarayıcı** (Chrome, Safari, Firefox)
- ✅ **İşletim sistemi** (Windows, macOS, iOS, Android)
- ✅ **IP adresi** (lokasyon için)
- ✅ **Kaç kez açıldı**

### 3. Realtime Bildirim

Dashboard açıkken mail okunduğunda:
- 🔔 Anlık bildirim
- 📊 Stats güncellenir
- 📈 Grafik yenilenir

---

## 🛡️ Gizlilik ve Güvenlik

### Yasal mı?

✅ **EVET** - Ancak:
- Ticari emaillerde **açık rıza** gerekebilir (KVKK, GDPR)
- Kişisel maillerde **sorun yok**
- B2B satış/pazarlama için **normal pratik**

### Etik Kullanım

✓ **KULLAN:**
- Satış takibi
- Müşteri ilgisi ölçümü
- Teklif sunumu kontrolü
- Email kampanya performansı

✗ **KULLANMA:**
- Kişisel çıkar için gözetleme
- İzinsiz veri toplama
- Spam/phishing

---

## 💡 Kullanım Senaryoları

### 1. Satış & İş Geliştirme

```
Senaryo: Müşteriye teklif gönderdim
✓ Mail okundu mu?
✓ Kaç kez baktı?
✓ Hangi cihazdan?
→ Takip araması için doğru timing!
```

### 2. İş Başvurusu

```
Senaryo: CV gönderim
✓ HR okudu mu?
✓ Ne zaman baktı?
✓ Birden fazla kişi mi okudu?
→ Follow-up yapmak için ipucu!
```

### 3. Önemli Bilgilendirme

```
Senaryo: Toplantı daveti / Önemli duyuru
✓ Alıcı gördü mü?
✓ Okunma saati?
→ Hatırlatma gerekli mi anla!
```

---

## 🚀 En İyi Pratikler

### 1. Kod Yerleştirme

✅ **Mail sonuna** ekle
✅ **İmzadan sonra** (varsa)
✅ **Görünür içerikten ayrı**

❌ **Mail başına** ekleme
❌ **Paragraf aralarına** ekleme

### 2. Test Etme

1. Kendinize test maili at
2. Farklı cihazda aç (mobil, desktop)
3. Dashboard'da görünüyor mu kontrol et

### 3. Dashboard Kullanımı

- **Gerçek başlıklar** kullan
- **Recipient bilgisi** ekle
- **Notlar** bölümünü doldur
- **Düzenli temizlik** yap (eski mailleri arşivle)

---

## 🔧 Sorun Giderme

### Gmail'de görünüyor pixel?

**Sorun:** Mailde 1x1 resim simgesi görünüyor

**Çözüm:**
- "HTML Gizli Stil" formatını kullan
- veya: Gmail imza yöntemini kullan

### Tracking çalışmıyor?

**Kontrol Listesi:**
1. ✅ URL doğru mu?
2. ✅ Internet bağlantısı var mı?
3. ✅ Mail client resim yüklemeye izin veriyor mu?
4. ✅ Supabase credentials doğru mu?
5. ✅ Database'de pixel kaydı var mı?

**Test:**
```bash
# Terminal'de URL'i test et
curl "https://mailtrack-eight.vercel.app/api/pixel/YOURCODE.gif"

# Çıktı: GIF89a... (binary data) = ÇALIŞIYOR ✓
```

### Realtime bildirim gelmiyor?

1. Dashboard'ı yenile (F5)
2. Browser console'u aç (F12)
3. Hata var mı kontrol et
4. Supabase Realtime aktif mi?

---

## 📈 Gelecek Özellikler

- [ ] **Email templates** (hazır şablonlar)
- [ ] **Link tracking** (mail içindeki link tıklamaları)
- [ ] **Attachment tracking** (ek indirmeleri)
- [ ] **Geographic map** (nereden okundu harita)
- [ ] **Email scheduling** (zamanlanmış gönderim)
- [ ] **A/B testing** (farklı versiyonlar)
- [ ] **CRM entegrasyonu** (HubSpot, Salesforce)
- [ ] **Slack notifications** (Slack'e bildirim)

---

## 🎓 Kaynaklar

- [Gmail API Docs](https://developers.google.com/gmail)
- [Email Tracking Best Practices](https://www.litmus.com/blog/email-tracking)
- [GDPR Compliance Guide](https://gdpr.eu)
- [Supabase Realtime](https://supabase.com/docs/guides/realtime)

---

## 💬 Destek

Sorunlarınız için:
- GitHub Issues: [malikilic66-coder/mailtrack/issues](https://github.com/malikilic66-coder/mailtrack/issues)
- Email: malikilic66@gmail.com

---

**🎉 Artık emaillerinizi profesyonelce takip edebilirsiniz!**
