import { ResponsivePageShell } from '@/components/layout/ResponsivePageShell'
import { DesktopWorldMap } from '@/components/world-map/DesktopWorldMap'
import { MobileWorldCompass } from '@/components/world-map/MobileWorldCompass'
import { WorldMapLegend } from '@/components/world-map/WorldMapLegend'
import { WorldSectionHeader } from '@/components/visual/WorldSectionHeader'
export default function WorldMapPage() {
  return <ResponsivePageShell><section className="rounded-[3rem] border border-white/50 bg-white/70 p-8 shadow-soft md:p-12"><WorldSectionHeader eyebrow="COSMIC NAVIGATION" title="宇宙导航 / 世界地图" description="桌面端以星图呈现，移动端以世界罗盘降级，二者共用同一份世界节点数据。" /></section><WorldMapLegend /><DesktopWorldMap /><MobileWorldCompass /></ResponsivePageShell>
}
