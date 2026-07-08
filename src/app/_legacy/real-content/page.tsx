import { LifeNoteStream } from '@/components/real-content/LifeNoteStream'
import { PhotoStoryGallery } from '@/components/real-content/PhotoStoryGallery'
import { ProjectLogWorld } from '@/components/real-content/ProjectLogWorld'
import { RealExhibitionRoom } from '@/components/real-content/RealExhibitionRoom'
import { RealReadingPathway } from '@/components/real-content/RealReadingPathway'
import { RealTimelineRiver } from '@/components/real-content/RealTimelineRiver'
import { RealContentReadinessPanel } from '@/components/real-content/RealContentReadinessPanel'
import { RealContentSafetyPanel } from '@/components/real-content/RealContentSafetyPanel'
import { V6HandoffPanel } from '@/components/real-content/V6HandoffPanel'
import { RealContentCollectionBoard } from '@/components/real-content/RealContentCollectionBoard'
import { RealContentGateway } from '@/components/real-content/RealContentGateway'
import { ResponsivePageShell } from '@/components/_legacy/layout/ResponsivePageShell'

export default function RealContentPage() {
  return (
    <ResponsivePageShell>
      <section className="rounded-[3rem] border border-white/50 bg-white/75 p-8 shadow-soft md:p-12">
        <p className="text-sm tracking-[0.42em] text-moss">V5 · REAL CONTENT</p>
        <h1 className="mt-4 text-4xl font-semibold md:text-6xl">真实内容版</h1>
        <p className="mt-5 max-w-3xl leading-8 text-ink/70">
          这里把真实文章、项目记录、生活内容和脱敏记忆接入 V4 的世界壳层。
        </p>
      </section>
      <RealContentGateway />
      <RealContentCollectionBoard />
      <PhotoStoryGallery />
      <ProjectLogWorld />
      <LifeNoteStream />
      <RealTimelineRiver />
      <RealExhibitionRoom />
      <RealReadingPathway />
      <RealContentReadinessPanel />
      <RealContentSafetyPanel />
      <V6HandoffPanel />
    </ResponsivePageShell>
  )
}
