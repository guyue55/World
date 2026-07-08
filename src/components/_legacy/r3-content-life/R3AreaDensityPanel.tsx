
import { r3AreaDensity } from '@/features/_legacy/r3-content-life'

export function R3AreaDensityPanel() {
  return (
    <section className="rounded-[2rem] border border-emerald-100 bg-emerald-50/80 p-6 shadow-sm">
      <p className="text-sm font-medium uppercase tracking-[0.3em] text-emerald-700">World Density</p>
      <h2 className="mt-2 text-3xl font-semibold text-slate-950">区域密度与维护方向</h2>
      <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {r3AreaDensity.map((area) => (
          <article key={area.id} className="rounded-3xl border border-emerald-100 bg-white p-5">
            <h3 className="text-lg font-semibold text-slate-950">{area.worldName}</h3>
            <p className="mt-1 text-sm text-slate-500">{area.realName}</p>
            <div className="mt-4 grid grid-cols-3 gap-2 text-center text-sm">
              <span className="rounded-2xl bg-emerald-50 p-3"><strong className="block text-lg text-emerald-800">{area.nodeCount}</strong>节点</span>
              <span className="rounded-2xl bg-emerald-50 p-3"><strong className="block text-lg text-emerald-800">{area.averageMaturity}%</strong>成熟</span>
              <span className="rounded-2xl bg-emerald-50 p-3"><strong className="block text-lg text-emerald-800">{area.density}</strong>密度</span>
            </div>
            <p className="mt-4 text-sm text-slate-600">下一步：{area.nextMaintenance}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
