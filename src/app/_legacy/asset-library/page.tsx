import { AssetLibraryPanel } from '@/components/_legacy/asset-library/AssetLibraryPanel'
import { AssetGapBoard } from '@/components/_legacy/asset-library/AssetGapBoard'
import { AssetBoundPreview } from '@/components/_legacy/asset-library/AssetBoundPreview'
import { ResponsivePageShell } from '@/components/_legacy/layout/ResponsivePageShell'
export default function AssetLibraryPage(){return <ResponsivePageShell><section className="rounded-[3rem] border border-white/50 bg-white/75 p-8 shadow-soft md:p-12"><p className="text-sm tracking-[0.42em] text-moss">ROUND 03 · ASSETS</p><h1 className="mt-4 text-4xl font-semibold md:text-6xl">视觉素材资产库</h1><p className="mt-5 max-w-3xl leading-8 text-ink/70">图片、SVG、视频、示意图、占位素材进入统一登记，真实素材、AI 生成素材、占位素材不再混用。</p></section><AssetLibraryPanel/><AssetGapBoard/><AssetBoundPreview/></ResponsivePageShell>}
