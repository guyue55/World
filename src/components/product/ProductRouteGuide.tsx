import Link from 'next/link'

const defaultActions = [
  { href: '/atlas', label: '地图' },
  { href: '/timeline', label: '时间' },
  { href: '/archive', label: '档案' },
  { href: '/paths', label: '路径' },
  { href: '/ask', label: '灯塔' },
]

const safetyQuestions = ['我在哪里', '这里是什么', '能去哪', '如何回去']

export function ProductRouteGuide({
  current,
  description,
  primaryHref = '/atlas',
  primaryLabel = '回到世界地图',
}: {
  current: string
  description: string
  primaryHref?: string
  primaryLabel?: string
}) {
  return (
    <section className="rounded-[2rem] border border-white/65 bg-white/72 p-5 shadow-soft backdrop-blur md:p-6">
      <p className="text-xs font-semibold tracking-[0.32em] text-moss">你在这里</p>
      <div className="mt-3 flex flex-col justify-between gap-5 lg:flex-row lg:items-center">
        <div className="min-w-0">
          <h1 className="break-words text-3xl font-semibold text-ink md:text-4xl">{current}</h1>
          <p className="mt-2 max-w-3xl break-words text-sm leading-7 text-ink/64">{description}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {safetyQuestions.map((question) => (
              <span key={question} className="rounded-full bg-paper/75 px-3 py-1.5 text-xs font-semibold text-ink/55">
                {question}
              </span>
            ))}
          </div>
        </div>
        <div className="flex shrink-0 flex-wrap gap-2">
          <Link href={primaryHref} className="inline-flex rounded-full bg-ink px-5 py-3 text-sm font-semibold text-paper transition hover:bg-night">
            {primaryLabel}
          </Link>
          {defaultActions
            .filter((action) => action.href !== primaryHref)
            .slice(0, 4)
            .map((action) => (
              <Link
                key={action.href}
                href={action.href}
                className="inline-flex rounded-full border border-ink/10 bg-white/60 px-4 py-3 text-sm font-semibold text-ink/68 transition hover:bg-white hover:text-ink"
              >
                {action.label}
              </Link>
            ))}
        </div>
      </div>
    </section>
  )
}
