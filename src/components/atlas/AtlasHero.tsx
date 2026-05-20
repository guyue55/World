export function AtlasHero() {
  return (
    <section className="relative overflow-hidden rounded-[2rem] border border-ink/10 bg-night p-8 text-paper shadow-soft md:p-10">
      <div className="absolute -right-12 top-0 h-72 w-72 rounded-full bg-lake/25 blur-3xl" />
      <div className="absolute left-10 top-10 h-48 w-48 rounded-full bg-gold/20 blur-3xl" />
      <div className="relative max-w-4xl">
        <p className="text-sm tracking-[0.35em] text-gold">ATLAS</p>
        <h1 className="mt-4 text-5xl font-semibold leading-tight md:text-6xl">世界地图</h1>
        <p className="mt-5 text-lg leading-9 text-paper/75">
          Atlas 负责空间理解，Archive 负责现实检索。这里先用轻量二维结构展示区域、星线和入口，
          让访问者知道自己正在进入一个世界，而不是一组普通页面。
        </p>
      </div>
    </section>
  )
}
