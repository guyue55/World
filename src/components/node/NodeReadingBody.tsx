import { EmptyState } from '@/components/common/EmptyState'
import { MarkdownContent } from '@/components/common/MarkdownContent'

export function NodeReadingBody({ content }: { content: string | null }) {
  return (
    <section className="rounded-world border border-ink/10 bg-white/55 p-5 shadow-soft sm:p-6 md:p-8">
      {content ? (
        <div className="reading-container">
          <MarkdownContent content={content} />
        </div>
      ) : (
        <EmptyState
          title="这颗星还没有完整正文"
          description="它已经被安放在世界中，拥有位置、权限、生命周期与关系。后续可以通过 contentPath 接入 Markdown / MDX 正文。"
          href="/archive"
          action="打开档案馆"
        />
      )}
    </section>
  )
}
