import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath, pathToFileURL } from 'node:url';

export const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const statePath = path.resolve(projectRoot, '../../doc/state/joki/Gunung Kawi VT.md');
const graphPath = path.join(projectRoot, 'graphify-out/graph.json');
const checkpointPath = path.join(projectRoot, '.ai-cache/checkpoint.json');
const skipDirectories = new Set([
  '.git', 'node_modules', '.next', 'out', 'dist', 'build', 'coverage',
  '.cache', '.ai-cache', '.venv', 'venv', '__pycache__', '.sessions',
  'graphify-out', 'test-results', 'playwright-report', '02-gunung-kawi-3dvista',
]);
const skipPaths = ['03-dokumen/proposal', '03-dokumen/preview', '03-dokumen/reference-audit'];
const extensions = new Set(['.ts', '.tsx', '.js', '.jsx', '.mjs', '.cjs', '.json', '.md', '.css', '.yaml', '.yml', '.toml', '.ps1']);

function digest(file) {
  return fs.existsSync(file) ? crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex') : null;
}

export function fingerprint(root = projectRoot) {
  const files = {};
  function visit(directory) {
    for (const entry of fs.readdirSync(directory, { withFileTypes: true }).sort((a, b) => a.name.localeCompare(b.name))) {
      const absolute = path.join(directory, entry.name);
      const relative = path.relative(root, absolute).split(path.sep).join('/');
      if (entry.isSymbolicLink() || skipPaths.includes(relative)) continue;
      if (entry.isDirectory()) {
        if (!skipDirectories.has(entry.name)) visit(absolute);
      } else if (entry.isFile()
        && !/^\.env|secret|credential|token|session/i.test(entry.name)
        && !entry.name.endsWith('.tsbuildinfo')
        && entry.name !== 'next-env.d.ts'
        && (extensions.has(path.extname(entry.name)) || ['.gitignore', '.graphifyignore'].includes(entry.name))) {
        files[relative] = digest(absolute);
      }
    }
  }
  visit(root);
  return files;
}

export function changedFiles(before, after) {
  return [...new Set([...Object.keys(before), ...Object.keys(after)])]
    .filter(file => before[file] !== after[file]).sort();
}

function checkpoint() {
  try { return JSON.parse(fs.readFileSync(checkpointPath, 'utf8')); } catch { return null; }
}

export function pending() {
  const previous = checkpoint();
  if (!previous) return 'Checkpoint AI belum tersedia. Perbarui state lalu jalankan npm run ai:finish dari folder proyek.';
  const changed = changedFiles(previous.files, fingerprint());
  if (!changed.length && previous.state === digest(statePath) && fs.existsSync(graphPath)) return null;
  const summary = changed.slice(0, 5).join(', ');
  return `Konteks Gunung Kawi VT belum ditutup${summary ? ` (${summary}${changed.length > 5 ? ', ...' : ''})` : ''}. Selesaikan uji, perbarui ../../doc/state/joki/Gunung Kawi VT.md, lalu jalankan npm run ai:finish dari folder proyek. Jangan memperbarui proyek lain.`;
}

function finish() {
  const previous = checkpoint();
  const files = fingerprint();
  const state = digest(statePath);
  if (!state) throw new Error('State utama tidak ditemukan.');
  if (previous && changedFiles(previous.files, files).length && previous.state === state) {
    throw new Error('Isi proyek berubah tetapi state utama belum diperbarui. Perbarui state dengan perubahan dan hasil uji terlebih dahulu.');
  }
  const result = spawnSync('graphify', ['update', '.'], { cwd: projectRoot, encoding: 'utf8', windowsHide: true, timeout: 120_000 });
  if (result.stdout) process.stdout.write(result.stdout);
  if (result.stderr) process.stderr.write(result.stderr);
  if (result.error || result.status !== 0) throw new Error('graphify update gagal; checkpoint tidak diperbarui.');
  if (!fs.existsSync(graphPath)) throw new Error('Graph lokal tidak ditemukan; checkpoint tidak diperbarui.');
  if (changedFiles(files, fingerprint()).length || state !== digest(statePath)) {
    throw new Error('Berkas berubah selama update; periksa perubahan lalu ulangi ai:finish.');
  }
  fs.mkdirSync(path.dirname(checkpointPath), { recursive: true });
  fs.writeFileSync(checkpointPath, JSON.stringify({ files, state }, null, 2) + '\n');
  console.log('State dan graph lokal siap; checkpoint AI disimpan.');
}

export function hookResult(event, cwd = projectRoot) {
  const relative = path.relative(projectRoot, path.resolve(cwd));
  if (relative === '..' || relative.startsWith(`..${path.sep}`) || path.isAbsolute(relative)) return null;
  if (event.hook_event_name === 'SessionStart') {
    return { hookSpecificOutput: { hookEventName: 'SessionStart', additionalContext:
      `Root proyek: ${projectRoot}. Next.js. Relatif root ini, baca AGENTS.md dan satu state: ../../doc/state/joki/Gunung Kawi VT.md. Gunakan graphify query "<topik>" --budget 800 dari root proyek sebelum source. Akhiri perubahan dengan memperbarui state dan npm run ai:finish. Jangan memindai workspace, dependency, build, atau media besar.` } };
  }
  if (event.hook_event_name === 'Stop' && !event.stop_hook_active) {
    const reason = pending();
    if (reason) return { decision: 'block', reason };
  }
  return null;
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  try {
    const command = process.argv[2];
    if (command === 'finish') finish();
    else if (command === 'check') {
      const reason = pending();
      console.log(reason || 'State dan graph lokal siap.');
      if (reason) process.exitCode = 1;
    } else {
      const input = JSON.parse(fs.readFileSync(0, 'utf8').replace(/^\uFEFF/, '') || '{}');
      const result = hookResult(input, input.cwd || process.cwd());
      if (result) process.stdout.write(JSON.stringify(result));
    }
  } catch (error) {
    // Kegagalan pemeriksaan jangan memicu siklus Stop tanpa akhir.
    console.error(`AI context: ${error.message}`);
    process.exitCode = 1;
  }
}
