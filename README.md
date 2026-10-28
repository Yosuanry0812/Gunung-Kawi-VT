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

## Deployment Vercel

Repository: `Yosuanry0812/Gunung-Kawi-VT`, branch produksi `main`.
Project Vercel: `gunung-kawi-vt` pada team `yosuanry-simbolons-projects`.

- Framework: Next.js; Node.js `24.x`.
- Root Directory: `01-gunung-kawi-web`.
- Install Command: `npm ci`; Build Command: `npm run build`.
- `NEXT_PUBLIC_SITE_URL`: origin publik deployment, dipakai canonical, sitemap, dan robots.
- `NEXT_PUBLIC_VIRTUAL_TOUR_URL`: kosong sampai ekspor 3DVista Gunung Kawi asli tersedia.
- Push berikutnya ke `main` diterbitkan melalui integrasi GitHub Vercel.

Peta memakai Place ID Google Maps Gunung Kawi Tampaksiring yang diverifikasi pada `2026-10-28`, dimuat saat mendekati layar. Galeri mendukung tombol sebelumnya/berikutnya, perbesar foto, tombol panah keyboard, serta Escape. Foto sementara dari Wikimedia Commons memiliki kredit pada galeri dan halaman Informasi; tidak diklaim sebagai panorama 360°.

## Masukkan berkas Anda

1. Simpan proposal asli ke `03-dokumen/proposal/`.
2. Simpan foto website ke `01-gunung-kawi-web/public/images/` sesuai [panduan aset](03-dokumen/panduan-aset.md).
3. Simpan foto panorama asli ke `02-gunung-kawi-3dvista/raw-panorama/`, bukan ke aplikasi web.
4. Setelah tur diterbitkan, isi `NEXT_PUBLIC_VIRTUAL_TOUR_URL` di `.env.local`, lalu build ulang.

Proposal dan foto dokumentasi proyek belum tersedia. Website memakai empat foto asli Gunung Kawi berlisensi terbuka sementara, sesuai pilihan pengguna; kredit tersedia di halaman Informasi. Seluruh sembilan scene masih `planned`; tur 3DVista belum dibuat. Lihat [status proyek](03-dokumen/project-state.md) sebelum melanjutkan pengembangan.

## Sesi AI hemat konteks

Aturan bersama ada di [AGENTS.md](AGENTS.md); Claude Code membacanya melalui [CLAUDE.md](CLAUDE.md). [State utama](../../doc/state/joki/Gunung%20Kawi%20VT.md) menyimpan progres; jangan memuat ulang semua dokumen/source.

Dari folder proyek:

```powershell
graphify query "virtual tour" --budget 800
npm run ai:check
npm run ai:test
```

Setelah implementasi dan pengujian, AI memperbarui state utama. Hook Stop lalu menjalankan `graphify update .` lokal tanpa API/LLM dan menyimpan checkpoint otomatis. Bila AI lupa memperbarui state, hook meminta AI melengkapinya sekali. Tanya-jawab tanpa perubahan tetap diam. Ringkasan faktual ditulis oleh AI yang mengerjakan tugas; pengguna tidak perlu menjalankan perintah penutupan. `npm run ai:finish` tersedia sebagai fallback manual.

Graph berada di `graphify-out/graph.json`; tampilan interaktif `graphify-out/graph.html`. Graph pembaruan otomatis mencakup struktur kode; dokumen dibaca terarah sesuai tugas dan belum mendapat ekstraksi semantik penuh. `.graphifyignore` membatasi dependency, build/cache, rahasia, proposal, dan media besar.

Codex dan Codex di Agentty memakai hook pengguna yang sama: SessionStart/UserPromptSubmit menuju `.hooks/ai-context.mjs`; Stop workspace mendelegasikan sesi proyek ini ke handler tersebut. Dari root `Sistem/`, pilih `proyek "joki/Gunung Kawi VT"`; binding disimpan per ID sesi di `.ai-cache/sessions/`, sehingga pane lain tetap terpisah. Pilihan proyek lain menonaktifkan binding lama. Startup/resume/compact memasukkan petunjuk singkat untuk sesi yang sesuai. `.codex/hooks.json` lokal sengaja kosong agar hook tidak berjalan dua kali.

Agentty `autoWorktree` juga didukung: handler mencocokkan cwd dengan `git worktree list` repository ini, lalu menjalankan pemeriksaan/pembaruan dengan cwd worktree tersebut. Graph dan checkpoint tidak ditulis ke checkout lain. State utama tetap memakai path absolut di workspace asal yang diberikan dalam konteks hook; tidak mengikuti `../../doc` dari lokasi worktree.

`npm run ai:setup` memasang definisi hook secara idempotent, menyimpan cadangan konfigurasi hook sebelumnya, dan memakai `hooks/list` serta `config/batchWrite` Codex untuk mencatat trust hanya pada tiga definisi yang dikelola setup ini. Tidak memakai flag bypass atau mengubah approval/sandbox. `npm run ai:hooks` memeriksa bahwa hook enabled/trusted dari root workspace, folder proyek, dan aplikasi. Hook RTK serta notifikasi Agentty dipertahankan. Sesi baru memuat konfigurasi baru; dispatcher Stop workspace juga mendukung sesi yang sudah berjalan. Acuan: [hook Codex](https://learn.chatgpt.com/docs/hooks).

Claude Code tetap memakai `.claude/settings.json` dengan handler yang sama dari folder proyek/aplikasi. Jika folder dipindah, jalankan setup kembali dan sesuaikan path handler Claude. AI lain dapat menjalankan perintah `ai:*` secara manual.
