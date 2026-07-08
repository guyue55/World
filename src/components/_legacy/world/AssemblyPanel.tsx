import {
  getAssemblyManifest,
  getEnvironmentBaseline,
  getRepositoryStructureContract,
  getReproducibilityContract,
} from '@/lib/assembly'

export function AssemblyPanel() {
  const assembly = getAssemblyManifest()
  const env = getEnvironmentBaseline()
  const repo = getRepositoryStructureContract()
  const repro = getReproducibilityContract()

  return (
    <section className="rounded-world border border-ink/10 bg-white/45 p-6 shadow-soft">
      <p className="text-sm tracking-[0.35em] text-moss">REPRODUCIBLE FOUNDATION</p>
      <h2 className="mt-3 text-3xl font-semibold">{assembly.name}</h2>
      <p className="mt-3 leading-8 text-ink/70">{assembly.principle}</p>

      <div className="mt-6 grid gap-4 md:grid-cols-4">
        <div className="rounded-2xl bg-paper/70 p-5">
          <p className="text-sm text-ink/50">合并批次</p>
          <p className="mt-2 text-3xl font-semibold">{assembly.mergeOrder.length}</p>
        </div>
        <div className="rounded-2xl bg-paper/70 p-5">
          <p className="text-sm text-ink/50">根目录</p>
          <p className="mt-2 text-3xl font-semibold">{repo.roots.length}</p>
        </div>
        <div className="rounded-2xl bg-paper/70 p-5">
          <p className="text-sm text-ink/50">必需命令</p>
          <p className="mt-2 text-3xl font-semibold">{env.requiredScripts.length}</p>
        </div>
        <div className="rounded-2xl bg-paper/70 p-5">
          <p className="text-sm text-ink/50">复现检查</p>
          <p className="mt-2 text-3xl font-semibold">{repro.checks.length}</p>
        </div>
      </div>
    </section>
  )
}
