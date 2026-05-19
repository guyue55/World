import { getAllAreaCoordinates } from '@/lib/spatial'

export function SpatialProtocolPanel() {
  const coordinates = getAllAreaCoordinates()

  return (
    <section className="rounded-world border border-ink/10 bg-white/45 p-6 shadow-soft">
      <p className="text-sm tracking-[0.35em] text-moss">SPATIAL PROTOCOL</p>
      <h2 className="mt-3 text-3xl font-semibold">空间坐标协议</h2>
      <p className="mt-3 leading-8 text-ink/70">
        V1 不做 3D，但先固定空间协议。未来地图、星图、2.5D 和 WebXR 都从这里投影。
      </p>

      <div className="mt-6 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        {coordinates.map((item) => (
          <article key={item.areaId} className="rounded-2xl border border-ink/10 bg-paper/60 p-4">
            <h3 className="font-semibold">{item.areaId}</h3>
            <p className="mt-2 text-sm text-ink/60">x: {item.x} / y: {item.y}</p>
            <p className="text-sm text-ink/60">depth: {item.depth}</p>
            <p className="text-sm text-ink/60">zone: {item.zone}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
