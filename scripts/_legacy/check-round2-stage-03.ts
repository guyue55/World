import { spawnSync } from 'node:child_process'
const commands: Array<[string,string[]]> = [['npm',['run','check:round2:09']],['npm',['run','check:round2:10']],['npm',['run','check:round2:11']],['npm',['run','check:round2:12']]]
for(const [command,args] of commands){const r=spawnSync(command,args,{stdio:'inherit',shell:process.platform==='win32'}); if(r.status!==0) process.exit(r.status??1)}
console.log('Round 02 stage 03 checks passed.')
