#!/usr/bin/env node

import { spawnSync } from 'node:child_process';
import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const commands = [
  ['npm', ['run', 'check:json']],
  ['npm', ['run', 'check:repo']],
  ['npm', ['run', 'check:v6-private-ai:all']],
  ['npm', ['run', 'lint']],
  ['npm', ['run', 'typecheck']],
  ['npm', ['run', 'build']],
  ['npm', ['run', 'audit:report']],
];

const startedAt = new Date().toISOString();
const results = [];

for (const [command, args] of commands) {
  const label = `${command} ${args.join(' ')}`;
  console.log(`\n[v6-clean-seal] running: ${label}`);
  const result = spawnSync(command, args, {
    stdio: 'inherit',
    shell: process.platform === 'win32',
    env: {
      ...process.env,
      NEXT_TELEMETRY_DISABLED: '1',
    },
  });

  results.push({
    command: label,
    status: result.status === 0 ? 'passed' : 'failed',
    exitCode: result.status,
    signal: result.signal ?? null,
  });

  if (result.status !== 0) {
    console.error(`\n[v6-clean-seal] failed: ${label}`);
    break;
  }
}

const finishedAt = new Date().toISOString();
const passed = results.length === commands.length && results.every((item) => item.status === 'passed');
const report = {
  id: 'v6-clean-seal-run',
  round: 'round-06',
  version: 'V6 私密档案与 AI 世界助手深化',
  productionLive: false,
  startedAt,
  finishedAt,
  status: passed ? 'passed' : 'failed',
  results,
};

mkdirSync('reports', { recursive: true });
writeFileSync(join('reports', 'v6-clean-seal-run.json'), `${JSON.stringify(report, null, 2)}\n`, 'utf8');

console.log('\n[v6-clean-seal] report written: reports/v6-clean-seal-run.json');
process.exit(passed ? 0 : 1);
