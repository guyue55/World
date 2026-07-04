import { r4ConsolePanels } from '@/features/r4-creator-workbench'

export function R4ConsolePanels() {
  return (
    <section className="rounded-[2rem] border border-slate-200 bg-slate-950 p-6 text-white shadow-sm">
      <div className="mb-6 max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-[0.35em] text-cyan-200/80">Console</p>
        <h2 className="mt-2 text-3xl font-semibold">创世台六个主面板</h2>
        <p className="mt-3 text-slate-300">前台可以浪漫，后台必须清醒。R4 把主人创作层拆成清晰面板，每个面板都有现实用途和主要动作。</p>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {r4ConsolePanels.map((panel) => (
          <article key={panel.id} className="rounded-3xl border border-white/10 bg-white/10 p-5 backdrop-blur">
            <p className="text-xs uppercase tracking-[0.25em] text-slate-400">{panel.metric}</p>
            <h3 className="mt-2 text-xl font-semibold">{panel.title}</h3>
            <p className="mt-3 text-sm leading-6 text-slate-300">{panel.purpose}</p>
            <p className="mt-4 rounded-2xl bg-white/10 p-3 text-sm text-slate-100">动作：{panel.primaryAction}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
