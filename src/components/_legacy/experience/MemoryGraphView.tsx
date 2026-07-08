import { memoryGraphNodes } from '@/features/_legacy/experience-realization'

export function MemoryGraphView() {
  return (
    <div className="rounded-[3rem] border border-white/50 bg-ink p-6 text-white shadow-soft">
      <div className="grid gap-4 md:grid-cols-5">
        {memoryGraphNodes.map((memory) => (
          <div key={memory.title} className="rounded-[2rem] border border-white/15 bg-white/10 p-5">
            <p className="text-xs tracking-[0.3em] text-white/50">WEIGHT {memory.weight}</p>
            <h3 className="mt-3 text-xl font-semibold">{memory.title}</h3>
            <p className="mt-3 text-sm text-white/60">visibility: {memory.visibility}</p>
          </div>
        ))}
      </div>
      <p className="mt-5 text-sm leading-6 text-white/60">
        私密节点只显示脱敏状态，不暴露原文。图谱体验优先语义可读，再逐步进入真实可视化。
      </p>
    </div>
  )
}
