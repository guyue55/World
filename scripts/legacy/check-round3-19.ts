import { spawnSync } from 'node:child_process'
const r=spawnSync('npm',['run','check:round3:audit'],{stdio:'inherit',shell:process.platform==='win32'})
if(r.status!==0) process.exit(r.status??1)
console.log('Round 03 batch 19 checks passed.')
