import { v9V10Handoff } from '@/features/v9-service-platform'

export function V9HandoffPanel() {
  return (
    <section className="rounded-[2.5rem] border border-white/60 bg-ink p-6 text-white shadow-soft md:p-8">
      <p className="text-sm tracking-[0.32em] text-white/50">HANDOFF TO V10</p>
      <h2 className="mt-3 text-3xl font-semibold">长期智能世界交接</h2>
      <p className="mt-4 max-w-3xl leading-7 text-white/70">
        V9 只完成服务化平台骨架，不宣称真实服务上线。V10 可以在此基础上进入长期智能世界、智能运营、记忆系统和真实服务接入。
      </p>
      <div className="mt-6 grid gap-3 md:grid-cols-2">
        {v9V10Handoff.handoffItems.map((item) => (
          <div key={item} className="rounded-2xl bg-white/10 px-4 py-3 text-sm text-white/75">
            {item}
          </div>
        ))}
      </div>
    </section>
  )
}
