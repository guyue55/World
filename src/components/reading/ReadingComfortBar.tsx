export function ReadingComfortBar({
  readingMinutes,
  headingCount,
  readingWidth,
}: {
  readingMinutes: number | null
  headingCount: number
  readingWidth: string
}) {
  return (
    <section className="rounded-world border border-ink/10 bg-white/45 p-4 shadow-soft">
      <div className="flex flex-wrap gap-3 text-sm text-ink/60">
        <span className="rounded-full bg-paper/80 px-4 py-2">阅读时间：{readingMinutes ? `约 ${readingMinutes} 分钟` : '待补正文'}</span>
        <span className="rounded-full bg-paper/80 px-4 py-2">目录段落：{headingCount}</span>
        <span className="rounded-full bg-paper/80 px-4 py-2">正文宽度：{readingWidth}</span>
        <span className="rounded-full bg-paper/80 px-4 py-2">移动端：正文优先</span>
      </div>
    </section>
  )
}
