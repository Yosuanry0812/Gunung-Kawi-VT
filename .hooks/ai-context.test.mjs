import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import test from 'node:test';
import { changedFiles, fingerprint, hookResult, projectRoot } from './ai-context.mjs';

function fixture(t) {
  const tempRoot = fs.realpathSync(os.tmpdir());
  const directory = fs.mkdtempSync(path.join(tempRoot, 'gunung-kawi-ai-'));
  t.after(() => {
    assert.equal(path.dirname(fs.realpathSync(directory)), tempRoot);
    assert.ok(path.basename(directory).startsWith('gunung-kawi-ai-'));
    fs.rmSync(directory, { recursive: true });
  });
  return directory;
}

test('perubahan isi dan penghapusan terdeteksi; menulis isi sama tidak memicu update', t => {
  const root = fixture(t);
  const file = path.join(root, 'page.tsx');
  fs.writeFileSync(file, 'export const value = 1;');
  const initial = fingerprint(root);
  fs.writeFileSync(file, 'export const value = 1;');
  assert.deepEqual(changedFiles(initial, fingerprint(root)), []);
  fs.writeFileSync(file, 'export const value = 2;');
  assert.deepEqual(changedFiles(initial, fingerprint(root)), ['page.tsx']);
  fs.unlinkSync(file);
  assert.deepEqual(changedFiles(initial, fingerprint(root)), ['page.tsx']);
});

test('dependency, build, cache, rahasia, proposal, dan panorama dilewati', t => {
  const root = fixture(t);
  const excluded = ['node_modules/x.ts', '.next/build.js', '.ai-cache/checkpoint.json',
    '.env.local', 'credentials.json', 'session.json', 'key.pem',
    '03-dokumen/proposal/asli.md', '02-gunung-kawi-3dvista/project/data.json'];
  for (const file of excluded) {
    const absolute = path.join(root, file);
    fs.mkdirSync(path.dirname(absolute), { recursive: true });
    fs.writeFileSync(absolute, 'fixture');
  }
  fs.writeFileSync(path.join(root, 'AGENTS.md'), '# test');
  assert.deepEqual(Object.keys(fingerprint(root)), ['AGENTS.md']);
});

test('hook diam di luar proyek dan pada Stop lanjutan', () => {
  assert.equal(hookResult({ hook_event_name: 'SessionStart' }, path.dirname(projectRoot)), null);
  assert.equal(hookResult({ hook_event_name: 'Stop' }, `${projectRoot}-lain`), null);
  assert.equal(hookResult({ hook_event_name: 'Stop', stop_hook_active: true }), null);
});

test('startup dari subfolder memberi petunjuk ringkas tanpa membaca seluruh state', () => {
  const result = hookResult({ hook_event_name: 'SessionStart' }, path.join(projectRoot, '01-gunung-kawi-web'));
  const output = result.hookSpecificOutput;
  assert.equal(output.hookEventName, 'SessionStart');
  assert.match(output.additionalContext, /--budget 800/);
  assert.ok(output.additionalContext.length < 600);
});
