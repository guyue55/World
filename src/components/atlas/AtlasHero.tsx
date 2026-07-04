export function AtlasHero() {
  return (
    <section className="relative overflow-hidden rounded-[2.2rem] border border-white/65 bg-night p-8 text-paper shadow-soft md:p-10">
      <div className="absolute -right-12 top-0 h-72 w-72 rounded-full bg-lake/25 blur-3xl" />
      <div className="absolute left-10 top-10 h-48 w-48 rounded-full bg-gold/20 blur-3xl" />
      <div className="relative max-w-4xl">
        <p className="text-sm tracking-[0.35em] text-gold">ATLAS</p>
        <h1 className="mt-4 text-5xl font-semibold leading-tight md:text-6xl">世界地图</h1>
        <p className="mt-5 text-lg leading-9 text-paper/75">
          这里是古月浮屿的空间入口。先看五个主区域，再进入节点；想快速查找时，可以切换到档案馆。
        </p>
      </div>
    </section>
  )
}
