# Panduan Deploy ke Cloudflare Pages - Daarul Huda IBS

Proyek ini telah dikonfigurasi secara optimal untuk **Cloudflare Pages** (Single Page Application dengan Vite + React + Tailwind CSS).

---

## Konfigurasi yang Sudah Disediakan Otomatis:
1. `public/_redirects`: Memastikan routing SPA berjalan sempurna (`/* /index.html 200`) sehingga tidak terjadi 404 saat navigasi atau refresh.
2. `public/_headers`: Mengatur keamanan header web (X-Frame-Options, X-Content-Type-Options) dan caching aset gambar & static files di edge network Cloudflare global.
3. `wrangler.json`: Berkas konfigurasi resmi Cloudflare Pages untuk deployment instan lewat CLI.
4. `package.json`: Script `npm run build` dan `npm run deploy:cf`.

---

## 3 Cara Deploy ke Cloudflare Pages:

### Cara 1: Menghubungkan ke GitHub / GitLab (Paling Direkomendasikan & Otomatis)
Jika proyek ini disimpan di repository Git (GitHub atau GitLab):
1. Buka [Cloudflare Dashboard](https://dash.cloudflare.com/) > Masuk ke akun Anda.
2. Pada menu kiri, klik **Compute (Workers & Pages)** > **Create application** > Pilih tab **Pages**.
3. Klik **Connect to Git** dan pilih repositori Anda.
4. Pada halaman **Build settings**:
   - **Framework preset**: `Vite`
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
   - **Root directory**: `/` (kosongkan atau biarkan default)
5. Klik **Save and Deploy**.
6. Cloudflare akan membangun dan menerbitkan situs Anda dalam kurun waktu kurang dari 1 menit dengan URL gratis `https://<nama-proyek>.pages.dev`. Setiap kali Anda push commit baru, Cloudflare otomatis melakukan deploy ulang!

---

### Cara 2: Upload Langsung (Direct Upload via Dashboard)
Jika Anda ingin langsung mengunggah file tanpa Git:
1. Di komputer lokal Anda, jalankan perintah build:
   ```bash
   npm run build
   ```
   *(Folder hasil build akan tercipta di folder `dist/`)*
2. Buka [Cloudflare Dashboard](https://dash.cloudflare.com/) > **Compute (Workers & Pages)** > **Create application** > Tab **Pages**.
3. Pilih opsi **Upload assets**.
4. Beri nama proyek (misal: `daarul-huda-ibs`).
5. Drag & drop folder `dist` (atau arsipkan jadi `.zip`) langsung ke browser.
6. Klik **Deploy site**. Selesai!

---

### Cara 3: Menggunakan Wrangler CLI
Bisa langsung dari terminal lokal Anda:
1. Install atau jalankan wrangler:
   ```bash
   npm run build
   npx wrangler pages deploy dist
   ```
2. Ikuti instruksi login di peramban satu kali, lalu pilih buat project baru di Cloudflare Pages.

---

## Menghubungkan Domain Kustom Sendiri (.sch.id, .ponpes.id, .com, dll)
Setelah situs ter-deploy di Cloudflare Pages:
1. Masuk ke halaman proyek Pages di Cloudflare Dashboard.
2. Klik tab **Custom domains**.
3. Klik **Set up a custom domain**.
4. Masukkan nama domain Anda (misal: `daarulhuda.sch.id` atau `psb.daarulhuda.ponpes.id`).
5. Cloudflare akan otomatis menerbitkan sertifikat SSL/TLS gratis (HTTPS) dan mengaktifkan proteksi DDoS global.

---

## Solusi Error Build Cloudflare (ERESOLVE Peer Dependency):
Jika sebelumnya Anda mengalami error:
`npm error ERESOLVE could not resolve ... Conflicting peer dependency: esbuild`

Hal ini sudah diperbaiki secara permanen melalui:
1. Penghapusan versi esbuild lama yang berbenturan dengan Vite 8.
2. Penambahan file `.npmrc` dengan `legacy-peer-deps=true`.

*Jika di Cloudflare Pages Dashboard Anda menggunakan Custom Environment Variables, Anda juga dapat menambahkan:*
- Key: `NPM_FLAGS`
- Value: `--legacy-peer-deps`

