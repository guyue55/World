import { ResponsivePageShell } from '@/components/_legacy/layout/ResponsivePageShell'
import { ThemePreviewPanel } from '@/components/_legacy/theme/ThemePreviewPanel'
import { ThemeSwitcher } from '@/components/_legacy/theme/ThemeSwitcher'
import { FloatingLayer } from '@/components/visual/FloatingLayer'
import { WorldSectionHeader } from '@/components/visual/WorldSectionHeader'
export default function ThemeSystemPage(){ return <ResponsivePageShell><section className="rounded-[3rem] border border-white/50 bg-gradient-to-br from-white/80 to-sand/70 p-8 shadow-soft md:p-12"><WorldSectionHeader eyebrow="THEME SYSTEM" title="主题系统真实切换" description="主题不再只是颜色，而是 token、布局、组件和动效语义的组合。" /></section><ThemeSwitcher /><FloatingLayer eyebrow="THEME MODES" title="四种主题模式" description="自然、宇宙、图书馆、工坊分别代表不同的世界视角。"><ThemePreviewPanel /></FloatingLayer></ResponsivePageShell> }
