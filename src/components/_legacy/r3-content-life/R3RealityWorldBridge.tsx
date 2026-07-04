
export function R3RealityWorldBridge() {
  return (
    <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
      <p className="text-sm font-medium uppercase tracking-[0.3em] text-slate-500">Reality Bridge</p>
      <h2 className="mt-2 text-3xl font-semibold text-slate-950">前台浪漫，后台清醒，档案可靠</h2>
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <div className="rounded-3xl bg-slate-50 p-5"><h3 className="font-semibold text-slate-950">世界模式</h3><p className="mt-2 text-sm leading-6 text-slate-600">展示世界标题、区域、生命阶段、路径和时间河，让访问者进入真实生长的个人宇宙。</p></div>
        <div className="rounded-3xl bg-slate-50 p-5"><h3 className="font-semibold text-slate-950">现实模式</h3><p className="mt-2 text-sm leading-6 text-slate-600">保留现实标题、类型、来源、权限、成熟度和下一步动作，方便维护与查找。</p></div>
        <div className="rounded-3xl bg-slate-50 p-5"><h3 className="font-semibold text-slate-950">档案模式</h3><p className="mt-2 text-sm leading-6 text-slate-600">底层仍是 JSON / Markdown / 原始素材 / 关系协议，确保长期可迁移和可传承。</p></div>
      </div>
    </section>
  )
}
