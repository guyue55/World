import Link from 'next/link'

export type BreadcrumbItem = {
  label: string
  href?: string
}

export function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav className="flex flex-wrap items-center gap-2 text-sm text-ink/55">
      {items.map((item, index) => (
        <span key={`${item.label}-${index}`} className="flex items-center gap-2">
          {item.href ? <Link className="underline underline-offset-4" href={item.href}>{item.label}</Link> : <span>{item.label}</span>}
          {index < items.length - 1 && <span>/</span>}
        </span>
      ))}
    </nav>
  )
}
