import { getReleaseGateContract, getReleaseGateSummary } from '@/lib/release-gate'

export function ReleaseGatePanel() {
  const contract = getReleaseGateContract()
  const summary = getReleaseGateSummary()

  return (
    <section className="rounded-world border border-ink/10 bg-white/45 p-6 shadow-soft">
      <p className="text-sm tracking-[0.35em] text-moss">RELEASE GATE</p>
      <h2 className="mt-3 text-3xl font-semibold">发布准备门禁</h2>
      <p className="mt-3 max-w-3xl leading-8 text-ink/70">
        发布准备不是宣布完成，而是把真实执行门禁放到本地与 CI 的同一条线上。
        当前门禁结构已建立，但真实本地和 CI 执行仍需要补证。
      </p>

      <div className="mt-6 grid gap-3 md:grid-cols-5">
        <div className="rounded-2xl bg-paper/70 p-4"><p className="text-sm text-ink/50">命令</p><p className="mt-2 text-2xl font-semibold">{summary.requiredCommands}</p></div>
        <div className="rounded-2xl bg-paper/70 p-4"><p className="text-sm text-ink/50">阻断源</p><p className="mt-2 text-2xl font-semibold">{summary.blockingSources}</p></div>
        <div className="rounded-2xl bg-paper/70 p-4"><p className="text-sm text-ink/50">开放阻断</p><p className="mt-2 text-2xl font-semibold">{summary.openBlockers}</p></div>
        <div className="rounded-2xl bg-paper/70 p-4"><p className="text-sm text-ink/50">本地</p><p className="mt-2 text-sm font-semibold">{summary.localStatus}</p></div>
        <div className="rounded-2xl bg-paper/70 p-4"><p className="text-sm text-ink/50">CI</p><p className="mt-2 text-sm font-semibold">{summary.ciStatus}</p></div>
      </div>

      <div className="mt-6 rounded-2xl bg-paper/70 p-5">
        <p className="text-sm text-ink/50">本地发布门禁</p>
        <code className="mt-2 block rounded-xl bg-ink/5 px-4 py-3 text-sm">{contract.localGateCommand}</code>
      </div>
    </section>
  )
}
