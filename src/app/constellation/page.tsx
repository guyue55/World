import { ContentStarMap } from '@/components/constellation/ContentStarMap'
import { ReadingPathView } from '@/components/constellation/ReadingPathView'
import { TopicIslandGrid } from '@/components/constellation/TopicIslandGrid'
import { ResponsivePageShell } from '@/components/layout/ResponsivePageShell'
import { FloatingLayer } from '@/components/visual/FloatingLayer'
import { WorldSectionHeader } from '@/components/visual/WorldSectionHeader'
export default function ConstellationPage(){ return <ResponsivePageShell><section className="rounded-[3rem] border border-white/50 bg-white/70 p-8 shadow-soft md:p-12"><WorldSectionHeader eyebrow="CONTENT CONSTELLATION" title="内容节点星图" description="文章、路径、主题岛屿与归档不再是列表，而是一组可探索、可连接、可脱敏的内容星系。" /></section><ContentStarMap /><FloatingLayer eyebrow="TOPIC ISLANDS" title="主题岛屿" description="同一份内容节点数据可以被组织成主题岛屿。"><TopicIslandGrid /></FloatingLayer><FloatingLayer eyebrow="READING PATHS" title="阅读路径" description="路径把节点串成可以理解的旅程。"><ReadingPathView /></FloatingLayer></ResponsivePageShell> }
