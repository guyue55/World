import type { AuthorWorldEditorSummary } from '@/lib/author-world-editor'

export function AuthorWorldEditorPanel({ summary }: { summary: AuthorWorldEditorSummary }) {
  const checks = [
    { label: '有效草稿', value: summary.validation.validDraftPasses ? '通过' : '失败' },
    { label: '阻止坏草稿', value: summary.validation.invalidDraftsBlocked },
    { label: '写入前端', value: summary.frontendWritesWorldSource ? 'ON' : 'OFF' },
    { label: '权限前端', value: summary.frontendPermissionAuthority ? 'ON' : 'OFF' },
  ]

  const impactItems = [
    { label: 'Atlas', value: summary.impactPreview.atlas },
    { label: 'Archive', value: summary.impactPreview.archive },
    { label: 'Paths', value: summary.impactPreview.paths },
    { label: 'Timeline', value: summary.impactPreview.timeline },
    { label: 'Lighthouse', value: summary.impactPreview.lighthouse },
  ]

  return (
    <section
      className="rounded-[1.6rem] border border-white/65 bg-white/74 p-6 shadow-soft backdrop-blur"
      data-testid="author-world-editor-status"
      data-editor-mode={summary.mode}
      data-permission-source={summary.permissionFactSource}
    >
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <p className="text-xs font-semibold tracking-[0.28em] text-moss">Author World Editor M25</p>
          <h2 className="mt-3 text-2xl font-semibold text-ink">作者世界编辑台：只读 dry-run</h2>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-ink/62">
            作者用中文草稿先看校验和影响预览；权限事实源来自 {summary.permissionFactSource}。前端只展示结果，不直接写世界源。
          </p>
        </div>
        <div className="rounded-[1rem] bg-night px-4 py-3 text-paper">
          <p className="text-xs font-semibold tracking-[0.22em] text-gold">MODULES</p>
          <p className="mt-2 text-2xl font-semibold">{summary.moduleCount}</p>
        </div>
      </div>

      <div className="mt-5 grid gap-3 md:grid-cols-4">
        {checks.map((item) => (
          <div key={item.label} className="rounded-[1rem] bg-paper/72 p-4">
            <p className="text-xs font-semibold tracking-[0.18em] text-moss">{item.label}</p>
            <p className="mt-2 break-words text-2xl font-semibold text-ink">{item.value}</p>
          </div>
        ))}
      </div>

      <div className="mt-5 grid gap-3 lg:grid-cols-3">
        {summary.modules.map((module) => (
          <article key={module.id} className="rounded-[1rem] border border-ink/8 bg-paper/62 p-4">
            <p className="text-xs font-semibold text-moss">{module.id}</p>
            <h3 className="mt-2 text-sm font-semibold text-ink">{module.label}</h3>
            <p className="mt-2 text-xs leading-5 text-ink/56">{module.requiredFieldCount} 个必填字段</p>
          </article>
        ))}
      </div>

      <div className="mt-5 grid gap-3 lg:grid-cols-5">
        {impactItems.map((item) => (
          <article key={item.label} className="rounded-[1rem] bg-ink/5 p-4">
            <p className="text-xs font-semibold tracking-[0.18em] text-moss">{item.label}</p>
            <p className="mt-2 text-xs leading-5 text-ink/58">{item.value}</p>
          </article>
        ))}
      </div>

      <div className="mt-5 grid gap-2 md:grid-cols-3">
        {summary.maintenanceHints.map((hint) => (
          <p key={hint} className="rounded-[0.9rem] bg-gold/10 px-4 py-3 text-xs leading-5 text-ink/60">{hint}</p>
        ))}
      </div>
    </section>
  )
}
