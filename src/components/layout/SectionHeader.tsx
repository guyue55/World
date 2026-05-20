import type { ReactNode } from 'react'

type SectionHeaderProps = {
  eyebrow: string
  title: string
  description?: string
  action?: ReactNode
}

export function SectionHeader({ eyebrow, title, description, action }: SectionHeaderProps) {
  return (
    <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
      <div className="max-w-3xl">
        <p className="text-sm tracking-[0.35em] text-moss">{eyebrow}</p>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">{title}</h2>
        {description && <p className="mt-3 leading-8 text-ink/70">{description}</p>}
      </div>
      {action}
    </div>
  )
}
