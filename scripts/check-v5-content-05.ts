import fs from 'node:fs'
import { getPhotoStoriesNeedingRealAssets, photoStories } from '../src/features/real-content-v5'
const errors:string[]=[]
for(const item of ['src/features/real-content-v5/media.ts','src/components/real-content/PhotoStoryGallery.tsx','data/v5-real-content/stage-02/05-photo-stories.json']) if(!fs.existsSync(item)) errors.push(`missing ${item}`)
if(photoStories.length < 2) errors.push('photo stories too few')
if(getPhotoStoriesNeedingRealAssets().length < 1) errors.push('must track photo stories needing real assets')
if(errors.length) throw new Error(errors.join('\n'))
console.log('V5 content batch 05 checks passed.')
