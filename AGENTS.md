# Gunung Kawi VT — konteks AI

- Lingkup hanya `joki/Gunung Kawi VT/`; respons bahasa Indonesia dan ringkas.
- Aplikasi: `01-gunung-kawi-web/`, Next.js `16.4.3` App Router, React `19.3.1`, TypeScript. Manifest/lockfile aplikasi menjadi bukti versi.
- State utama: `../../doc/state/joki/Gunung Kawi VT.md`. Baca satu state ini; `03-dokumen/project-state.md` hanya pintu masuk, bukan state kedua.
- Pemilihan proyek tetap mengikuti instruksi pengguna; jangan melanjutkan pekerjaan lama hanya karena tercantum dalam state.

## Mulai dan cari

1. Baca state utama dan aturan ini. Dari subfolder aplikasi, Graphify tetap memakai graph di folder induk proyek.
2. Sebelum membaca source, jalankan dari folder proyek: `graphify query "<simbol atau topik>" --budget 800`. Bisa memakai `--seed <path>` untuk mempersempit hasil.
3. Jika tidak ada hasil, gunakan `rg -n` hanya pada folder terkait. Baca rentang baris yang diperlukan, bukan semua source/riwayat/laporan graph.
4. Baca panduan framework workspace dan dokumentasi Next.js lokal hanya yang relevan. Jangan menjalankan server, memasang dependency, atau membangun ulang graph saat mulai sesi.

## Batas dan verifikasi

- Konten: `01-gunung-kawi-web/src/content/`; route: `src/app/`; UI: `src/components/`. Gunakan hasil Graphify untuk memilih berkas berikutnya.
- `02-gunung-kawi-3dvista/` menyimpan aset tur terpisah; `03-dokumen/proposal/` menyimpan proposal pengguna. Baca hanya atas kebutuhan tugas.
- Jangan mengarang foto, panorama, data kunjungan, sejarah, atau hasil penelitian; aset asli dan tur masih menunggu pengguna.
- Dari folder induk: `pnpm dev`, `pnpm run install:web`. Dari aplikasi: `npm run lint`, `npm run typecheck`, `npm test`, `npm run build`, `npm run test:e2e`. Pilih pemeriksaan sesuai perubahan.
- Rahasia hanya melalui environment; jangan membaca/mencetak `.env*`, kunci, sesi, dependency, build, atau cache sebagai konteks.

## Akhiri perubahan

1. Selesaikan implementasi dan pengujian yang relevan.
2. Perbarui state utama: tanggal, perubahan, hasil uji, batasan, next step. Ubah indeks hanya jika status/next step berubah.
3. Dari folder proyek jalankan `npm run ai:finish` sekali: melakukan `graphify update .` lokal, lalu menyimpan sidik isi berkas untuk hook. Tidak memakai API/LLM dan tidak memperbarui graph workspace.
4. `npm run ai:check` memeriksa apakah ada perubahan yang belum ditutup. Tanya-jawab tanpa perubahan tidak memerlukan update.
5. Jawaban akhir cukup daftar perubahan dan hasil/cara uji. Jangan membaca penuh `graph.json` atau `GRAPH_REPORT.md` ke konteks.

Hook otomatis disediakan untuk Codex dan Claude Code. AI lain dapat memakai aturan dan perintah `ai:*` yang sama. Jika hook belum aktif, prosedur di atas tetap wajib.
