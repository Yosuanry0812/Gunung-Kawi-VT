# Matriks Black Box Testing

Build dan hasil aktual diisi setelah eksekusi; pengujian tur nyata dan responden terpisah dari pengujian website.

| ID | Skenario / masukan | Hasil yang diharapkan | Bukti otomatis |
| --- | --- | --- | --- |
| BB01 | Buka `/` | Redirect ke `/id` | E2E root |
| BB02 | Buka 10 route bilingual | HTTP 200, satu H1, lang benar | E2E routes |
| BB03 | Klik ID/EN pada semua halaman | Berpindah ke halaman ekuivalen | E2E locale |
| BB04 | Navigasi internal | Semua target tersedia tanpa link rusak | E2E local links |
| BB05 | Menu pada mobile | Buka/tutup, Escape, fokus terjaga, scroll lock | E2E keyboard |
| BB06 | Lebar 360, 390, 768, 1024, 1440, 1920 | Tidak ada overflow horizontal | E2E responsive |
| BB07 | Env tur kosong | Status persiapan, tombol disabled, tidak membuka halaman kosong | E2E + unit |
| BB08 | URL HTTPS tur valid | URL dipertahankan; link tab baru dan rel aman | Unit + E2E build valid terpisah |
| BB09 | `javascript:`, HTTP publik, kredensial, URL rusak | Ditolak, tidak ada tujuan launch | Unit |
| BB10 | HTTP localhost dev / production | Diterima dev; ditolak production | Unit |
| BB11 | Aset belum tersedia | Placeholder jujur, tidak ada gambar rusak | E2E assets |
| BB12 | Reduced motion | Scroll auto, animasi dimatikan | E2E reduced motion |
| BB13 | Keyboard skip link | Fokus berpindah ke konten | E2E keyboard |
| BB14 | Peta belum disetujui | Tidak ada iframe; tombol muat dan fallback link tersedia | E2E map |
| BB15 | Peta gagal dimuat | Tautan Google Maps tetap tersedia | E2E aborted map |
| BB16 | Metadata, canonical, hreflang | Sesuai halaman dan bahasa | E2E metadata |
| BB17 | Sitemap dan robots | Memuat alamat 10 halaman | E2E SEO |
| BB18 | Pemindaian WCAG AA | Tidak ada pelanggaran otomatis pada 10 halaman | axe-core E2E |
| BB19 | Route tidak dikenal | Halaman 404 yang dapat dipahami | E2E 404 |
| BB20 | Semua scene inventaris | Sembilan ID unik, semua planned | Unit |
| BB21 | Tur nyata: panorama/hotspot/guide/kuis/kembali | Berfungsi pada ekspor dan hosting asli | Menunggu aset dan ekspor; belum diuji |
| BB22 | UEQ responden | Data nyata sesuai protokol | Belum dilakukan |

Lulus pemindaian aksesibilitas otomatis bukan sertifikasi keseluruhan WCAG. Peninjauan pembaca layar, konten akhir, akses lapangan, dan pengujian tur asli tetap diperlukan.

## Hasil eksekusi 25 Oktober 2026

BB01–BB20 lulus sesuai cakupan bukti otomatis pada matriks: `6` tes logika/render, `12` tes browser utama, dan `2` tes browser build URL terisi. Pengujian BB08 menggunakan tujuan fixture HTTPS yang dicegat browser; tidak menguji isi tur asli. BB21 dan BB22 belum dilakukan karena menunggu ekspor nyata dan responden. Laporan lengkap: `hasil-implementasi.md`.
