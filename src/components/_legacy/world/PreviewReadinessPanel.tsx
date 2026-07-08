import {
  getPerformanceRunbook,
  getPreviewDeploymentRecord,
  getPreviewSmokeChecks,
} from '@/lib/_legacy/preview-readiness'

export function PreviewReadinessPanel() {
  const smoke = getPreviewSmokeChecks()
  const record = getPreviewDeploymentRecord()
  const performance = getPerformanceRunbook()

  return (
    <section className="rounded-world border border-ink/10 bg-white/45 p-6 shadow-soft">
      <p className="text-sm tracking-[0.35em] text-moss">PREVIEW READINESS</p>
      <h2 className="mt-3 text-3xl font-semibold">预览部署冒烟检查</h2>
      <p className="mt-3 leading-8 text-ink/70">
        预览环境要先证明世界入口、安全边界和公开端点可用。
      </p>

      <div className="mt-6 grid gap-4 md:grid-cols-4">
        <div className="rounded-2xl bg-paper/70 p-5">
          <p className="text-sm text-ink/50">路由检查</p>
          <p className="mt-2 text-3xl font-semibold">{smoke.routes.length}</p>
        </div>
        <div className="rounded-2xl bg-paper/70 p-5">
          <p className="text-sm text-ink/50">端点检查</p>
          <p className="mt-2 text-3xl font-semibold">{smoke.endpoints.length}</p>
        </div>
        <div className="rounded-2xl bg-paper/70 p-5">
          <p className="text-sm text-ink/50">部署状态</p>
          <p className="mt-2 text-lg font-semibold">{record.status}</p>
        </div>
        <div className="rounded-2xl bg-paper/70 p-5">
          <p className="text-sm text-ink/50">性能路由</p>
          <p className="mt-2 text-3xl font-semibold">{performance.requiredRoutes.length}</p>
        </div>
      </div>
    </section>
  )
}
