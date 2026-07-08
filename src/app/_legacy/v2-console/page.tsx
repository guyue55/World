import { ResponsivePageShell } from '@/components/_legacy/layout/ResponsivePageShell'
import { getV21Status } from '@/lib/v2-1/status'

export default function V2ConsolePage() {
  const status = getV21Status()

  return (
    <ResponsivePageShell>
      <section className="rounded-world border border-ink/10 bg-white/45 p-8 shadow-soft">
        <p className="text-sm tracking-[0.35em] text-moss">V2.1 SERVICE CONSOLE</p>
        <h1 className="mt-4 text-4xl font-semibold md:text-6xl">V2.1 服务实现控制台</h1>
        <p className="mt-5 max-w-3xl leading-8 text-ink/70">
          这里聚合 V2 到 V3 前必须完成的服务基础、API 路由、RBAC、审计与私密边界。
          当前仍是本地服务骨架，不宣称生产上线。
        </p>
        <div className="mt-6 grid gap-3 md:grid-cols-4">
          <div className="rounded-2xl bg-paper/70 p-4">
            <p className="text-sm text-ink/50">routes</p>
            <p className="mt-2 text-2xl font-semibold">{status.summary.routes}</p>
          </div>
          <div className="rounded-2xl bg-paper/70 p-4">
            <p className="text-sm text-ink/50">checks</p>
            <p className="mt-2 text-2xl font-semibold">{status.summary.checks}</p>
          </div>
          <div className="rounded-2xl bg-paper/70 p-4">
            <p className="text-sm text-ink/50">ready</p>
            <p className="mt-2 text-2xl font-semibold">{String(status.summary.ready)}</p>
          </div>
          <div className="rounded-2xl bg-paper/70 p-4">
            <p className="text-sm text-ink/50">v3Allowed</p>
            <p className="mt-2 text-2xl font-semibold">{String(status.summary.v3Allowed)}</p>
          </div>
        </div>
      </section>

      <section className="mt-6 rounded-world border border-ink/10 bg-white/45 p-6 shadow-soft">
        <h2 className="text-2xl font-semibold">API 路由</h2>
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          {status.apiRoutes.routes.map((route) => (
            <article key={route} className="rounded-2xl bg-paper/70 p-5">
              <h3 className="text-lg font-semibold">{route}</h3>
              <p className="mt-2 text-sm text-ink/60">RBAC + audit guarded</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-6 rounded-world border border-ink/10 bg-white/45 p-6 shadow-soft">
        <h2 className="text-2xl font-semibold">进入 V3 前的检查项</h2>
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          {status.dashboard.checks.map((check) => (
            <article key={check} className="rounded-2xl bg-paper/70 p-5">
              <h3 className="text-lg font-semibold">{check}</h3>
              <p className="mt-2 text-sm text-ink/60">must remain auditable</p>
            </article>
          ))}
        </div>
      </section>
    </ResponsivePageShell>
  )
}
