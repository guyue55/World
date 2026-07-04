import { DynamicScenePrelude } from '@/components/r8-full-dynamic-world'
import { ResponsivePageShell } from '@/components/layout/ResponsivePageShell'
import { TimeRiverFilter } from '@/components/time-river/TimeRiverFilter'
import { TimeRiverFlow } from '@/components/time-river/TimeRiverFlow'
import { WorldSectionHeader } from '@/components/visual/WorldSectionHeader'
import { LivingUniverseSection } from '@/components/r8-living-universe'
import { SensoryUniverseSection } from '@/components/r8-sensory-universe'
import { InteractiveUniverseSection } from '@/components/r8-interactive-universe'
export default function TimeRiverPage(){ return <ResponsivePageShell><DynamicScenePrelude label="TIME BRANCH AWAKENED" title="时间支流进入动态流动状态。" description="旧时间河入口会引导到新的 Timeline，同时保留筛选、涟漪和世界事件的静态可读 fallback。" primaryHref="/timeline" primaryLabel="进入新 Timeline" secondaryHref="/archive" secondaryLabel="打开档案馆" objects={['涟漪', '旧星', '回声', '年轮']} /><section className="rounded-[3rem] border border-white/50 bg-white/70 p-8 shadow-soft md:p-12"><WorldSectionHeader eyebrow="TIME RIVER" title="时间河" description="版本、事件、阶段和体验不再是孤立编号，而是一条从 V1 到第二轮的长期时间流。" /></section><TimeRiverFilter /><TimeRiverFlow /></ResponsivePageShell> }
