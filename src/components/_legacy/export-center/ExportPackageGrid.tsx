import { getExportPackages } from '@/lib/_legacy/export-center'

export function ExportPackageGrid() {
  const packages = getExportPackages()

  return (
    <section className="grid gap-4 md:grid-cols-2">
      {packages.map((item) => (
        <article key={item.id} className="rounded-world border border-ink/10 bg-white/45 p-6 shadow-soft">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-paper px-3 py-1 text-xs uppercase tracking-[0.2em] text-moss">{item.visibility}</span>
            {item.requiresConfirmation ? <span className="rounded-full bg-amber-100 px-3 py-1 text-xs text-amber-800">需要确认</span> : <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs text-emerald-800">公开规划</span>}
          </div>
          <h2 className="mt-4 text-2xl font-semibold">{item.id}</h2>
          <p className="mt-3 text-sm leading-6 text-ink/60">格式：{item.formats.join(' · ')}</p>
          <div className="mt-5 rounded-2xl bg-paper/70 p-4 text-sm leading-6 text-ink/65">
            {item.requiresConfirmation ? '此包不能自动生成发布产物，必须由用户确认导出范围。' : '此包只可包含已允许公开的节点、路径与展览。'}
          </div>
        </article>
      ))}
    </section>
  )
}
