import { CheckCircle2, Eye, LockKeyhole, ServerCog, ShieldCheck } from 'lucide-react'
import type { OwnerReadonlyConsoleLedger } from '@/lib/owner-readonly-console'

const gateTone: Record<string, string> = {
  passed: 'bg-leaf/18 text-ink',
  failed: 'bg-gold/20 text-ink',
}

export function OwnerReadonlyConsolePanel({ ledger }: { ledger: OwnerReadonlyConsoleLedger }) {
  const releaseBlocked = !ledger.releaseStates.productionLive && !ledger.releaseStates.releaseReady && !ledger.releaseStates.cleanProductionReady

  return (
    <section className="rounded-[2rem] border border-white/65 bg-white/74 p-7 shadow-soft backdrop-blur md:p-8">
      <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_22rem] lg:items-start">
        <div>
          <p className="flex items-center gap-2 text-xs font-semibold tracking-[0.3em] text-moss">
            <LockKeyhole className="h-4 w-4" />
            Owner 只读指挥台
          </p>
          <h2 className="mt-3 break-words text-3xl font-semibold text-ink">维护者视角已经收束为只读观察层</h2>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-ink/64">{ledger.summary}</p>
        </div>
        <div className="rounded-[1.25rem] bg-night p-5 text-paper">
          <p className="text-xs font-semibold tracking-[0.28em] text-gold">local/LAN</p>
          <p className="mt-3 break-all text-lg font-semibold">{ledger.localAccess.baseUrl}</p>
          <p className="mt-2 text-sm leading-6 text-paper/62">
            {releaseBlocked ? '外部发布保持阻断，Owner 指挥台只服务本地维护。' : '发布状态需要人工复核。'}
          </p>
        </div>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-4">
        <div className="rounded-[1.2rem] bg-paper/70 p-5">
          <p className="flex items-center gap-2 text-xs font-semibold tracking-[0.24em] text-moss">
            <ServerCog className="h-4 w-4" />
            服务端守门
          </p>
          <p className="mt-3 text-3xl font-semibold text-ink">{ledger.apiBoundary.ownerOnlyRoutes}</p>
          <p className="mt-1 text-sm text-ink/58">owner-only API</p>
        </div>
        <div className="rounded-[1.2rem] bg-paper/70 p-5">
          <p className="text-xs font-semibold tracking-[0.24em] text-moss">权限 API</p>
          <p className="mt-3 text-3xl font-semibold text-ink">{ledger.apiBoundary.permissionGuardedRoutes}</p>
          <p className="mt-1 text-sm text-ink/58">permission-guarded</p>
        </div>
        <div className="rounded-[1.2rem] bg-paper/70 p-5">
          <p className="text-xs font-semibold tracking-[0.24em] text-moss">只读 / no-store</p>
          <p className="mt-3 text-3xl font-semibold text-ink">{ledger.apiBoundary.mutatingRoutes}</p>
          <p className="mt-1 text-sm text-ink/58">写入型仍受守门</p>
        </div>
        <div className="rounded-[1.2rem] bg-paper/70 p-5">
          <p className="flex items-center gap-2 text-xs font-semibold tracking-[0.24em] text-moss">
            <Eye className="h-4 w-4" />
            AI 状态
          </p>
          <p className="mt-3 text-3xl font-semibold text-ink">{ledger.aiBoundary.mode}</p>
          <p className="mt-1 text-sm text-ink/58">不写入、不发布、不调用真实 AI</p>
        </div>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {ledger.gates.map((gate) => (
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
            <p className="mt-2 text-2xl font-semibold text-ink">{gate.value}</p>
            <p className="mt-2 text-sm leading-7 text-ink/62">{gate.note}</p>
          </article>
        ))}
      </div>

      <div className="mt-6 rounded-[1.25rem] bg-night p-5 text-paper">
        <p className="text-sm font-semibold">下一步</p>
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
