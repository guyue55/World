import type { AdvancedVisualizationSummary } from '@/lib/advanced-visualization'

export function AdvancedVisualizationPilotPanel({ summary }: { summary: AdvancedVisualizationSummary }) {
  const counts = [
    { label: '接受', value: summary.acceptedCandidateCount },
    { label: '暂缓', value: summary.deferredCandidateCount },
    { label: '拒绝', value: summary.rejectedCandidateCount },
    { label: '新增依赖', value: summary.dependencyDelta },
  ]

  return (
    <section
      className="rounded-[1.6rem] border border-white/65 bg-white/74 p-6 shadow-soft backdrop-blur"
      data-testid="advanced-visualization-status"
      data-pilot-title="Atlas SVG 关系场"
    >
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <p className="text-xs font-semibold tracking-[0.28em] text-moss">Advanced Visualization M24</p>
          <h2 className="mt-3 text-2xl font-semibold text-ink">{summary.pilotTitle}</h2>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-ink/62">
            当前 renderer：{summary.currentRenderer}；零新增运行时依赖。M24 只把 Atlas 关系场作为局部试点，不把 D3 / Three / WebGL 放入主线。
          </p>
        </div>
        <div className="rounded-[1rem] bg-night px-4 py-3 text-paper">
          <p className="text-xs font-semibold tracking-[0.22em] text-gold">HEAVY</p>
          <p className="mt-2 text-2xl font-semibold">{summary.usesHeavyRenderer ? 'ON' : 'OFF'}</p>
        </div>
      </div>

      <div className="mt-5 grid gap-3 md:grid-cols-4">
        {counts.map((item) => (
          <div key={item.label} className="rounded-[1rem] bg-paper/72 p-4">
            <p className="text-xs font-semibold tracking-[0.18em] text-moss">{item.label}</p>
            <p className="mt-2 text-2xl font-semibold text-ink">{item.value}</p>
          </div>
        ))}
      </div>

      <div className="mt-5 grid gap-3 lg:grid-cols-5">
        {summary.candidates.map((candidate) => (
          <article key={candidate.id} className="rounded-[1rem] border border-ink/8 bg-paper/62 p-4">
            <p className="truncate text-xs font-semibold text-moss">{candidate.status}</p>
            <h3 className="mt-2 truncate text-sm font-semibold text-ink">{candidate.label}</h3>
            <p className="mt-2 line-clamp-3 text-xs leading-5 text-ink/56">{candidate.currentDecision}</p>
          </article>
        ))}
      </div>

      <div className="mt-5 grid gap-2 md:grid-cols-3">
        {summary.evidence.slice(0, 3).map((item) => (
          <p key={item} className="rounded-[0.9rem] bg-ink/5 px-4 py-3 text-xs leading-5 text-ink/52">{item}</p>
        ))}
      </div>
    </section>
  )
}
