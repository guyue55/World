import fs from 'node:fs'
import { getPublicLifeNotes, lifeNotes } from '../src/features/real-content-v5'
const errors:string[]=[]
for(const item of ['src/components/real-content/LifeNoteStream.tsx','data/v5-real-content/stage-02/07-life-notes.json']) if(!fs.existsSync(item)) errors.push(`missing ${item}`)
if(lifeNotes.length < 2) errors.push('life notes too few')
if(getPublicLifeNotes().length < 1) errors.push('public life note missing')
if(!lifeNotes.some((note)=>note.privacy==='private-redacted')) errors.push('redacted life note missing')
if(errors.length) throw new Error(errors.join('\n'))
console.log('V5 content batch 07 checks passed.')
