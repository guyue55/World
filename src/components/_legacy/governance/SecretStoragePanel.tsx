import { getSecretGovernancePolicy, getStorageGovernanceMatrix } from '@/lib/phase-twelve-governance'

export function SecretStoragePanel() {
  const secrets = getSecretGovernancePolicy()
  const storage = getStorageGovernanceMatrix()

  return (
    <section className="rounded-world border border-ink/10 bg-white/45 p-6 shadow-soft">
      <h2 className="text-2xl font-semibold">密钥与存储治理</h2>
      <div className="mt-5 grid gap-4 xl:grid-cols-2">
        <div className="rounded-2xl bg-paper/70 p-5">
          <h3 className="text-lg font-semibold">密钥类别</h3>
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            {secrets.secretClasses.map((item) => (
              <div key={item.id} className="rounded-xl bg-white/50 p-3 text-sm">
                <p className="font-semibold">{item.id}</p>
                <p className="mt-1 text-ink/55">{item.storage} · {item.rotation}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-2xl bg-paper/70 p-5">
          <h3 className="text-lg font-semibold">存储</h3>
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            {storage.stores.map((item) => (
              <div key={item.id} className="rounded-xl bg-white/50 p-3 text-sm">
                <p className="font-semibold">{item.id}</p>
                <p className="mt-1 text-ink/55">{item.dataScope} · {item.encryption}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
