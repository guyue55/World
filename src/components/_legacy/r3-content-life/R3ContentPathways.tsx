
import { r3ContentPaths } from '@/features/r3-content-life'

export function R3ContentPathways() {
  return (
    <section className="rounded-[2rem] border border-slate-200 bg-stone-50 p-6 shadow-sm">
      <p className="text-sm font-medium uppercase tracking-[0.3em] text-stone-500">Pathways</p>
      <h2 className="mt-2 text-3xl font-semibold text-stone-950">真实内容进入可探索路径</h2>
      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        {r3ContentPaths.map((path) => (
          <article key={path.id} className="rounded-3xl border border-stone-200 bg-white p-5">
            <div className="flex items-center justify-between gap-3">
              <h3 className="text-xl font-semibold text-stone-950">{path.title}</h3>
              <span className="rounded-full bg-stone-900 px-3 py-1 text-xs text-white">{path.audience}</span>
            </div>
            <p className="mt-3 text-sm leading-6 text-stone-600">{path.description}</p>
            <p className="mt-4 text-sm text-stone-500">包含 {path.nodes.length} 个节点：{path.nodes.join(' → ')}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
