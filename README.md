# Gunung Kawi Virtual Tour

Proyek edukasi dan penelitian Reneldis Mumas, 2026. Website informasi Next.js terpisah dari tur hasil ekspor 3DVista. Bukan klaim situs resmi pengelola.

## Struktur

- `01-gunung-kawi-web/`: satu-satunya aplikasi Next.js.
- `02-gunung-kawi-3dvista/`: penyimpanan lokal panorama, audio, proyek, ekspor, dan cadangan; media besar diabaikan Git.
- `03-dokumen/`: proposal, sumber konten, panduan integrasi, inventaris, dan dokumen pengujian.

## Jalankan

Dari folder induk `Gunung Kawi VT`, jalankan:

```powershell
pnpm dev
```

`pnpm run dev` juga dapat digunakan. `package.json` di folder induk hanya launcher menuju aplikasi di `01-gunung-kawi-web/`. Konfigurasi pnpm membatasi workspace pada launcher dan menonaktifkan instalasi otomatis saat menjalankan script; instalasi dependency tetap dikelola melalui lockfile npm aplikasi.

Pada komputer baru, instal dependency sekali sebelum menjalankan server:

```powershell
pnpm run install:web
pnpm dev
```

Untuk port lain, gunakan `pnpm dev --port 3001`. Hentikan server dengan `Ctrl+C` di terminal tempat Anda menjalankannya.

Alternatif dari folder aplikasi:

```powershell
cd 01-gunung-kawi-web
npm ci
Copy-Item .env.example .env.local
npm run dev
```

Buka `http://localhost:3000`; root mengalihkan ke `/id`. `.env.local` bersifat opsional untuk mencoba website dengan status tur belum tersedia; salin `.env.example` hanya pada setup pertama jika ingin mengisi konfigurasi.

## Masukkan berkas Anda

1. Simpan proposal asli ke `03-dokumen/proposal/`.
2. Simpan foto website ke `01-gunung-kawi-web/public/images/` sesuai [panduan aset](03-dokumen/panduan-aset.md).
3. Simpan foto panorama asli ke `02-gunung-kawi-3dvista/raw-panorama/`, bukan ke aplikasi web.
4. Setelah tur diterbitkan, isi `NEXT_PUBLIC_VIRTUAL_TOUR_URL` di `.env.local`, lalu build ulang.

Foto dan proposal belum tersedia. Seluruh sembilan scene masih `planned`; tur 3DVista belum dibuat. Lihat [status proyek](03-dokumen/project-state.md) sebelum melanjutkan pengembangan.

## Sesi AI hemat konteks

Aturan bersama ada di [AGENTS.md](AGENTS.md); Claude Code membacanya melalui [CLAUDE.md](CLAUDE.md). [State utama](../../doc/state/joki/Gunung%20Kawi%20VT.md) menyimpan progres; jangan memuat ulang semua dokumen/source.

Dari folder proyek:

```powershell
graphify query "virtual tour" --budget 800
npm run ai:check
npm run ai:test
```

Setelah implementasi dan pengujian, perbarui state utama lalu jalankan `npm run ai:finish` sekali. Perintah ini menjalankan `graphify update .` secara lokal tanpa API/LLM dan menyimpan checkpoint isi berkas. Hook Stop meminta penyelesaian jika ada perubahan/penghapusan; tanya-jawab tanpa perubahan tetap diam. Hook tidak menulis ringkasan pekerjaan secara otomatis.

Graph berada di `graphify-out/graph.json`; tampilan interaktif `graphify-out/graph.html`. Graph pembaruan otomatis mencakup struktur kode; dokumen dibaca terarah sesuai tugas dan belum mendapat ekstraksi semantik penuh. `.graphifyignore` membatasi dependency, build/cache, rahasia, proposal, dan media besar.

Hook proyek: `.codex/hooks.json` dan `.claude/settings.json`, memakai handler `.hooks/ai-context.mjs`. Buka sesi AI dari folder proyek atau aplikasi. Pada Codex, tinjau dan percayai hook baru melalui `/hooks` sesuai [dokumentasi resmi](https://learn.chatgpt.com/docs/hooks#review-and-trust-hooks); konfigurasi sudah ditulis, aktivasi/trust di UI belum diuji dalam sesi baru. Hook global workspace yang sudah ada dipertahankan. Jika folder dipindah, sesuaikan path absolut handler dalam kedua konfigurasi. AI lain dapat menjalankan perintah `ai:*` secara manual.
