import { getV8ProductionBlockers, v8V9Handoff } from '@/features/v8-production-ops'

export function V8HandoffPanel() {
  const blockers = getV8ProductionBlockers()

  return (
    <section className="rounded-[2.5rem] border border-white/60 bg-white/75 p-8 shadow-soft">
      <p className="text-sm tracking-[0.36em] text-moss">HANDOFF</p>
      <h2 className="mt-3 text-3xl font-semibold">V9 服务化平台交接</h2>
      <p className="mt-4 leading-7 text-ink/70">
        V8 只收束真实生产运维，不把身份系统、RBAC、后端 API 和真实审计强行塞入当前轮次。
      </p>
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <div className="rounded-3xl bg-white/70 p-5">
          <h3 className="font-semibold">V9 重点</h3>
          <ul className="mt-3 space-y-2 text-sm leading-6 text-ink/70">
            {v8V9Handoff.v9Focus.map((item) => (
              <li key={item}>· {item}</li>
            ))}
          </ul>
        </div>
        <div className="rounded-3xl bg-white/70 p-5">
          <h3 className="font-semibold">仍需真实证据</h3>
          <ul className="mt-3 space-y-2 text-sm leading-6 text-ink/70">
            {blockers.map((item) => (
              <li key={item}>· {item}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
