import { r4InboxItems } from '@/features/_legacy/r4-creator-workbench'

export function R4InboxHarbor() {
  return (
    <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-6 max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-[0.35em] text-slate-500">Stardust Harbor</p>
        <h2 className="mt-2 text-3xl font-semibold text-slate-950">星尘港：先接住，再整理。</h2>
        <p className="mt-3 text-slate-600">日常使用的第一入口不是写完整文章，而是把一句话、图片、链接、代码片段或 AI 对话先放进世界，再由创世台建议归属、权限、生命阶段和下一步动作。</p>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {r4InboxItems.map((item) => (
          <article key={item.id} className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
            <div className="flex items-center justify-between gap-3">
              <h3 className="font-semibold text-slate-950">{item.title}</h3>
              <span className="rounded-full bg-white px-3 py-1 text-xs text-slate-500">{item.kind}</span>
            </div>
            <p className="mt-3 text-sm leading-6 text-slate-600">{item.rawInput}</p>
            <div className="mt-4 grid gap-2 text-sm text-slate-600 sm:grid-cols-2">
              <span>区域：{item.suggestedArea}</span>
              <span>权限：{item.suggestedVisibility}</span>
              <span>阶段：{item.suggestedLifeStage}</span>
              <span>风险：{item.risk}</span>
            </div>
            <p className="mt-4 rounded-2xl bg-white p-3 text-sm text-slate-700">下一步：{item.nextAction}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
