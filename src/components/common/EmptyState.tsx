import Link from 'next/link'

export function EmptyState({
  title,
  description,
  href = '/atlas',
  action = '回到世界地图',
}: {
  title: string
  description: string
  href?: string
  action?: string
}) {
  return (
    <section className="rounded-world border border-ink/10 bg-white/45 p-8 shadow-soft">
      <h2 className="text-2xl font-semibold">{title}</h2>
      <p className="mt-3 leading-8 text-ink/65">{description}</p>
      <Link href={href} className="mt-6 inline-flex rounded-full bg-ink px-5 py-3 text-paper">
        {action}
      </Link>
    </section>
  )
}
