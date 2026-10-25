# Gunung Kawi — Website Informasi

Next.js App Router, React, TypeScript strict, Tailwind CSS v4 melalui `@tailwindcss/postcss`, Motion, Lucide React, Cormorant Garamond dan Plus Jakarta Sans dari `next/font/google`. Versi persis dikunci di `package-lock.json`. Node.js 24 LTS, npm.

## Perintah

Dari folder induk `Gunung Kawi VT`, tersedia `pnpm dev` atau `pnpm run dev` melalui launcher. Dari folder aplikasi ini, script yang sama juga dapat dijalankan dengan `pnpm dev`. Instalasi dependency memakai `npm ci` sesuai `package-lock.json` yang sudah ada.

```powershell
npm ci
Copy-Item .env.example .env.local
npm run dev
# http://localhost:3000
```

```powershell
npm run lint
npm run typecheck
npm test
npm run build
npm run test:e2e
npm run test:tour-url
```

E2E memakai Microsoft Edge terpasang, menjalankan `next start` otomatis pada port 3000. Tutup server development pada port tersebut sebelum E2E agar yang diuji adalah build produksi. Untuk OS lain, ganti `channel: "msedge"` di `playwright.config.ts` sesuai browser terpasang. Laporan HTML: `npx playwright show-report`. Build memerlukan akses ke Google Fonts untuk `next/font/google`.

`test:tour-url` membuat build sementara dengan URL fixture HTTPS, menguji pembukaan tab baru dalam dua bahasa, lalu membangun ulang tanpa URL tur. Domain fixture dicegat Playwright dan tidak digunakan sebagai panorama produksi. Jalankan sebelum mengisi `.env.local` dengan URL tur nyata; jangan menjalankan dua server/build bersamaan.

ESLint 10 memakai `@next/eslint-plugin-next`, React Hooks, dan typescript-eslint secara langsung. Ini menjaga aturan Next.js dan TypeScript tanpa memaksa peer dependency plugin lama yang belum menyatakan dukungan ESLint 10.

## Routing

| Halaman | Indonesia | English |
| --- | --- | --- |
| Beranda | `/id` | `/en` |
| Sejarah | `/id/sejarah` | `/en/history` |
| Lokasi | `/id/lokasi` | `/en/location` |
| Informasi | `/id/informasi` | `/en/information` |
| Virtual Tour | `/id/virtual-tour` | `/en/virtual-tour` |

Switcher mempertahankan halaman ekuivalen. Semua konten utama diprarender. Beberapa root layout dipakai supaya atribut `html lang` benar pada HTML awal setiap bahasa. Halaman root melakukan redirect ke `/id`.

Route tidak dikenal dalam `/id` dan `/en` menampilkan 404 lokal. Untuk alamat tanpa locale yang dikenal, digunakan `global-not-found.tsx` bilingual. Fitur `experimental.globalNotFound` Next.js diperlukan karena aplikasi memiliki beberapa root layout; [dokumentasi resminya](https://nextjs.org/docs/app/api-reference/file-conventions/not-found) masih menandai konfigurasi ini sebagai experimental. Halaman utama tetap diprarender; hanya fallback route yang dirender sesuai permintaan. Tidak ada paket prerelease digunakan.

## Mengubah konten

- `src/i18n/dictionaries/{id,en}.ts`: antarmuka, narasi, metadata, dan pesan status.
- `src/content/history.ts`: ringkasan sejarah bilingual.
- `src/content/sources.ts`: sumber primer dan tanggal akses.
- `src/content/heritage-highlights.ts`: lima sorotan kawasan.
- `src/content/locations.ts`: konfigurasi peta dan inventaris scene.
- `src/content/visitor-information.ts`: langkah tur dan fitur yang direncanakan.
- `src/content/quizzes.ts`: rancangan soal untuk dimasukkan secara manual ke 3DVista.
- `src/content/media.ts`: manifest foto lokal. Nilai `src: null` menampilkan placeholder yang jujur, tanpa permintaan gambar rusak.
- `src/app/globals.css`: token warna, komposisi editorial dan breakpoint.

## Konfigurasi

`NEXT_PUBLIC_VIRTUAL_TOUR_URL` kosong secara default. Tombol menampilkan status persiapan dan disabled. HTTPS valid membuka tur pada tab baru dengan `noopener noreferrer`. HTTP localhost hanya diterima ketika development; protokol berbahaya, URL kosong, kredensial pada URL, dan domain contoh ditolak.

`NEXT_PUBLIC_SITE_URL` adalah origin website sebenarnya, misalnya origin domain hosting yang Anda miliki. Default lokal `http://localhost:3000` dipakai canonical, sitemap, dan Open Graph. **Isi origin sebenarnya sebelum build produksi** agar SEO tidak menunjuk localhost. Public environment variables masuk ke output saat build; restart development/build ulang setelah mengubahnya.

Tidak ada database, login, API konten, atau panorama engine. Jangan memasukkan ekspor 3DVista ke `public/`. Integrasi Next.js tidak otomatis mengubah bahasa tur terpisah.

## Deploy setelah domain dipilih

Gunakan hosting yang mendukung Next.js 16 dengan Node.js 24, working/root directory `01-gunung-kawi-web`, install `npm ci`, build `npm run build`, start `npm start`. Isi kedua environment variable di dashboard hosting sebelum build. `next build` menghasilkan halaman prarender dan root redirect. Tidak ada deployment eksternal dilakukan pada tahap implementasi lokal ini.
