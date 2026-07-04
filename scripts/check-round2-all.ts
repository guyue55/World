import { spawnSync } from 'node:child_process'
const commands: Array<[string,string[]]> = [
 ['npm',['run','check:round2:00']],
 ['npm',['run','check:round2:stage-01']],
 ['npm',['run','check:round2:stage-02']],
 ['npm',['run','check:round2:stage-03']],
 ['npm',['run','check:round2:stage-04']],
 ['npm',['run','check:round2:stage-05']],
 ['npm',['run','check:round2:stage-06']],
]
for(const [command,args] of commands){const r=spawnSync(command,args,{stdio:'inherit',shell:process.platform==='win32'}); if(r.status!==0) process.exit(r.status??1)}
console.log('Round 02 checks passed.')
