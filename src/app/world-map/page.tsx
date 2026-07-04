import { DynamicScenePrelude } from '@/components/r8-full-dynamic-world'
import { ResponsivePageShell } from '@/components/layout/ResponsivePageShell'
import { DesktopWorldMap } from '@/components/world-map/DesktopWorldMap'
import { MobileWorldCompass } from '@/components/world-map/MobileWorldCompass'
import { WorldMapLegend } from '@/components/world-map/WorldMapLegend'
import { WorldSectionHeader } from '@/components/visual/WorldSectionHeader'
import { LivingUniverseSection } from '@/components/r8-living-universe'
import { SensoryUniverseSection } from '@/components/r8-sensory-universe'
import { InteractiveUniverseSection } from '@/components/r8-interactive-universe'
export default function WorldMapPage() {
  return <ResponsivePageShell><DynamicScenePrelude label="LEGACY MAP AWAKENED" title="旧地图被重绘为可进入的星图。" description="这个兼容入口不再只是静态导航，它会把旅人送往新的 Atlas，并保留移动端罗盘降级。" primaryHref="/atlas" primaryLabel="进入新 Atlas" secondaryHref="/timeline" secondaryLabel="沿时间河" objects={['旧图', '坐标', '星线', '雾区']} /><section className="rounded-[3rem] border border-white/50 bg-white/70 p-8 shadow-soft md:p-12"><WorldSectionHeader eyebrow="COSMIC NAVIGATION" title="宇宙导航 / 世界地图" description="桌面端以星图呈现，移动端以世界罗盘降级，二者共用同一份世界节点数据。" /></section><WorldMapLegend /><DesktopWorldMap /><MobileWorldCompass /></ResponsivePageShell>
}
