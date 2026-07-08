import { getPreviewPerformanceSummary } from '@/lib/_legacy/preview-performance'

export function PreviewPerformancePanel() {
  const summary = getPreviewPerformanceSummary()

  return (
    <section className="rounded-world border border-ink/10 bg-white/45 p-6 shadow-soft">
      <p className="text-sm tracking-[0.35em] text-moss">PREVIEW & PERFORMANCE</p>
      <h2 className="mt-3 text-3xl font-semibold">预览冒烟与性能实测</h2>
      <p className="mt-3 max-w-3xl leading-8 text-ink/70">
        预览冒烟负责确认部署环境核心路由可达，性能实测负责记录 route、device 和指标。
        两者都必须在真实预览环境执行，当前这里只提供执行矩阵和证据结构。
      </p>
      <div className="mt-6 grid gap-3 md:grid-cols-5">
        <div className="rounded-2xl bg-paper/70 p-4"><p className="text-sm text-ink/50">冒烟路由</p><p className="mt-2 text-2xl font-semibold">{summary.previewRoutes}</p></div>
        <div className="rounded-2xl bg-paper/70 p-4"><p className="text-sm text-ink/50">待冒烟</p><p className="mt-2 text-2xl font-semibold">{summary.previewPending}</p></div>
        <div className="rounded-2xl bg-paper/70 p-4"><p className="text-sm text-ink/50">性能路由</p><p className="mt-2 text-2xl font-semibold">{summary.performanceRoutes}</p></div>
        <div className="rounded-2xl bg-paper/70 p-4"><p className="text-sm text-ink/50">待实测</p><p className="mt-2 text-2xl font-semibold">{summary.performancePending}</p></div>
        <div className="rounded-2xl bg-paper/70 p-4"><p className="text-sm text-ink/50">指标</p><p className="mt-2 text-2xl font-semibold">{summary.requiredMetrics}</p></div>
      </div>
      <div className="mt-6 rounded-2xl bg-paper/70 p-5">
        <p className="text-sm text-ink/50">预览冒烟</p>
        <code className="mt-2 block rounded-xl bg-ink/5 px-4 py-3 text-sm">GUYUE_PREVIEW_URL=&lt;url&gt; npm run preview:smoke</code>
      </div>
    </section>
  )
}
