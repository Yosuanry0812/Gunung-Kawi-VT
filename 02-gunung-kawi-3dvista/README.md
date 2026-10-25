# Ruang Kerja 3DVista

Tur belum diproduksi. Folder ini bukan aplikasi Next.js kedua dan tidak memuat panorama dummy.

| Folder | Fungsi |
| --- | --- |
| `raw-panorama/` | Master asli kamera, tidak ditimpa |
| `processed-panorama/` | Panorama yang telah dikoreksi dan diperiksa |
| `audio-guide/` | Naskah dan audio narasi ID/EN |
| `project/` | File proyek 3DVista dan aset pendamping |
| `web-export/` | Seluruh hasil Publish → For Web/Mobile tanpa mengubah struktur |
| `backup/` | Cadangan proyek dengan tanggal dan versi |

Semua isi media folder ini diabaikan Git. Buat cadangan terpisah; `.gitignore` bukan mekanisme backup.

Alur: pastikan izin → tentukan scene P01–P09 sesuai survei → foto 360° → periksa → impor hasil pemrosesan ke 3DVista → pilih opening scene → sambungkan hotspot → tambah informasi dan tour guide → masukkan kuis → uji bahasa dan perangkat → Publish → For Web/Mobile.

Panduan lengkap ada di `../03-dokumen/3dvista-workflow.md`, inventaris di `../03-dokumen/panorama-inventory.json`. Gunakan nama `P05_candi-timur_YYYYMMDD_take01.jpg`. Setiap hotspot harus mengarah ke scene yang benar-benar sudah diimpor.

Untuk menguji ekspor lokal, gunakan fitur preview/layanan lokal bawaan 3DVista yang sesuai versi terpasang atau jalankan HTTP server:

```powershell
cd web-export
python -m http.server 8080
```

Buka `http://localhost:8080/index.htm` jika `index.htm` benar-benar dihasilkan ekspor. Nama entry aktual mengikuti hasil ekspor. Jangan mengandalkan membuka `file://`.

Upload **seluruh** isi ekspor ke hosting terpisah yang kompatibel dan uji dahulu dengan tur kecil. Setelah URL HTTPS aktif, masukkan URL entry sebenarnya ke `NEXT_PUBLIC_VIRTUAL_TOUR_URL` di aplikasi Next.js, lalu build ulang. Jangan menaruh hasil ekspor dalam `public/` atau Git repository website.
