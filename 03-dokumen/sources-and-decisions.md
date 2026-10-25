# Sumber dan Keputusan

Tanggal audit: 25 Oktober 2026, Asia/Makassar.

## Kondisi awal

Working directory `C:\Users\yosuanry simbolon\Sistem\joki\Gunung Kawi VT` kosong dan belum menjadi repository Git. Tidak ada file pengguna dipindah atau dihapus. Pengguna mengonfirmasi proposal dan foto asli belum dimasukkan. Folder khusus disediakan sesuai permintaan.

## Kebutuhan

Master prompt pengguna: website informasi lima halaman, bahasa ID/EN, pemisahan aplikasi Next.js dan ekspor 3DVista, tanpa database/admin/login. Proposal Reneldis Mumas belum dibaca karena belum tersedia. Tidak ada klaim kesesuaian final terhadap BAB I/BAB III.

## Sumber sejarah dan lokasi

Diakses 25 Oktober 2026:

- [Situs Gunung Kawi, BPCB Bali](https://kebudayaan.kemdikbud.go.id/bpcbbali/situs-gunung-kawi/): kelompok candi tebing/ceruk pertapaan, hubungan situs dengan Pakerisan, interpretasi prasasti Udayana dan putra. Konten terindeks tersedia; pembukaan ulang URL sempat mengembalikan 502. Tidak mengambil kutipan panjang.
- [Gunung Kawi Tampaksiring Temple, Dinas Pariwisata Kabupaten Gianyar](https://diparda.gianyarkab.go.id/destinasi/gunung-kawi-tampaksiring-temple): Banjar Penaka, Tampaksiring, Gianyar; hubungan dengan Anak Wungsu. Halaman ini ditampilkan sebagai sumber bacaan pengunjung.
- [Indonesia Travel](https://www.indonesia.travel/id/id/travel-ideas/pilgrimage/gunung-kawi): pemeriksaan silang lokasi dan pengantar akses berjalan kaki. Harga, jam, jarak, dan waktu tempuh tidak ditampilkan karena tidak diperlukan dan belum diverifikasi untuk proyek.
- [DAS Pakerisan, BPCB Bali](https://kebudayaan.kemdikbud.go.id/bpcbbali/obyek-wisata-sepanjang-daerah-aliran-sungai-das-pakerisan-sebagai-warisan-budaya-dunia/): konteks kawasan sungai dan tinggalan budaya.
- [Evaluasi Konservasi Candi Tebing Gunung Kawi, BPCB Bali](https://kebudayaan.kemdikbud.go.id/bpcbbali/evaluasi-hasil-konservasi-cagar-budaya-candi-tebing-gunung-kawi-komplek-candi-5/): pentingnya perawatan serta pelestarian situs. Tidak menyalin kutipan hukum atau mengubahnya menjadi kebijakan resmi pengelola.

Tidak memakai timeline tahun atau kutipan tokoh. Ringkasan sejarah bersifat awal; identifikasi tokoh pada candi diperlakukan sebagai interpretasi, bukan kepastian makam. Data fasilitas dan scene dari prompt diberi status rencana, bukan hasil survei.

## Referensi desain

- `https://pura-pengukur-ukuran.vercel.app/`
- `https://panorama-beta-one.vercel.app/`

Pembukaan awal melalui alat web gagal. Pemeriksaan lanjutan melalui Playwright + Microsoft Edge berhasil menerima HTTP 200 pada keduanya; bukti `reference-audit/results.json` dan screenshot desktop/mobile disimpan terpisah dari aset website.

Temuan yang benar-benar terlihat: website informasi memiliki lima tautan navigasi Beranda, Sejarah, Lokasi, Informasi, dan Virtual Tour; beranda memakai teks di kiri dan panel media besar di kanan. Tangkapan awal memperlihatkan font sans dan aksen emas. Situs panorama berjudul `Untitled 3` menampilkan teks pemuatan pada tangkapan awal; viewer interaktif dan transisi lengkap belum dinilai. Screenshot diambil segera setelah DOM tersedia, sehingga tidak dianggap bukti bahwa seluruh aset/animasi referensi telah selesai dimuat. Struktur dua aplikasi mengikuti prompt. Tidak menyalin source, merek, atau foto referensi.

## Verifikasi teknologi

- Registry npm mengembalikan Next.js `16.4.3`, React `19.3.1`, Tailwind CSS `4.3.3`.
- Node.js lokal `24.11.1`, npm `11.6.2`; Node memenuhi minimum Next.js `>=20.9.0`.
- [Instalasi Next.js resmi](https://nextjs.org/docs/app/getting-started/installation).
- [Instalasi Tailwind v4 resmi](https://tailwindcss.com/docs/installation/framework-guides/nextjs): `@tailwindcss/postcss` dan `@import "tailwindcss"`.
- [Fitur multibahasa resmi 3DVista](https://www.3dvista.com/de/blog/multi-language-tours/). Ketersediaan pada instalasi pengguna tetap perlu diperiksa.

## Keputusan aset

Tidak mengambil foto pihak ketiga atau membuat gambar AI artefak. Placeholder garis kontur adalah grafis dekoratif CSS berlabel foto belum tersedia, bukan foto atau rekonstruksi Gunung Kawi. Tidak ada panorama engine. Folder aset siap diisi dan manifest mengontrol aktivasi foto nyata. Tur belum memiliki URL produksi.

## Keputusan revamp terbaru

Pengguna meminta desain/layout/font/copywriting/animasi mengikuti referensi Pura Pengukur-Ukuran, kemudian memilih foto asli Gunung Kawi berlisensi terbuka sementara. Keputusan ini menggantikan pendekatan visual ivory/forest/serif dan placeholder-only pada implementasi awal.

Audit ulang Edge meliputi `/`, `/history`, `/location`, `/information`, dan `/virtual-tour` pada desktop/mobile. Font aktual Geist; heading beranda `36px`, halaman dalam `48px` desktop dan `36px` mobile. Tampilan memakai latar foto dengan overlay gelap, teks putih/emas, dan panel transparan berbatas terang. Bukti: `reference-audit/revamp/`. Keterbatasan audit awal pada bagian sebelumnya merupakan riwayat.

Foto sementara berasal dari Wikimedia Commons, bukan situs pura referensi. Sumber, pencipta, lisensi, dan optimasi dicatat di `01-gunung-kawi-web/public/images/reference/attribution.json`. Tiga foto candi memakai CC BY 3.0; foto sawah public domain. Kredit lengkap ada di halaman Informasi. Foto saluran air tidak dilabeli Sungai Pakerisan; slot sungai, pertapaan, denah resmi, dan panorama tetap kosong jika subjek belum tersedia.
