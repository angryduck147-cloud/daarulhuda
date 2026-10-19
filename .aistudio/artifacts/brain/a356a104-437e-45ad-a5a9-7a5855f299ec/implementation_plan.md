# Website Daarul Huda Islamic Boarding School & Penerimaan Santriwati Baru (PSB)

Website resmi Daarul Huda Islamic Boarding School (معهد دار الهدى الإسلامي للبنات - Berbasis Adab dan Akhlaq), dirancang khusus dengan visual Islami megah dan berkelas (warna hijau zamrud / deep emerald, emas mewah / rich gold, dan krem). Menghadirkan **Slideshow Galeri Megah & Elegan di bagian paling awal** saat website dibuka, profil pondok, dewan masyayikh, program pendidikan 6 tahun, fasilitas & kegiatan santriwati, serta alur pendaftaran santriwati baru (PSB) digital langsung di website.

---

### User Review & Critical Decisions

> [!IMPORTANT]
> Masukan Terbaru Pengguna:
> 1. **Slideshow Megah & Elegan di Awal Halaman**:
>    - Di bagian paling atas (Hero Area) langsung dihadirkan slideshow sinematik berornamen arsitektur Islami dengan transisi halus, indikator geser elegan, tombol kontrol prev/next bergaya emas, dan keterangan kegiatan pesantren.
>    - Mendukung mode putar otomatis (auto-play) dengan kontrol jeda, tombol CTA langsung ke formulir pendaftaran, dan opsi ganti foto cepat.
> 2. **Penyediaan Struktur Folder Foto Tanpa AI Generation**:
>    - Disiapkan folder terstruktur (`public/images/slideshow/`, `public/images/gallery/`, `public/images/masyayikh/`) dengan panduan nama file yang jelas (`slide-1.jpg`, `slide-2.jpg`, `tahfidz.jpg`, dll).
>    - Sama sekali tidak menggunakan tool generate AI guna menghemat kuota pengguna.
>    - Dilengkapi fallback bingkai ornamen Islami artistik jika foto belum ditaruh di folder, serta opsi upload langsung dari browser untuk kemudahan preview instan.
> 3. **Alur Pendaftaran Melalui Website Terlebih Dahulu**:
>    - Calon wali santri mengisi formulir pendaftaran digital di web (identitas santriwati, orang tua, pilihan jalur reguler/beasiswa yatim dhuafa 100%, konfirmasi transfer).
>    - Sistem website menerbitkan **Nomor Registrasi Unik** (`PSB-DH-2027-XXXX`) dan kartu pendaftaran.
>    - Dilengkapi tombol satu-klik kirim konfirmasi ke WhatsApp resmi panitia dengan format baku sesuai brosur.

- **Keputusan Dikonfirmasi**: Hero Slideshow megah di awal + Pendaftaran online di web lebih dulu + Folder foto siap isi mandiri.

---

## 1. Overview & Core Concept

- **Tujuan Utama**: Membangun kehadiran digital yang anggun, berwibawa, dan memikat sejak detik pertama pengunjung membuka website melalui slideshow kegiatan santriwati bernuansa islami mewah, sekaligus menyederhanakan proses PSB Angkatan Ke-IV T.A. 2027/2028.
- **Jenjang Pendidikan**: 6 Tahun (setingkat SMP sampai SMA), Berbasis Mulazamah & Adab-Akhlaq, Target Hafalan 30 Juz Al-Qur'an, Ijazah Pondok, Ijazah Negara, Ijazah Tahfidz, dan kesempatan Ijazah Sanad.

---

## 2. User Experience & Visual Design

### A. Slideshow Megah di Awal Halaman (Grand Hero Showcase)
- **Komposisi Visual**:
  - Diletakkan tepat di bawah header navigasi atau menyatu sebagai hero fullscreen/wide-frame.
  - Bingkai berornamen emas geometris Islami (Islamic arabesque / mihrab arch) dengan latar hijau zamrud tua bergradasi megah.
  - Setiap slide memadukan visual kegiatan pesantren dengan teks tipografi anggun (*Playfair Display* & *Plus Jakarta Sans*), kaligrafi Arab, dan lencana emas resmi.
- **Daftar Slide Awal**:
  1. *Penerimaan Santriwati Baru (PSB) 2027/2028* - Angkatan Ke-IV "Berbasis Adab dan Akhlaq".
  2. *Program Tahfidz Al-Qur'an 30 Juz & Mulazamah* - Membangun generasi penjaga kalamullah yang tangguh dalam berdakwah.
  3. *Dewan Masyayikh Bersanad Internasional* - Dibimbing langsung pemegang sanad Qira'ah 'Asyroh & Kutubus Sittah.
  4. *Fasilitas Unggul & Lingkungan Asri* - Asrama kamar mandi dalam, ruang mulazamah, dan masjid representatif.
  5. *Ekstrakurikuler Sunnah & Keputrian* - Memanah, berkuda, berenang, beladiri, kaligrafi, menjahit, & tata boga.
- **Interaksi**:
  - Auto-play dengan timer progres halus, tombol navigasi panah kiri/kanan bersepuh emas, pagination dots interaktif, serta tombol langsung *"Daftar Sekarang"* dan *"Jelajahi Pesantren"*.

### B. Alur Pendaftaran Online di Website (PSB Online)
1. **Tahap 1 - Petunjuk & Syarat**:
   - Membaca syarat kelulusan SD/MI, berkas administrasi (KK, Akte, SKL, KTP Orang Tua, Pas Foto, BPJS, Raport), dan informasi rekening pendaftaran (BRI 090401041199531 a.n. Anisa Zulfa Maqfiroh, Rp 300.000).
2. **Tahap 2 - Pengisian Formulir Web**:
   - **Data Calon Santriwati**: Nama Lengkap, NISN, Tempat & Tanggal Lahir, Asal Sekolah (SD/MI), Jumlah Hafalan Saat Ini.
   - **Data Orang Tua / Wali**: Nama Ayah & Ibu, Pekerjaan, Alamat Lengkap Domisili, Nomor WhatsApp Aktif.
   - **Jalur Pendaftaran**: Pilihan *Jalur Reguler* atau *Jalur Beasiswa Yatim & Dhuafa 100%*.
   - **Konfirmasi Pembayaran**: Nama pemilik rekening pengirim dan tanggal transfer.
3. **Tahap 3 - Validasi & Penerbitan Bukti Pendaftaran**:
   - Sistem web memvalidasi data dan menerbitkan **ID Pendaftaran Unik** (`PSB-DH-2027-XXXX`).
   - Tampil kartu resume pendaftaran yang memuat data lengkap dan petunjuk verifikasi lanjutan.
   - Tombol satu-klik **"Kirim Konfirmasi ke WhatsApp Panitia"** dengan format baku:
     `[Nama Calon Santriwati] # [Tanggal Transfer] # [Nama Pemilik Rekening] # [No. HP]` langsung ke 3 kontak admin (0881-0103-94301 / 0821-4396-1730 / 0853-2960-6208).
4. **Cek Status Pendaftaran**:
   - Fitur pencarian pendaftaran via Nomor Registrasi atau Nama Santriwati.

### C. Galeri Kegiatan & Manajemen Folder Foto
- **Folder Terstruktur**:
  - `public/images/slideshow/` (untuk slide banner utama).
  - `public/images/gallery/` (untuk foto kegiatan lengkap).
  - `public/images/masyayikh/` (untuk foto dewan ulama).
- **Tampilan Galeri**:
  - Filter kategori yang responsif (Semua, Tahfidz & Al-Qur'an, Kajian Kitab, Ekstrakurikuler, Keasramaan).
  - Tampilan kartu foto dengan bingkai ornamen Islami warna emas.
  - Fallback grafis kaligrafi dan tombol *"Unggah Foto"* langsung di peramban jika file di folder belum terisi.

---

## 3. Struktur Teknis Proyek

```
public/
  └── images/
      ├── slideshow/          <-- Folder foto slideshow megah (slide-1.jpg, slide-2.jpg, ...)
      ├── gallery/            <-- Folder foto galeri kegiatan santriwati
      ├── masyayikh/          <-- Folder foto dewan penasehat & pembina
      └── README.md           <-- Petunjuk pengisian foto mandiri
src/
  ├── components/
  │   ├── Navbar.tsx          <-- Navigasi utama & kontak cepat
  │   ├── HeroSlideshow.tsx   <-- Slideshow megah & elegan di awal website
  │   ├── Masyayikh.tsx       <-- Profil ulama & direktris pondok
  │   ├── ProgramUnggulan.tsx <-- Target 6 tahun, 30 juz, fasilitas, ekskul
  │   ├── PrestasiTahfidz.tsx <-- Rekam jejak santriwati tahfidz 30 juz
  │   ├── Investment.tsx      <-- Rincian biaya & beasiswa 100% yatim dhuafa
  │   ├── Gallery.tsx         <-- Galeri kegiatan santriwati + modal upload
  │   ├── RegistrationForm.tsx<-- Formulir pendaftaran online di web
  │   ├── CheckStatusModal.tsx<-- Cek status pendaftaran santriwati
  │   └── Footer.tsx          <-- Kontak 3 admin, rekening BRI, medsos
  ├── types/
  │   └── index.ts            <-- Tipe data pendaftaran & galeri
  ├── data/
  │   └── initialData.ts      <-- Data lengkap brosur & konfigurasi slide
  ├── App.tsx
  └── index.css
```
