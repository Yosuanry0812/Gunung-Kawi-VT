# Memasukkan Proposal dan Foto

## Proposal

Letakkan proposal asli di `03-dokumen/proposal/`. Simpan dokumen sumber apa adanya; revisi konten website dilakukan setelah pemeriksaan BAB I dan BAB III.

## Foto website

Semua path di bawah relatif terhadap `01-gunung-kawi-web/public/`.

| Key manifest | Lokasi file yang disiapkan | Kegunaan |
| --- | --- | --- |
| hero | `images/home/hero-gunung-kawi.jpg` | Hero beranda |
| introduction | `images/home/pakerisan-valley.jpg` | Pengenalan kawasan |
| east | `images/home/candi-timur.jpg` | Sorotan candi timur |
| west | `images/home/candi-barat.jpg` | Sorotan candi barat |
| river | `images/location/sungai-pakerisan.jpg` | Sungai dan lokasi |
| hermitage | `images/history/pertapaan.jpg` | Pertapaan |
| rice | `images/location/persawahan.jpg` | Lanskap persawahan |
| history | `images/history/candi-tebing.jpg` | Sejarah |
| information | `images/information/denah-kawasan.jpg` | Cadangan denah terverifikasi |
| tour | `images/virtual-tour/preview.jpg` | Cadangan pratinjau setelah ekspor tersedia |

1. Masukkan foto asli sesuai nama file. Gunakan file JPG/WebP; jika ekstensi berbeda, sesuaikan manifest.
2. Buka `01-gunung-kawi-web/src/content/media.ts`.
3. Ganti `src: null` pada key yang sesuai dengan path publiknya. Contoh:

```ts
hero: { src: "/images/home/hero-gunung-kawi.jpg", path: "/images/home/hero-gunung-kawi.jpg", id: "GK—01" },
```

4. Jalankan aplikasi dan periksa crop desktop/mobile. Sesuaikan caption bilingual pada pemakaian `MediaPanel` jika foto berbeda. `next/image` menangani ukuran responsif dan optimasi.
5. Catat fotografer, tanggal, tempat, izin, dan lisensi pada `asset-register.csv` sebelum publikasi. Hindari dokumentasi area atau kegiatan yang belum diizinkan.

**Mengapa dua langkah?** Menyalin file saja tidak langsung mengaktifkannya; manifest harus menyatakan foto yang benar-benar siap digunakan. Ini mencegah tautan gambar rusak atau foto yang belum diverifikasi tampil tanpa sengaja.

Denah `information` dan pratinjau `tour` adalah slot cadangan manifest, belum dipasang sebagai gambar di UI. Setelah aset tersedia, ganti `site-plan-placeholder` di `src/components/pages.tsx` dengan denah terverifikasi dan teks alternatif yang menjelaskan denah. Untuk pratinjau, pakai tangkapan layar ekspor nyata beserta label yang tepat; jangan menyebut foto biasa sebagai panorama.

Rekomendasi: foto utama sekitar 1800–2400 px sisi panjang, foto pendamping 1200–1600 px, kompres kualitas visual secukupnya. Simpan master kamera di luar bundle website. Jangan memasukkan panorama resolusi penuh ke folder gambar website.

## Panorama dan audio

- Asli kamera: `02-gunung-kawi-3dvista/raw-panorama/`.
- Hasil koreksi: `02-gunung-kawi-3dvista/processed-panorama/`.
- Narasi ID/EN: `02-gunung-kawi-3dvista/audio-guide/`.
- Nama: `P05_candi-timur_YYYYMMDD_take01.jpg`, `P05_id_v01.mp3`, `P05_en_v01.mp3`.

Folder tersebut sudah tersedia dan diabaikan Git agar data besar tidak ikut repository web.
