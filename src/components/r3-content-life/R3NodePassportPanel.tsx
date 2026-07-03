
import { r3WorldNodes } from '@/features/r3-content-life'

export function R3NodePassportPanel() {
  const node = r3WorldNodes.find((item) => item.id === 'world-generator-pipeline') ?? r3WorldNodes[0]
  return (
    <section className="rounded-[2rem] border border-amber-100 bg-amber-50 p-6 shadow-sm">
      <p className="text-sm font-medium uppercase tracking-[0.3em] text-amber-700">Node Passport</p>
      <h2 className="mt-2 text-3xl font-semibold text-slate-950">节点护照样例</h2>
      <div className="mt-6 rounded-3xl border border-amber-100 bg-white p-6">
        <h3 className="text-2xl font-semibold text-slate-950">{node.worldTitle}</h3>
        <p className="mt-1 text-slate-500">现实标题：{node.title}</p>
        <dl className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div><dt className="text-sm text-slate-500">位置</dt><dd className="font-medium text-slate-900">{node.area}</dd></div>
          <div><dt className="text-sm text-slate-500">生命阶段</dt><dd className="font-medium text-slate-900">{node.lifeStage}</dd></div>
          <div><dt className="text-sm text-slate-500">权限</dt><dd className="font-medium text-slate-900">{node.visibility}</dd></div>
          <div><dt className="text-sm text-slate-500">来源</dt><dd className="font-medium text-slate-900">{node.source}</dd></div>
        </dl>
        <p className="mt-6 text-slate-700">{node.summary}</p>
        <p className="mt-4 rounded-2xl bg-slate-950 p-4 text-sm text-white">下一步动作：{node.nextAction}</p>
      </div>
    </section>
  )
}
