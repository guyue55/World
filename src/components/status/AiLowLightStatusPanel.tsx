import { Bot, CheckCircle2, LockKeyhole, ShieldCheck } from 'lucide-react'
import type { LighthouseLocalStatus } from '@/lib/lighthouse-status'

const statusTone: Record<string, string> = {
  available: 'bg-leaf/18 text-ink',
  disabled: 'bg-gold/18 text-ink',
}

export function AiLowLightStatusPanel({ status }: { status: LighthouseLocalStatus }) {
  return (
    <section className="rounded-[2rem] border border-white/65 bg-white/74 p-7 shadow-soft backdrop-blur md:p-8">
      <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_20rem] lg:items-start">
        <div>
          <p className="flex items-center gap-2 text-xs font-semibold tracking-[0.3em] text-moss">
            <Bot className="h-4 w-4" />
            AI 低光状态
          </p>
          <h2 className="mt-3 break-words text-3xl font-semibold text-ink">灯塔可导览，但不接管世界</h2>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-ink/64">{status.summary}</p>
        </div>
        <div className="rounded-[1.25rem] bg-night p-5 text-paper">
          <p className="text-xs font-semibold tracking-[0.28em] text-gold">PROVIDER</p>
          <p className="mt-3 text-lg font-semibold">{status.realTimeAIProviderEnabled ? '已启用' : 'disabled-dry-run'}</p>
          <p className="mt-2 text-sm leading-6 text-paper/62">上下文策略：{status.contextPolicy}</p>
        </div>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {status.capabilities.map((item) => (
          <article key={item.id} className="rounded-[1.25rem] border border-ink/8 bg-paper/65 p-5">
            <div className="flex items-center justify-between gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-[0.9rem] bg-ink text-paper">
                {item.status === 'available' ? <CheckCircle2 className="h-4 w-4" /> : <LockKeyhole className="h-4 w-4" />}
              </span>
              <span className={`rounded-full px-3 py-1 text-xs font-semibold ${statusTone[item.status] ?? statusTone.disabled}`}>
                {item.status === 'available' ? '可用' : '禁用'}
              </span>
            </div>
            <h3 className="mt-4 text-lg font-semibold text-ink">{item.label}</h3>
            <p className="mt-2 text-sm leading-7 text-ink/62">{item.description}</p>
          </article>
        ))}
      </div>

      <div className="mt-6 rounded-[1.25rem] border border-lake/20 bg-lake/10 p-5">
        <p className="flex items-center gap-2 text-sm font-semibold text-ink">
          <ShieldCheck className="h-4 w-4 text-lake" />
          禁止动作
        </p>
        <div className="mt-3 grid gap-2 md:grid-cols-2">
          {status.forbiddenActions.map((action) => (
            <p key={action} className="rounded-[0.9rem] bg-paper/65 px-4 py-3 text-sm leading-6 text-ink/64">
              {action}
            </p>
          ))}
        </div>
      </div>
    </section>
  )
}
