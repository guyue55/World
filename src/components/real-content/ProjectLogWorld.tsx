import { projectLogs } from '@/features/real-content-v5'

export function ProjectLogWorld() {
  return (
    <section className="rounded-[3rem] border border-white/50 bg-ink p-6 text-white shadow-soft md:p-8">
      <p className="text-xs tracking-[0.34em] text-white/45">PROJECT LOGS</p>
      <h2 className="mt-3 text-3xl font-semibold">项目记录成为世界建造日志</h2>
      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {projectLogs.map((log) => (
          <article key={log.id} className="rounded-[2rem] border border-white/15 bg-white/10 p-5">
            <p className="text-xs tracking-[0.28em] text-white/45">linked: {log.linkedContentId}</p>
            <h3 className="mt-3 text-xl font-semibold">{log.title}</h3>
            <p className="mt-3 text-sm leading-6 text-white/62">问题：{log.problem}</p>
            <p className="mt-2 text-sm leading-6 text-white/62">决策：{log.decision}</p>
            <p className="mt-2 text-sm leading-6 text-white/62">结果：{log.outcome}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
