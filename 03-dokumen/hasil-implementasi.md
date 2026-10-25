# Hasil Implementasi Gunung Kawi Virtual Tour

Tanggal: 25 Oktober 2026, Asia/Makassar. Implementasi dilakukan langsung pada folder proyek lokal. Website informasi sudah dapat dibangun dan dijalankan. Produksi tur 3DVista menunggu aset asli dan pekerjaan manual.

## 1. Versi teknologi aktual

| Teknologi | Versi |
| --- | --- |
| Node.js | `24.11.1` |
| npm | `11.6.2` |
| Next.js App Router | `16.4.3` |
| React / React DOM | `19.3.1` |
| Tailwind CSS / PostCSS plugin | `4.3.3` |
| TypeScript strict | `5.9.3` |
| Motion | `14.6.0` |
| Lucide React | `1.61.0` |
| ESLint | `10.13.0` |
| Playwright | `1.64.1` |
| axe-core Playwright | `4.14.0` |

Versi dipatok pada `package.json` dan `package-lock.json`. Instalasi Tailwind memakai `@tailwindcss/postcss` serta `@import "tailwindcss"`. Registry dan dokumentasi resmi diperiksa sebelum instalasi. Tidak memakai paket alpha/beta/canary/RC. Konfigurasi `experimental.globalNotFound` digunakan hanya untuk fallback 404 lintas root layout dan masih berstatus experimental menurut dokumentasi Next.js.

## 2. Struktur folder aktual

```text
Gunung Kawi VT/
├── README.md
├── .gitignore
├── 01-gunung-kawi-web/
│   ├── .env.example
│   ├── package.json
│   ├── package-lock.json
│   ├── public/
│   │   ├── icon.svg
│   │   └── images/{home,history,location,information,virtual-tour}/
│   ├── src/
│   │   ├── app/{(entry),[locale],global-not-found.tsx,...}
│   │   ├── components/
│   │   ├── content/
│   │   ├── i18n/dictionaries/{id,en}.ts
│   │   └── lib/
│   ├── scripts/
│   └── tests/{e2e,...}
├── 02-gunung-kawi-3dvista/
│   ├── raw-panorama/
│   ├── processed-panorama/
│   ├── audio-guide/
│   ├── project/
│   ├── web-export/
│   ├── backup/
│   └── README.md
└── 03-dokumen/
    ├── proposal/
    ├── preview/
    ├── reference-audit/
    ├── panduan-aset.md
    ├── asset-register.csv
    ├── panorama-inventory.json
    ├── 3dvista-workflow.md
    ├── black-box-testing.md
    ├── ueq-testing.md
    ├── sources-and-decisions.md
    ├── project-state.md
    └── hasil-implementasi.md
```

Folder induk bukan aplikasi Next.js. Tidak ada aplikasi frontend kedua, database, CMS, admin, login, pembayaran, atau pemesanan tiket.

## 3. Halaman yang selesai diimplementasikan

| Halaman | Indonesia | English |
| --- | --- | --- |
| Beranda | `/id` | `/en` |
| Sejarah | `/id/sejarah` | `/en/history` |
| Lokasi | `/id/lokasi` | `/en/location` |
| Informasi | `/id/informasi` | `/en/information` |
| Pengantar Virtual Tour | `/id/virtual-tour` | `/en/virtual-tour` |

Root `/` mengalihkan ke `/id`. Sepuluh halaman utama diprarender saat build. Route tidak dikenal menampilkan 404 lokal atau fallback global bilingual. Metadata per halaman mencakup title, description, Open Graph, canonical, dan language alternates; sitemap dan robots tersedia.

## 4. UI/UX

Palet forest/ivory/sandstone dengan aksen heritage gold. Cormorant Garamond untuk judul editorial dan Plus Jakarta Sans untuk isi serta kontrol. Hero asimetris, ruang media dengan garis kontur, grid sorotan berbeda ukuran, cerita sejarah, pengantar tur berlatar forest, langkah penggunaan, lokasi, penutup, dan footer proyek penelitian.

Navigasi fixed memiliki status aktif dan perubahan visual saat scroll. Menu mobile mendukung Escape, focus trap, penguncian scroll, penutupan saat navigasi, dan latar halaman inert ketika terbuka. Tersedia skip link, focus ring, teks alternatif foto, reduced motion, serta animasi Motion/CSS terbatas. Teks isi utama diperbesar setelah tinjauan visual; warna teks disesuaikan berdasarkan hasil axe.

Peta memakai pencarian nama lokasi yang diverifikasi. Tidak mengarang koordinat. Pengunjung memilih memuat iframe Google Maps; tautan eksternal selalu tersedia sebagai fallback. Tidak menampilkan harga tiket, jam operasional, atau kontak yang belum diverifikasi.

Preview hasil aktual tersedia di `preview/home-viewport-1440.png`, `preview/home-viewport-390.png`, serta screenshot halaman penuh `home-1440.png` dan `home-390.png`. Screenshot desktop/mobile sudah ditinjau secara visual.

## 5. Bilingual

Dictionary lokal typed tanpa API terjemahan. Switch ID/EN mempertahankan halaman ekuivalen dan atribut `html lang` sudah benar pada HTML awal. Navigasi, konten, CTA, footer, pesan aset belum tersedia, status tur, error lokal, dan metadata memiliki dua bahasa. Judul sumber bacaan mempertahankan nama publikasi aslinya.

## 6. Mekanisme tombol Virtual Tour

`NEXT_PUBLIC_VIRTUAL_TOUR_URL` kosong secara default. `validateTourUrl` menolak skema berbahaya, URL rusak, kredensial dalam URL, HTTP publik, dan domain contoh yang ditentukan. HTTP localhost hanya diizinkan selama development; produksi memakai HTTPS.

`VirtualTourLaunchButton` menampilkan status persiapan dan tombol disabled bila URL kosong/tidak valid. URL HTTPS valid menghasilkan link tab baru dengan `rel="noopener noreferrer"` dan label aksesibilitas. CTA beranda mengarah ke halaman pengantar tur terlebih dahulu.

Pengujian URL terisi menggunakan `https://tour.test/index.htm` yang dicegat Playwright sebagai fixture lokal pengujian, bukan panorama nyata atau URL produksi. Setelah pengujian, build tanpa URL tur dipulihkan. Locale website tidak otomatis mengubah bahasa aplikasi 3DVista.

## 7. Persiapan 3DVista

Enam folder media/proyek tersedia dengan `.gitkeep` dan aturan Git untuk mengabaikan data besar. Inventaris memuat P01–P09 beserta nama ID/EN, deskripsi, kategori, status, catatan izin, serta rencana hotspot, narasi, dan kuis. Semua masih `planned`.

Panduan menjelaskan pengambilan foto, pemeriksaan izin, impor panorama, opening scene, hotspot, guide, kuis, bilingual, skin, Publish → For Web/Mobile, pengujian lokal, pemilihan hosting, integrasi env, dan tombol kembali ke website utama. Fitur pada ekspor 3DVista belum diimplementasikan atau diuji karena proyek/aset belum tersedia.

## 8. Aset dan verifikasi yang menunggu pengguna

- Proposal: masukkan berkas asli ke `proposal/`, kemudian periksa BAB I dan BAB III.
- Foto: masukkan ke `01-gunung-kawi-web/public/images/` mengikuti `panduan-aset.md`, lalu aktifkan `src` pada manifest.
- Panorama, audio, proyek, ekspor, denah resmi, hasil survei, serta URL hosting belum tersedia.
- Konten sejarah awal menggunakan sumber pemerintah yang dicatat. Belum ada klaim bahwa proposal telah dibaca atau konten telah dicocokkan dengannya.
- Tidak ada foto AI artefak, panorama palsu, file dummy besar, atau hasil UEQ buatan.

## 9. Pengujian aktual dan hasil

| Perintah / pemeriksaan | Hasil akhir |
| --- | --- |
| `npm ci --no-fund --no-audit` | Berhasil dari instalasi bersih |
| `npm run lint` | Lulus, tidak ada isu |
| `npm run typecheck` | Lulus |
| `npm test` | `6` lulus, `0` gagal |
| `npm run build` | Berhasil, termasuk build pemulihan tanpa URL tur |
| `npm run test:e2e` | `12` lulus, `0` gagal |
| `npm run test:tour-url` | `2` tes browser URL terisi lulus; build tanpa URL dipulihkan |
| Axe WCAG A/AA / 2.1 pada `10` halaman | Tidak ada pelanggaran otomatis yang terdeteksi |
| Responsif `360`, `390`, `768`, `1024`, `1440`, `1920` | `10` route pada setiap lebar, tanpa overflow horizontal |
| Review screenshot desktop/mobile | Dilakukan |

Total tes browser: `14` pada Microsoft Edge; tes logika/render: `6`. Pengujian mencakup routing, link internal, pergantian locale, metadata, aset, keyboard/menu, reduced motion, peta dan fallback, 404 lokal/global, sitemap/robots, serta kedua kondisi tombol tur. Server produksi dijalankan selama E2E dan dihentikan setelah pengujian.

Batas verifikasi: belum diuji pada Safari/Firefox/perangkat fisik, belum ada pengujian pembaca layar penuh atau skor Lighthouse, dan belum ada pengujian panorama asli. Lulus axe bukan sertifikasi keseluruhan WCAG. Protokol Black Box dan UEQ tersedia; UEQ belum memiliki responden atau hasil.

## 10. Menjalankan dan menguji ulang

Dari folder induk:

```powershell
cd 01-gunung-kawi-web
npm ci
Copy-Item .env.example .env.local
npm run dev
```

Buka `http://localhost:3000`. Jangan menimpa `.env.local` yang sudah berisi konfigurasi Anda; penyalinan contoh hanya untuk setup pertama.

Untuk memeriksa ulang:

```powershell
npm run lint
npm run typecheck
npm test
npm run build
npm run test:e2e
```

Tutup server development pada port `3000` sebelum E2E. `npm run test:tour-url` adalah pemeriksaan tambahan dengan build fixture dan pemulihan; jalankan pada konfigurasi awal tanpa URL tur nyata. Browser Edge harus terpasang. Build font memerlukan koneksi Google Fonts.

## 11. Langkah berikutnya

1. Masukkan proposal dan foto, lalu verifikasi narasi terhadap dokumen sumber.
2. Catat izin, lisensi, fotografer, dan tanggal pada register aset.
3. Survei scene; produksi, ekspor, dan uji tur asli menggunakan 3DVista.
4. Pilih hosting sesuai ukuran ekspor nyata, bandwidth, MIME, dan HTTPS.
5. Isi `NEXT_PUBLIC_SITE_URL` dengan origin website sebenarnya dan `NEXT_PUBLIC_VIRTUAL_TOUR_URL` dengan entry tur nyata, lalu build/deploy ulang. Default canonical lokal masih `http://localhost:3000`.
6. Uji foto akhir, navigasi/hotspot/guide/kuis/bahasa/tombol kembali pada ekspor nyata, kemudian lakukan pengujian UEQ sesuai proposal.

Belum ada website dipublikasikan ke hosting eksternal dalam pekerjaan lokal ini.
