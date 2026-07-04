import { getPermissionRoleGovernanceModel, getServiceBoundaryDesign } from '@/lib/phase-twelve-governance'

export function RbacServicePanel() {
  const rbac = getPermissionRoleGovernanceModel()
  const boundary = getServiceBoundaryDesign()

  return (
    <section className="rounded-world border border-ink/10 bg-white/45 p-6 shadow-soft">
      <h2 className="text-2xl font-semibold">权限角色与服务边界</h2>
      <div className="mt-5 grid gap-4 xl:grid-cols-2">
        <div className="rounded-2xl bg-paper/70 p-5">
          <h3 className="text-lg font-semibold">角色</h3>
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            {rbac.roles.map((role) => (
              <div key={role.id} className="rounded-xl bg-white/50 p-3 text-sm">
                <p className="font-semibold">{role.title}</p>
                <p className="mt-1 text-ink/55">private: {String(role.canAccessPrivate)}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-2xl bg-paper/70 p-5">
          <h3 className="text-lg font-semibold">服务</h3>
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            {boundary.services.map((service) => (
              <div key={service.id} className="rounded-xl bg-white/50 p-3 text-sm">
                <p className="font-semibold">{service.title}</p>
                <p className="mt-1 text-ink/55">{service.dataScope} · {service.state}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
