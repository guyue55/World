import { ResponsivePageShell } from '@/components/layout/ResponsivePageShell'
import { TimeRiverFilter } from '@/components/time-river/TimeRiverFilter'
import { TimeRiverFlow } from '@/components/time-river/TimeRiverFlow'
import { WorldSectionHeader } from '@/components/visual/WorldSectionHeader'
export default function TimeRiverPage(){ return <ResponsivePageShell><section className="rounded-[3rem] border border-white/50 bg-white/70 p-8 shadow-soft md:p-12"><WorldSectionHeader eyebrow="TIME RIVER" title="时间河" description="版本、事件、阶段和体验不再是孤立编号，而是一条从 V1 到第二轮的长期时间流。" /></section><TimeRiverFilter /><TimeRiverFlow /></ResponsivePageShell> }
