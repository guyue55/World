import { EmptyState } from '@/components/common/EmptyState'
import { MarkdownContent } from '@/components/common/MarkdownContent'

export function NodeReadingBody({ content }: { content: string | null }) {
  return <section className="node-reading-body">
    {content ? <div className="reading-container"><MarkdownContent content={content} /></div> : <EmptyState title="这处地点还没有完整正文" description="它已经拥有位置、关系与自然出口，正文会随内容继续生长。" href="/archive" action="去档案馆继续探索" />}
  </section>
}
