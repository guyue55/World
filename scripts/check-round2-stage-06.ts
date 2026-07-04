import { spawnSync } from 'node:child_process'
const commands: Array<[string,string[]]> = [['npm',['run','check:round2:21']],['npm',['run','check:round2:22']],['npm',['run','check:round2:23']],['npm',['run','check:round2:24']]]
for(const [command,args] of commands){const r=spawnSync(command,args,{stdio:'inherit',shell:process.platform==='win32'}); if(r.status!==0) process.exit(r.status??1)}
console.log('Round 02 stage 06 checks passed.')
