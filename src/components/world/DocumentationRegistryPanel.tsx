import { getAdrIndex, getDocumentationRegistry, getGlossary } from '@/lib/documentation-registry'

export function DocumentationRegistryPanel() {
  const registry = getDocumentationRegistry()
  const adr = getAdrIndex()
  const glossary = getGlossary()

  return (
    <section className="rounded-world border border-ink/10 bg-white/45 p-6 shadow-soft">
      <p className="text-sm tracking-[0.35em] text-moss">DOCUMENTATION KERNEL</p>
      <h2 className="mt-3 text-3xl font-semibold">文档内核</h2>
      <p className="mt-3 leading-8 text-ink/70">
        文档不是附属物，文档是世界骨架的一部分。
      </p>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl bg-paper/70 p-5">
          <p className="text-sm text-ink/50">注册文档</p>
          <p className="mt-2 text-3xl font-semibold">{registry.requiredDocs.length}</p>
        </div>
        <div className="rounded-2xl bg-paper/70 p-5">
          <p className="text-sm text-ink/50">ADR</p>
          <p className="mt-2 text-3xl font-semibold">{adr.records.length}</p>
        </div>
        <div className="rounded-2xl bg-paper/70 p-5">
          <p className="text-sm text-ink/50">术语</p>
          <p className="mt-2 text-3xl font-semibold">{glossary.terms.length}</p>
        </div>
      </div>
    </section>
  )
}
