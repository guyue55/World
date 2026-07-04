export function StatusHero() {
  return (
    <section className="rounded-[2rem] border border-ink/10 bg-white/50 p-8 shadow-soft md:p-10">
      <p className="text-sm tracking-[0.35em] text-moss">WORLD STATUS</p>
      <h1 className="mt-4 text-5xl font-semibold leading-tight md:text-6xl">世界状态</h1>
      <p className="mt-5 max-w-4xl text-lg leading-9 text-ink/70">
        这里不是运维面板，也不是把所有工程信息摊开的仓库索引。状态中心负责把世界健康度、真实验收边界、
        第二阶段体验进展和后续行动整理成可理解的结构。
      </p>
    </section>
  )
}
