import { CheckCircle2, Map, Route, ShieldCheck, Waypoints } from 'lucide-react'
import type { PathQualityLedger } from '@/lib/path-quality-ledger'

const gateTone: Record<string, string> = {
  passed: 'bg-leaf/18 text-ink',
  failed: 'bg-gold/20 text-ink',
}

export function PathQualityLedgerPanel({ ledger }: { ledger: PathQualityLedger }) {
  const releaseBlocked = !ledger.releaseStates.productionLive && !ledger.releaseStates.releaseReady && !ledger.releaseStates.cleanProductionReady
  const headline = ledger.status === 'passed' ? '路径质量门禁已通过' : '路径质量需要复核'

  return (
    <section className="rounded-[2rem] border border-white/65 bg-white/74 p-7 shadow-soft backdrop-blur md:p-8">
      <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_22rem] lg:items-start">
        <div>
          <p className="flex items-center gap-2 text-xs font-semibold tracking-[0.3em] text-moss">
            <Route className="h-4 w-4" />
            路径质量
          </p>
          <h2 className="mt-3 break-words text-3xl font-semibold text-ink">{headline}</h2>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-ink/64">{ledger.summary}</p>
        </div>
        <div className="rounded-[1.25rem] bg-night p-5 text-paper">
          <p className="text-xs font-semibold tracking-[0.28em] text-gold">local-only</p>
          <p className="mt-3 text-lg font-semibold">本地 / 局域网范围</p>
          <p className="mt-2 text-sm leading-6 text-paper/62">
            {releaseBlocked ? '外部 Preview / Production 继续阻断。' : '发布状态需要人工复核。'}
          </p>
        </div>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-4">
        <div className="rounded-[1.2rem] bg-paper/70 p-5">
          <p className="flex items-center gap-2 text-xs font-semibold tracking-[0.24em] text-moss">
            <Waypoints className="h-4 w-4" />
            公开路径
          </p>
          <p className="mt-3 text-3xl font-semibold text-ink">{ledger.metrics.publicPaths}</p>
          <p className="mt-1 text-sm text-ink/58">可走旅程</p>
        </div>
        <div className="rounded-[1.2rem] bg-paper/70 p-5">
          <p className="text-xs font-semibold tracking-[0.24em] text-moss">平均节点</p>
          <p className="mt-3 text-3xl font-semibold text-ink">{ledger.metrics.averageNodesPerPath}</p>
          <p className="mt-1 text-sm text-ink/58">每条路径</p>
        </div>
        <div className="rounded-[1.2rem] bg-paper/70 p-5">
          <p className="flex items-center gap-2 text-xs font-semibold tracking-[0.24em] text-moss">
            <Map className="h-4 w-4" />
            跨区域路径
          </p>
          <p className="mt-3 text-3xl font-semibold text-ink">{ledger.metrics.pathsWithMultipleAreas}</p>
          <p className="mt-1 text-sm text-ink/58">连接多个空间</p>
        </div>
        <div className="rounded-[1.2rem] bg-paper/70 p-5">
          <p className="text-xs font-semibold tracking-[0.24em] text-moss">有出口路径</p>
          <p className="mt-3 text-3xl font-semibold text-ink">{ledger.metrics.pathsWithExitOrNext}</p>
          <p className="mt-1 text-sm text-ink/58">能继续探索</p>
        </div>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {ledger.gates.slice(0, 6).map((gate) => (
          <article key={gate.id} className="rounded-[1.25rem] border border-ink/8 bg-paper/65 p-5">
            <div className="flex items-start justify-between gap-3">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-[0.9rem] bg-ink text-paper">
                {gate.status === 'passed' ? <CheckCircle2 className="h-4 w-4" /> : <ShieldCheck className="h-4 w-4" />}
              </span>
              <span className={`rounded-full px-3 py-1 text-xs font-semibold ${gateTone[gate.status] ?? gateTone.failed}`}>
                {gate.status === 'passed' ? '通过' : '需复核'}
              </span>
            </div>
            <h3 className="mt-4 text-lg font-semibold text-ink">{gate.label}</h3>
            <p className="mt-2 text-2xl font-semibold text-ink">{gate.actual}/{gate.expected}</p>
            <p className="mt-2 text-sm leading-7 text-ink/62">{gate.note}</p>
          </article>
        ))}
      </div>

      <div className="mt-6 rounded-[1.25rem] bg-night p-5 text-paper">
        <p className="text-sm font-semibold">下一步精修重点</p>
        <div className="mt-3 grid gap-2 md:grid-cols-3">
          {ledger.nextActions.map((item) => (
            <p key={item} className="rounded-[0.9rem] bg-white/8 px-4 py-3 text-sm leading-6 text-paper/68">
              {item}
            </p>
          ))}
        </div>
      </div>
    </section>
  )
}
