import {
  getComponentContract,
  getCouplingGuard,
  getExtensionInterfaceContract,
  getModuleArchitectureContract,
} from '@/lib/architecture-contracts'

export function ArchitectureContractPanel() {
  const modules = getModuleArchitectureContract()
  const components = getComponentContract()
  const extensions = getExtensionInterfaceContract()
  const guard = getCouplingGuard()

  return (
    <section className="rounded-world border border-ink/10 bg-white/45 p-6 shadow-soft">
      <p className="text-sm tracking-[0.35em] text-moss">ARCHITECTURE</p>
      <h2 className="mt-3 text-3xl font-semibold">模块化架构契约</h2>
      <p className="mt-3 leading-8 text-ink/70">
        模块化不是目录好看，而是让未来复杂度不会互相污染。
      </p>

      <div className="mt-6 grid gap-4 md:grid-cols-4">
        <div className="rounded-2xl bg-paper/70 p-5">
          <p className="text-sm text-ink/50">模块层</p>
          <p className="mt-2 text-3xl font-semibold">{modules.layers.length}</p>
        </div>
        <div className="rounded-2xl bg-paper/70 p-5">
          <p className="text-sm text-ink/50">组件类型</p>
          <p className="mt-2 text-3xl font-semibold">{components.componentKinds.length}</p>
        </div>
        <div className="rounded-2xl bg-paper/70 p-5">
          <p className="text-sm text-ink/50">扩展接口</p>
          <p className="mt-2 text-3xl font-semibold">{extensions.interfaces.length}</p>
        </div>
        <div className="rounded-2xl bg-paper/70 p-5">
          <p className="text-sm text-ink/50">反模式</p>
          <p className="mt-2 text-3xl font-semibold">{guard.antiPatterns.length}</p>
        </div>
      </div>
    </section>
  )
}
