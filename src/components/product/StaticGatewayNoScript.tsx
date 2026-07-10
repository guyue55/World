import { getImageProps } from 'next/image'
import type { GatewayViewModel } from '@/lib/scenes/build-gateway-model'

export function StaticGatewayNoScript({ model }: { model: GatewayViewModel }) {
  const { props: desktop } = getImageProps({
    src: model.asset.desktop.src,
    alt: '',
    width: model.asset.desktop.width,
    height: model.asset.desktop.height,
    sizes: '100vw',
    quality: 82,
    priority: true,
  })
  const { props: mobile } = getImageProps({
    src: model.asset.mobile.src,
    alt: '',
    width: model.asset.mobile.width,
    height: model.asset.mobile.height,
    sizes: '100vw',
    quality: 78,
    priority: true,
  })

  return (
    <section className="relative z-[60] min-h-screen overflow-hidden bg-night text-paper" aria-labelledby="static-gateway-title">
      <picture className="absolute inset-0 block h-full w-full" aria-hidden="true">
        <source media="(max-width: 767px)" srcSet={mobile.srcSet} />
        <img {...desktop} alt="" className="h-full w-full object-cover" />
      </picture>
      <div className="absolute inset-0 bg-night/45" aria-hidden="true" />
      <div className="relative flex min-h-screen flex-col justify-between p-6 md:p-12">
        <div>
          <p className="text-sm font-semibold text-gold">静态世界入口</p>
          <h1 id="static-gateway-title" className="world-scene-title mt-3 text-5xl md:text-7xl">{model.title}</h1>
          <p className="mt-3 max-w-md leading-7 text-paper/80">JavaScript 当前不可用，但世界的公开道路仍然开放。</p>
        </div>
        <nav aria-label="静态世界方向" className="grid max-w-3xl gap-2 md:grid-cols-3">
          {model.directions.map((direction) => (
            <a key={direction.sceneId} href={direction.href} className="rounded-lg border border-paper/30 bg-night/85 p-4 backdrop-blur-sm">
              <strong className="world-scene-title block text-xl">{direction.title}</strong>
              <span className="mt-1 block text-sm text-paper/68">{direction.description}</span>
            </a>
          ))}
        </nav>
      </div>
    </section>
  )
}
