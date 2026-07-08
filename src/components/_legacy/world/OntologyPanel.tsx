import { getWorldOntology } from '@/lib/ontology'

export function OntologyPanel() {
  const ontology = getWorldOntology()

  return (
    <section className="rounded-world border border-ink/10 bg-white/45 p-6 shadow-soft">
      <p className="text-sm tracking-[0.35em] text-moss">ONTOLOGY</p>
      <h2 className="mt-3 text-3xl font-semibold">世界本体与语义层</h2>
      <p className="mt-3 leading-8 text-ink/70">
        世界本体定义内容是什么、为何存在、如何互相照见。
      </p>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl bg-paper/70 p-5">
          <h3 className="font-semibold">核心实体</h3>
          <p className="mt-3 text-sm leading-7 text-ink/65">
            {ontology.entities.map((entity) => entity.id).join(' / ')}
          </p>
        </div>
        <div className="rounded-2xl bg-paper/70 p-5">
          <h3 className="font-semibold">语义层</h3>
          <p className="mt-3 text-sm leading-7 text-ink/65">
            {ontology.semanticLayers.map((layer) => layer.id).join(' / ')}
          </p>
        </div>
      </div>
    </section>
  )
}
