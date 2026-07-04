import { v9ApiContracts, v9IdentityRbac, v9ServiceBlueprint } from '@/features/v9-service-platform'

export function V9ServiceMatrix() {
  return (
    <section className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
      <article className="rounded-[2.5rem] border border-white/60 bg-white/75 p-6 shadow-soft">
        <p className="text-sm tracking-[0.32em] text-moss">SERVICE LAYERS</p>
        <div className="mt-5 space-y-3">
          {v9ServiceBlueprint.layers.map((layer) => (
            <div key={layer.id} className="rounded-2xl bg-sand/70 p-4">
              <h3 className="font-semibold">{layer.name}</h3>
              <p className="mt-2 text-sm leading-6 text-ink/65">{layer.description}</p>
            </div>
          ))}
        </div>
      </article>
      <article className="rounded-[2.5rem] border border-white/60 bg-white/75 p-6 shadow-soft">
        <p className="text-sm tracking-[0.32em] text-moss">RBAC / API</p>
        <p className="mt-4 text-sm leading-7 text-ink/65">
          当前定义 {v9IdentityRbac.roles.length} 个角色与 {v9ApiContracts.contracts.length} 个 API 合约。除 service-health 外，写入类服务保持未来化与人工审批。
        </p>
        <div className="mt-5 space-y-2">
          {v9ApiContracts.contracts.map((contract) => (
            <div key={contract.id} className="rounded-2xl bg-moss/10 px-4 py-3 text-sm">
              {contract.method} {contract.path}
            </div>
          ))}
        </div>
      </article>
    </section>
  )
}
