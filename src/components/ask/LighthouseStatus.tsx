export function LighthouseStatus() {
  return (
    <section className="rounded-world border border-ink/10 bg-night p-8 text-paper shadow-soft">
      <p className="text-sm tracking-[0.35em] text-paper/50">LOW LIGHT MODE</p>
      <h2 className="mt-4 text-3xl font-semibold">灯塔当前处于低光模式</h2>
      <p className="mt-4 max-w-2xl leading-8 text-paper/75">
        我不能实时对话，但已经为你准备了几条路径。
        你仍然可以使用世界地图、时间河、档案馆和本地搜索继续探索。
      </p>
    </section>
  )
}
