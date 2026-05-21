import { AuditQueue } from '@/components/lighthouse/AuditQueue'
import { SuggestionFlow } from '@/components/lighthouse/SuggestionFlow'
import { ResponsivePageShell } from '@/components/layout/ResponsivePageShell'
import { FloatingLayer } from '@/components/visual/FloatingLayer'
import { WorldSectionHeader } from '@/components/visual/WorldSectionHeader'
export default function LighthousePage(){ return <ResponsivePageShell><section className="rounded-[3rem] border border-white/50 bg-gradient-to-br from-white/80 to-moss/10 p-8 shadow-soft md:p-12"><WorldSectionHeader eyebrow="AI LIGHTHOUSE" title="AI 灯塔工作台" description="AI 可以照亮、解释、建议、起草和提示风险，但不能自动发布、删除、改可见性，也不能读取私密原文。" /></section><FloatingLayer eyebrow="SUGGESTION FLOW" title="建议流" description="所有建议都带有风险等级、动作类型和边界说明。"><SuggestionFlow /></FloatingLayer><AuditQueue /></ResponsivePageShell> }
