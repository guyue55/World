import { spawnSync } from 'node:child_process'
const commands: Array<[string, string[]]> = [['npm',['run','check:round2:01']],['npm',['run','check:round2:02']],['npm',['run','check:round2:03']],['npm',['run','check:round2:04']]]
for (const [command,args] of commands) { const result = spawnSync(command,args,{stdio:'inherit',shell:process.platform==='win32'}); if (result.status !== 0) process.exit(result.status ?? 1) }
console.log('Round 02 stage 01 checks passed.')
