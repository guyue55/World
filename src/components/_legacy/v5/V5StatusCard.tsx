type V5StatusCardProps = {
  title: string
  value: string
  description: string
}

export function V5StatusCard({ title, value, description }: V5StatusCardProps) {
  return (
    <article className="rounded-2xl border border-ink/10 bg-white/55 p-5 shadow-soft">
      <p className="text-sm tracking-[0.25em] text-moss">{title}</p>
      <p className="mt-3 text-2xl font-semibold text-ink">{value}</p>
      <p className="mt-2 text-sm leading-6 text-ink/60">{description}</p>
    </article>
  )
}
