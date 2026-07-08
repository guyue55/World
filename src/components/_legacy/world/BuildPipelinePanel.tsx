import { getBuildPipeline } from '@/lib/_legacy/build-pipeline'

export function BuildPipelinePanel() {
  const pipeline = getBuildPipeline()

  return (
    <section className="rounded-world border border-ink/10 bg-white/45 p-6 shadow-soft">
      <p className="text-sm tracking-[0.35em] text-moss">BUILD PIPELINE</p>
      <h2 className="mt-3 text-3xl font-semibold">世界构建流水线</h2>
      <p className="mt-3 leading-8 text-ink/70">{pipeline.principle}</p>

      <div className="mt-6 space-y-3">
        {pipeline.stages.map((stage, index) => (
          <article key={stage.id} className="rounded-2xl border border-ink/10 bg-paper/60 p-4">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <h3 className="font-semibold">{index + 1}. {stage.id}</h3>
              <span className="rounded-full bg-white/70 px-3 py-1 text-xs">
                {stage.blocksBuild ? '阻断构建' : '非阻断'}
              </span>
            </div>
            <code className="mt-3 block overflow-x-auto rounded-xl bg-ink/5 px-3 py-2 text-sm">{stage.command}</code>
          </article>
        ))}
      </div>
    </section>
  )
}
