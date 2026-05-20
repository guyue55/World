import type { ReadingHeading } from '@/lib/reading-comfort'

export function ReadingToc({ headings }: { headings: ReadingHeading[] }) {
  if (headings.length === 0) {
    return (
      <aside className="rounded-world border border-ink/10 bg-white/45 p-5 text-sm leading-7 text-ink/55 shadow-soft">
        这篇内容暂时没有二级/三级标题，阅读时可以直接从正文开始。
      </aside>
    )
  }

  return (
    <aside className="rounded-world border border-ink/10 bg-white/45 p-5 shadow-soft">
      <p className="text-sm tracking-[0.25em] text-moss">ON THIS STAR</p>
      <h2 className="mt-3 font-semibold">阅读目录</h2>
      <nav className="mt-4 space-y-2 text-sm" aria-label="阅读目录">
        {headings.map((heading) => (
          <a
            key={heading.id}
            href={`#${heading.id}`}
            className={`block rounded-xl px-3 py-2 text-ink/60 hover:bg-white/70 hover:text-ink ${
              heading.level === 3 ? 'ml-4' : ''
            }`}
          >
            {heading.text}
          </a>
        ))}
      </nav>
    </aside>
  )
}
