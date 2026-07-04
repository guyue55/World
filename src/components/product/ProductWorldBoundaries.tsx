const boundaries = [
  {
    title: '公开世界',
    description: '展示已审查的公开节点、路径、时间流和世界说明。',
  },
  {
    title: '低光 AI',
    description: '当前只做公开导览和路径建议；不读取私密层，不自动修改世界。',
  },
  {
    title: '私密深处',
    description: '家庭、孩子、住宅、私密信件和 vault 内容不进入公开构建。',
  },
]

export function ProductWorldBoundaries() {
  return (
    <section className="rounded-[2rem] border border-white/65 bg-white/74 p-7 shadow-soft backdrop-blur md:p-8">
      <p className="text-xs font-semibold tracking-[0.35em] text-moss">PUBLIC ≠ WHOLE WORLD</p>
      <h2 className="mt-3 text-3xl font-semibold text-ink">公开层不是完整世界</h2>
      <p className="mt-3 max-w-3xl text-sm leading-7 text-ink/64">
        访客看到的是精选前厅。世界可以保存更多记忆、草案和未来计划，但权限边界必须由服务端和构建策略守住。
      </p>
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {boundaries.map((item) => (
          <div key={item.title} className="rounded-[1.4rem] bg-paper/70 p-5">
            <h3 className="text-lg font-semibold text-ink">{item.title}</h3>
            <p className="mt-2 text-sm leading-7 text-ink/62">{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
