import { spawnSync } from 'node:child_process'
const commands: Array<[string,string[]]> = [['npm',['run','check:round2:17']],['npm',['run','check:round2:18']],['npm',['run','check:round2:19']],['npm',['run','check:round2:20']]]
for(const [command,args] of commands){const r=spawnSync(command,args,{stdio:'inherit',shell:process.platform==='win32'}); if(r.status!==0) process.exit(r.status??1)}
console.log('Round 02 stage 05 checks passed.')
