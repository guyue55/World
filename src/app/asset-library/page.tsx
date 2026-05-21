import { AssetLibraryPanel } from '@/components/asset-library/AssetLibraryPanel'
import { ResponsivePageShell } from '@/components/layout/ResponsivePageShell'

export default function AssetLibraryPage() {
  return (
    <ResponsivePageShell>
      <section className="rounded-[3rem] border border-white/50 bg-white/75 p-8 shadow-soft md:p-12">
        <p className="text-sm tracking-[0.42em] text-moss">ROUND 03 · ASSETS</p>
        <h1 className="mt-4 text-4xl font-semibold md:text-6xl">视觉素材资产库</h1>
        <p className="mt-5 max-w-3xl leading-8 text-ink/70">
          第三轮开始把图片、SVG、示意图、占位素材纳入资产治理，避免真实素材与占位素材混用。
        </p>
      </section>
      <AssetLibraryPanel />
    </ResponsivePageShell>
  )
}
