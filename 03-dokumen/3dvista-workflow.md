# Alur Produksi dan Integrasi 3DVista

Status 25 Oktober 2026: instruksi persiapan, belum dilakukan pada aplikasi 3DVista. Versi 3DVista pengguna belum diketahui. Nama menu berikut perlu dicocokkan dengan versi terpasang. Tur, hotspot, narasi audio, kuis, dan tombol kembali belum aktif.

## A. Pengambilan foto

1. Survei area, tentukan titik kamera dan hubungan antarjalur. P01–P09 adalah rencana, bukan sembilan panorama selesai.
2. Pastikan izin pengelola, batas akses, dan ketentuan dokumentasi terutama area persembahyangan. Catat izin per scene.
3. Ambil foto memakai kamera 360° pada tripod dengan eksposur konsisten. Hindari mengganggu jalur dan kegiatan keagamaan.
4. Periksa seam, horizon, ketajaman, pencahayaan, privasi orang yang terekam, dan keterbacaan objek.
5. Simpan master di `raw-panorama/`; jangan menimpa. Gunakan penamaan scene, lokasi, tanggal, dan take.
6. Simpan hasil stitching/koreksi di `processed-panorama/`. Catat revisi di inventaris.

## B. Pembuatan proyek

1. Buka 3DVista Virtual Tour Pro dan buat proyek di `project/`.
2. Impor hanya panorama yang lolos pemeriksaan. Cocokkan scene ID dengan `panorama-inventory.json`.
3. Pilih opening scene yang mudah dipahami dan arah pandang awal yang relevan.
4. Tentukan scene tujuan berdasarkan hubungan jalur hasil survei. Jangan mengasumsikan daftar P01–P09 adalah urutan berjalan yang sah.
5. Tambahkan hotspot navigasi dan atur aksi berpindah ke scene tujuan. Uji arah, posisi, dan jalur kembali.
6. Tambahkan hotspot informasi dengan judul, teks bersumber, foto detail berizin, dan tombol tutup yang jelas.
7. Siapkan naskah ID/EN setelah mencocokkan proposal dan sumber sejarah. Rekam audio, simpan `audio-guide/P05_id_v01.mp3` dan padanan EN. Hindari audio otomatis keras; sediakan kontrol mute/pause.
8. Masukkan narasi/tour guide melalui kontrol yang tersedia di versi 3DVista terpasang. Uji teks serta audio secara terpisah.
9. Masukkan soal dan feedback pada fitur kuis/e-learning versi terpasang. `src/content/quizzes.ts` berisi rancangan awal, bukan kuis aktif atau hasil penelitian.
10. Atur skin, kontrol panorama, pemilih scene, bantuan penggunaan, bahasa, audio, dan tombol kembali. Pastikan target sentuh memadai.
11. Preview setiap scene; uji navigasi, hotspot, informasi, narasi, kuis, dan kontrol pada desktop serta mobile. Perbarui inventaris hanya berdasarkan pekerjaan nyata.

## C. Bilingual tour

Dokumentasi resmi menyebut fitur bahasa bawaan pada 3DVista Virtual Tour Pro: [Multi-Language Tours](https://www.3dvista.com/de/blog/multi-language-tours/). Periksa tab Publish → Language dan dokumentasi versi yang benar-benar terpasang sebelum memilih strategi.

- Pilihan utama jika didukung: satu proyek dengan terjemahan ID/EN melalui fungsi bahasa bawaan. Uji seluruh skin, popup, kuis, font, dan audio; tidak semua aset nonteks otomatis diterjemahkan.
- Jika versi/fitur tidak memadai: ekspor ID dan EN terpisah, pertahankan struktur masing-masing, dokumentasikan dua URL dan tombol bahasa di tur.
- Implementasi Next.js saat ini memiliki satu URL tur dan **tidak meneruskan locale**. Switch ID/EN pada website tidak menjamin perubahan bahasa aplikasi panorama.
- Bila ingin menambahkan parameter bahasa di URL, verifikasi kode bahasa dan perilaku pada ekspor aktual terlebih dahulu, lalu ubah helper integrasi secara terpusat dan tambahkan pengujian. Jangan mengasumsikan `id` Next.js sama dengan kode bahasa tur.

## D. Publishing

Gunakan **Publish → For Web/Mobile** sesuai versi terpasang. Aktifkan keluaran mobile bila sesuai kebutuhan perangkat. Dokumentasi [mobile version](https://www.3dvista.com/en/kb/faqs/virtual-tours/what-is-the-mobile-version-option-for/?seq_no=2) menjelaskan pilihan optimasi perangkat mobile.

Ekspor umumnya memuat `index.htm`, `script.js`, `Media/`, dan `Lib/`, tetapi struktur aktual hasil ekspor adalah acuannya. Simpan seluruh keluaran di `web-export/`. Jangan mengganti kapitalisasi, memindahkan aset, atau mengubah entry berdasarkan contoh ini.

Jalankan preview 3DVista atau HTTP server lokal dari root ekspor. Uji tur kecil dahulu dan periksa console/network browser: tidak ada 404 aset atau error CORS/MIME. Uji juga setelah reload pada URL entry langsung.

## E. Hosting terpisah

Pertimbangkan:

- Hosting 3DVista: cek paket, kuota penyimpanan dan bandwidth, domain, dan batas unggahan pada layanan saat akan dipakai.
- Static hosting yang kompatibel: pastikan dukungan entry `.htm`, banyak berkas, tipe MIME, ukuran unggahan, dan bandwidth. Konfigurasikan index dokumen yang benar.
- Object storage dengan penyajian HTML/CDN yang benar: akses HTML harus tampil sebagai halaman, bukan unduhan. Periksa HTTPS, MIME, CORS jika lintas origin, dan kebijakan cache.

Jangan menganggap Vercel gratis pasti mampu menampung ekspor 10 GB. Ukur tur kecil pada jaringan desktop dan seluler, hitung ukuran final serta biaya trafik, baru pilih hosting. Tidak ada layanan hosting berbayar dipilih atau diaktifkan dalam implementasi ini.

## F. Integrasi Next.js

1. Pastikan URL HTTPS tur nyata berhasil dibuka, termasuk entry ekspor.
2. Isi `01-gunung-kawi-web/.env.local`:

```env
NEXT_PUBLIC_VIRTUAL_TOUR_URL=
NEXT_PUBLIC_SITE_URL=
```

Kedua nilai di atas sengaja kosong. Masukkan URL sebenarnya; `NEXT_PUBLIC_SITE_URL` cukup origin website utama.

3. Restart `npm run dev` atau jalankan build dan deployment ulang. Nilai `NEXT_PUBLIC_` terikat saat build.
4. Buka `/id/virtual-tour` dan `/en/virtual-tour`.
5. Tombol aktif membuka tur pada tab baru dengan `noopener noreferrer`. Bila URL kosong/tidak aman, tombol disabled dan pesan persiapan tampil.
6. Uji seluruh scene, navigasi, hotspot, informasi, tour guide, kuis, dan bahasa pada tur nyata. Website Next.js tidak membuat atau memeriksa isi ekspor tersebut.
7. Tambahkan tombol “Kembali ke Website Gunung Kawi” / “Back to Gunung Kawi Website” pada skin 3DVista: gunakan aksi pembukaan URL yang tersedia pada versi terpasang dan arahkan ke origin website sebenarnya dengan `/id` atau `/en` yang sesuai. Jangan hardcode localhost pada ekspor produksi.
8. Uji tombol kembali pada browser desktop dan mobile serta saat tur dibuka langsung. Fitur ini baru dianggap aktif setelah ekspor ulang dan pengujian hasil hosting.

## G. Penerimaan tur nyata

Catat versi 3DVista, URL, ukuran ekspor, perangkat, tanggal uji, bahasa, bukti tiap fungsi, serta masalah tersisa. Status scene berubah menjadi selesai hanya setelah aset nyata dan hasil uji tersedia. Jangan mengisi hasil UEQ atau keberhasilan tur berdasarkan rancangan semata.
