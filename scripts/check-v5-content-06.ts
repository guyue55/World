import fs from 'node:fs'
import { projectLogs } from '../src/features/real-content-v5'
const errors:string[]=[]
for(const item of ['src/components/real-content/ProjectLogWorld.tsx','data/v5-real-content/stage-02/06-project-logs.json']) if(!fs.existsSync(item)) errors.push(`missing ${item}`)
if(projectLogs.length < 2) errors.push('project logs too few')
for(const log of projectLogs) if(!log.problem || !log.decision || !log.outcome) errors.push(`project log incomplete: ${log.id}`)
if(errors.length) throw new Error(errors.join('\n'))
console.log('V5 content batch 06 checks passed.')
