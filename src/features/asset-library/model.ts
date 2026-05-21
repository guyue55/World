export type AssetKind = 'image' | 'svg' | 'diagram' | 'placeholder'
export type AssetUsage = 'hero' | 'world-map' | 'content' | 'theme'

export type VisualAsset = {
  id: string
  title: string
  kind: AssetKind
  usage: AssetUsage
  source: 'generated' | 'curated' | 'placeholder'
  licenseNote: string
  pathHint: string
}
