export function ReadingComfortBar({
  readingMinutes,
  headingCount,
}: {
  readingMinutes: number | null
  headingCount: number
}) {
  return (
    <section data-reading-comfort aria-label="阅读概览">
      <div>
        <span>{readingMinutes ? `约 ${readingMinutes} 分钟` : '正文待续'}</span>
        <span>{headingCount > 0 ? `${headingCount} 节` : '连续阅读'}</span>
      </div>
    </section>
  )
}
