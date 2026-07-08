import { CheckCircle2, ExternalLink, Image as ImageIcon, MonitorCheck, ShieldCheck, Signal } from 'lucide-react'
import type { LocalMaturityLedger } from '@/lib/local-maturity-ledger'

const gateTone: Record<string, string> = {
  passed: 'bg-leaf/18 text-ink',
  failed: 'bg-gold/20 text-ink',
}

const gateIcon: Record<string, typeof CheckCircle2> = {
  passed: CheckCircle2,
  failed: ShieldCheck,
}

export function LocalMaturityLedgerPanel({ ledger }: { ledger: LocalMaturityLedger }) {
  const releaseBlocked = !ledger.releaseStates.productionLive && !ledger.releaseStates.releaseReady && !ledger.releaseStates.cleanProductionReady

  return (
    <section className="rounded-[2rem] border border-white/65 bg-white/74 p-7 shadow-soft backdrop-blur md:p-8">
      <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_22rem] lg:items-start">
        <div>
          <p className="flex items-center gap-2 text-xs font-semibold tracking-[0.3em] text-moss">
            <MonitorCheck className="h-4 w-4" />
            本地成熟度
          </p>
          <h2 className="mt-3 break-words text-3xl font-semibold text-ink">本地与局域网证据已经收束成账本</h2>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-ink/64">{ledger.summary}</p>
        </div>
        <div className="rounded-[1.25rem] bg-night p-5 text-paper">
          <p className="text-xs font-semibold tracking-[0.28em] text-gold">LAN</p>
          <p className="mt-3 break-all text-lg font-semibold">{ledger.localAccess.baseUrl}</p>
          <p className="mt-2 text-sm leading-6 text-paper/62">
            {ledger.localAccess.bindHost}:{ledger.localAccess.port} · {ledger.localAccess.mode}
          </p>
        </div>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-4">
        <div className="rounded-[1.2rem] bg-paper/70 p-5">
          <p className="text-xs font-semibold tracking-[0.24em] text-moss">节点</p>
          <p className="mt-3 text-3xl font-semibold text-ink">{ledger.world.publicNodes}</p>
          <p className="mt-1 text-sm text-ink/58">公开内容</p>
        </div>
        <div className="rounded-[1.2rem] bg-paper/70 p-5">
          <p className="text-xs font-semibold tracking-[0.24em] text-moss">路径</p>
          <p className="mt-3 text-3xl font-semibold text-ink">{ledger.world.publicPaths}</p>
          <p className="mt-1 text-sm text-ink/58">可走旅程</p>
        </div>
        <div className="rounded-[1.2rem] bg-paper/70 p-5">
          <p className="text-xs font-semibold tracking-[0.24em] text-moss">关系</p>
          <p className="mt-3 text-3xl font-semibold text-ink">{ledger.world.relations}</p>
          <p className="mt-1 text-sm text-ink/58">星线连接</p>
        </div>
        <div className="rounded-[1.2rem] bg-paper/70 p-5">
          <p className="text-xs font-semibold tracking-[0.24em] text-moss">事件</p>
          <p className="mt-3 text-3xl font-semibold text-ink">{ledger.world.events}</p>
          <p className="mt-1 text-sm text-ink/58">时间痕迹</p>
        </div>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {ledger.gates.map((gate) => {
          const Icon = gateIcon[gate.status] ?? ShieldCheck
          return (
            <article key={gate.id} className="rounded-[1.25rem] border border-ink/8 bg-paper/65 p-5">
              <div className="flex items-start justify-between gap-3">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-[0.9rem] bg-ink text-paper">
                  <Icon className="h-4 w-4" />
                </span>
                <span className={`rounded-full px-3 py-1 text-xs font-semibold ${gateTone[gate.status] ?? gateTone.failed}`}>
                  {gate.status === 'passed' ? '通过' : '需复核'}
                </span>
              </div>
              <h3 className="mt-4 text-lg font-semibold text-ink">{gate.label}</h3>
              <p className="mt-2 text-2xl font-semibold text-ink">{gate.value}</p>
              <p className="mt-2 text-sm leading-7 text-ink/62">{gate.note}</p>
            </article>
          )
        })}
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-[minmax(0,1fr)_20rem]">
        <div className="rounded-[1.25rem] border border-lake/20 bg-lake/10 p-5">
          <p className="flex items-center gap-2 text-sm font-semibold text-ink">
            <ImageIcon className="h-4 w-4 text-lake" />
            截图证据
          </p>
          <p className="mt-2 text-sm leading-7 text-ink/64">
            当前保留 {ledger.evidence.screenshotCount} 张规范化截图，覆盖 desktop、mobile 和 reduced-motion 场景。
          </p>
        </div>
        <div className="rounded-[1.25rem] border border-gold/30 bg-gold/12 p-5">
          <p className="flex items-center gap-2 text-sm font-semibold text-ink">
            <Signal className="h-4 w-4 text-gold" />
            外部发布保持阻断
          </p>
          <p className="mt-2 text-sm leading-7 text-ink/64">
            {releaseBlocked ? 'productionLive、releaseReady、cleanProductionReady 均为 false。' : '发布状态需要人工复核。'}
          </p>
        </div>
      </div>

      <div className="mt-6 rounded-[1.25rem] bg-night p-5 text-paper">
        <p className="flex items-center gap-2 text-sm font-semibold">
          <ExternalLink className="h-4 w-4 text-gold" />
          下一步
        </p>
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
