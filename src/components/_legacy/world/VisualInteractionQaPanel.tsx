import {
  getInteractionQaChecklist,
  getLayoutResponsiveContract,
  getVisualInteractionDefectRegister,
  getVisualQaChecklist,
} from '@/lib/_legacy/visual-interaction-qa'

export function VisualInteractionQaPanel() {
  const visual = getVisualQaChecklist()
  const interaction = getInteractionQaChecklist()
  const layout = getLayoutResponsiveContract()
  const defects = getVisualInteractionDefectRegister()

  return (
    <section className="rounded-world border border-ink/10 bg-white/45 p-6 shadow-soft">
      <p className="text-sm tracking-[0.35em] text-moss">VISUAL QA</p>
      <h2 className="mt-3 text-3xl font-semibold">多端视觉与交互 QA</h2>
      <p className="mt-3 leading-8 text-ink/70">
        视觉 QA 不是看起来漂亮，而是每个页面在真实设备上都能稳定使用。
      </p>

      <div className="mt-6 grid gap-4 md:grid-cols-5">
        <div className="rounded-2xl bg-paper/70 p-5">
          <p className="text-sm text-ink/50">视口</p>
          <p className="mt-2 text-3xl font-semibold">{visual.viewports.length}</p>
        </div>
        <div className="rounded-2xl bg-paper/70 p-5">
          <p className="text-sm text-ink/50">路由</p>
          <p className="mt-2 text-3xl font-semibold">{visual.routes.length}</p>
        </div>
        <div className="rounded-2xl bg-paper/70 p-5">
          <p className="text-sm text-ink/50">交互</p>
          <p className="mt-2 text-3xl font-semibold">{interaction.interactions.length}</p>
        </div>
        <div className="rounded-2xl bg-paper/70 p-5">
          <p className="text-sm text-ink/50">布局区</p>
          <p className="mt-2 text-3xl font-semibold">{layout.layoutZones.length}</p>
        </div>
        <div className="rounded-2xl bg-paper/70 p-5">
          <p className="text-sm text-ink/50">缺陷</p>
          <p className="mt-2 text-3xl font-semibold">{defects.defects.length}</p>
        </div>
      </div>
    </section>
  )
}
