import { ResponsivePageShell } from '@/components/_legacy/layout/ResponsivePageShell'
import { MemoryGraphExplorer } from '@/components/_legacy/memory-graph/MemoryGraphExplorer'
import { WorldSectionHeader } from '@/components/visual/WorldSectionHeader'
export default function MemoryGraphPage(){ return <ResponsivePageShell><section className="rounded-[3rem] border border-white/50 bg-white/70 p-8 shadow-soft md:p-12"><WorldSectionHeader eyebrow="MEMORY GRAPH" title="长期记忆图谱" description="记忆图谱显示公开记忆与脱敏信号。私密与家庭内容只显示边界状态，不暴露原文。" /></section><MemoryGraphExplorer /></ResponsivePageShell> }
