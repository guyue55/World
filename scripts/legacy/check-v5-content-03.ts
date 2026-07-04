import fs from 'node:fs'
import { getCollectionItems, realContentCollections } from '../src/features/real-content-v5'
const errors:string[]=[]
if(realContentCollections.length < 3) errors.push('collections too few')
for(const collection of realContentCollections) {
  if(getCollectionItems(collection).length !== collection.itemIds.length) errors.push(`collection has broken item ids: ${collection.id}`)
}
if(!fs.existsSync('src/components/real-content/RealContentCollectionBoard.tsx')) errors.push('collection board missing')
if(errors.length) throw new Error(errors.join('\n'))
console.log('V5 content batch 03 checks passed.')
