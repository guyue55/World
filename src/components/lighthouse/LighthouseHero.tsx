export function LighthouseHero() {
  return (
    <section className="relative overflow-hidden rounded-[2rem] border border-ink/10 bg-night p-8 text-paper shadow-soft md:p-10">
      <div className="absolute right-0 top-0 h-72 w-72 rounded-full bg-gold/20 blur-3xl" />
      <div className="absolute left-10 bottom-0 h-64 w-64 rounded-full bg-lake/20 blur-3xl" />
      <div className="relative max-w-4xl">
        <p className="text-sm tracking-[0.35em] text-gold">AI LIGHTHOUSE</p>
        <h1 className="mt-4 text-5xl font-semibold leading-tight md:text-6xl">AI 灯塔</h1>
        <p className="mt-5 text-lg leading-9 text-paper/75">
          AI 是灯塔，不是太阳。当前 Ask 页面运行在低光模式：不假装已经接入实时 AI，
          但会基于公开内容、公开路径和安全边界，为访问者提供清晰导览。
        </p>
      </div>
    </section>
  )
}
