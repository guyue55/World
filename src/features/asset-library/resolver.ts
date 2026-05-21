import { contentSeeds } from '@/features/content-ingestion'
import { visualAssets } from './data'
import type { VisualAsset } from './model'
export type ContentAssetBinding = { seedId:string; assetIds:string[]; required:boolean }
export const contentAssetBindings: ContentAssetBinding[] = contentSeeds.map(seed=>({seedId:seed.id,assetIds:seed.assetIds,required:seed.channel==='home'||seed.type==='exhibition'}))
export const resolveAssetById=(assetId:string):VisualAsset|undefined=>visualAssets.find(a=>a.id===assetId)
export const resolveAssetsForSeed=(seedId:string):VisualAsset[]=>{const b=contentAssetBindings.find(i=>i.seedId===seedId); if(!b) return []; return b.assetIds.map(resolveAssetById).filter((a):a is VisualAsset=>Boolean(a))}
export const getBrokenAssetBindings=()=>contentAssetBindings.filter(b=>b.assetIds.some(id=>!resolveAssetById(id)))
export const getUnregisteredAssetIdsFromSeeds=()=>contentAssetBindings.flatMap(b=>b.assetIds.filter(id=>!resolveAssetById(id)))
