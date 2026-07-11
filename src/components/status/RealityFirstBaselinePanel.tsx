type Props = {
  productStatus: string
  currentItem: string
  evidenceAt: string | null
}

const currentFacts = [
  '不同背景图只能证明电影感构图不同，不能证明独立生命空间成立。',
  '截图、报告和脚本通过只作工程证据，不能替代长时视觉与交互审查。',
  '当前必须继续完成背景独立主体、持续运行、迁移、声音、灯塔和导出恢复闭环。',
]

export function RealityFirstBaselinePanel({ productStatus, currentItem, evidenceAt }: Props) {
  return (
    <section className="border border-ink/12 bg-paper/78 p-6 shadow-soft" data-testid="living-world-baseline-status" data-product-status={productStatus}>
      <div className="flex flex-col justify-between gap-5 md:flex-row md:items-start">
        <div className="max-w-3xl">
          <p className="text-xs font-semibold text-moss">生命世界当前事实</p>
          <h2 className="mt-3 text-2xl font-semibold text-ink">电影感静态世界正在重构，生命体验尚未完成</h2>
          <p className="mt-3 text-sm leading-7 text-ink/62">当前执行到 {currentItem}。旧完成声明、评分和短录屏已经失效，所有能力重新接受冻结验收与最新证据检查。</p>
        </div>
        <div className="max-w-full border border-ink/12 bg-night px-4 py-3 text-paper">
          <p className="break-all font-mono text-xs">CINEMATIC_STATIC_WORLD_IN_PROGRESS</p>
          <p className="mt-2 text-xs text-paper/62">证据：{evidenceAt ? new Date(evidenceAt).toLocaleString('zh-CN', { hour12: false }) : '尚无'}</p>
        </div>
      </div>

      <ul className="mt-5 grid gap-3 md:grid-cols-3">
        {currentFacts.map((fact) => <li key={fact} className="border-l-2 border-gold/70 bg-white/45 px-4 py-3 text-sm leading-6 text-ink/65">{fact}</li>)}
      </ul>
    </section>
  )
}
