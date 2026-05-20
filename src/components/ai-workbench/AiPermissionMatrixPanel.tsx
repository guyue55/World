import { getAiPermissionMatrix } from '@/lib/ai-workbench-v2'

export function AiPermissionMatrixPanel() {
  const matrix = getAiPermissionMatrix()

  return (
    <section className="rounded-world border border-ink/10 bg-white/45 p-6 shadow-soft">
      <h2 className="text-2xl font-semibold">AI 权限矩阵</h2>
      <div className="mt-5 grid gap-3 md:grid-cols-3 xl:grid-cols-4">
        {matrix.permissions.map((item) => (
          <div key={item.operation} className="rounded-2xl bg-paper/70 p-4">
            <p className="text-xs uppercase tracking-[0.2em] text-moss">{item.operation}</p>
            <p className="mt-3 text-sm text-ink/60">default: {item.default}</p>
            <p className="mt-2 text-sm text-ink/60">humanConfirmation: {String(item.humanConfirmation)}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
