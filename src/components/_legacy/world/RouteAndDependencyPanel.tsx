import { getRegisteredRoutes } from '@/lib/route-manifest'
import { getDependencyGraph } from '@/lib/dependency-graph'

export function RouteAndDependencyPanel() {
  const routes = getRegisteredRoutes()
  const graph = getDependencyGraph()

  return (
    <section className="grid gap-4 xl:grid-cols-2">
      <div className="rounded-world border border-ink/10 bg-white/45 p-6 shadow-soft">
        <p className="text-sm tracking-[0.35em] text-moss">ROUTES</p>
        <h2 className="mt-3 text-3xl font-semibold">路由清单</h2>
        <div className="mt-6 space-y-2">
          {routes.slice(0, 8).map((route) => (
            <article key={route.id} className="rounded-2xl bg-paper/70 p-4">
              <h3 className="font-semibold">{route.path}</h3>
              <p className="mt-1 text-sm text-ink/60">{route.layer} · fallback {route.fallback}</p>
            </article>
          ))}
        </div>
      </div>

      <div className="rounded-world border border-ink/10 bg-white/45 p-6 shadow-soft">
        <p className="text-sm tracking-[0.35em] text-moss">DEPENDENCIES</p>
        <h2 className="mt-3 text-3xl font-semibold">依赖图</h2>
        <div className="mt-6 grid grid-cols-2 gap-3">
          <div className="rounded-2xl bg-paper/70 p-5">
            <p className="text-sm text-ink/50">节点</p>
            <p className="mt-2 text-3xl font-semibold">{graph.nodes.length}</p>
          </div>
          <div className="rounded-2xl bg-paper/70 p-5">
            <p className="text-sm text-ink/50">依赖边</p>
            <p className="mt-2 text-3xl font-semibold">{graph.edges.length}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
