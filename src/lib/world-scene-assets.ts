import { z } from 'zod'
import registryData from '../../data/assets/world-scene-assets.json'

const sceneIdSchema = z.enum(['gateway', 'atlas', 'timeline', 'archive', 'paths', 'node', 'lighthouse'])
const imageAssetSchema = z.object({
  src: z.string().startsWith('/world/scenes/'),
  width: z.number().int().positive(),
  height: z.number().int().positive(),
  bytes: z.number().int().positive(),
})

const worldSceneAssetSchema = z.object({
  sceneId: sceneIdSchema,
  desktop: imageAssetSchema,
  mobile: imageAssetSchema,
  source: z.enum(['generated', 'owned', 'licensed']),
  licenseId: z.string().min(1),
  promptSummary: z.string().optional(),
})

const registrySchema = z.object({
  version: z.string(),
  generatedAt: z.string(),
  generator: z.string(),
  license: z.object({
    id: z.string(),
    status: z.literal('approved-for-project-use'),
    owner: z.string(),
  }),
  budgets: z.object({
    desktopMaxBytes: z.number().int().positive(),
    mobileMaxBytes: z.number().int().positive(),
  }),
  assets: z.array(worldSceneAssetSchema).length(7),
})

export type WorldSceneId = z.infer<typeof sceneIdSchema>
export type WorldSceneAsset = z.infer<typeof worldSceneAssetSchema>

const registry = registrySchema.parse(registryData)
const assetsByScene = new Map(registry.assets.map((asset) => [asset.sceneId, asset]))

export function getWorldSceneAsset(sceneId: WorldSceneId): WorldSceneAsset {
  const asset = assetsByScene.get(sceneId)
  if (!asset) throw new Error(`World scene asset is not registered: ${sceneId}`)
  return asset
}

export function getWorldSceneAssets() {
  return registry.assets
}

export function getWorldSceneAssetBudgets() {
  return registry.budgets
}
