import Link from 'next/link'
import { CelestialDepthScene } from './CelestialDepthScene'

export function WorldGatewayHero() {
  return (
    <section className="relative isolate overflow-hidden rounded-[3.5rem] border border-white/40 bg-[radial-gradient(circle_at_28%_18%,rgba(255,255,255,.45),transparent_26%),radial-gradient(circle_at_76%_18%,rgba(121,151,128,.36),transparent_36%),linear-gradient(135deg,#111817_0%,#23322e_48%,#f4ead8_100%)] px-6 py-16 text-white shadow-soft md:px-12 md:py-24">
      <CelestialDepthScene />
      <div className="relative z-10 max-w-5xl">
        <p className="text-sm tracking-[0.46em] text-white/70">WORD LIFE · GUYUE FLOATING WORLD</p>
        <h1 className="mt-6 max-w-4xl text-5xl font-semibold leading-[0.98] md:text-7xl lg:text-8xl">在近距离的星海里，进入自己的数据世界</h1>
        <p className="mt-8 max-w-2xl text-lg leading-9 text-white/72">这里不是普通博客，而是一座由记忆、文章、路径、时间、AI 灯塔和私密边界共同组成的个人数字宇宙。</p>
        <div className="mt-10 flex flex-wrap gap-3">
          <Link href="/world-map" className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-ink shadow-soft">打开世界地图</Link>
          <Link href="/constellation" className="rounded-full border border-white/35 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur">浏览节点星图</Link>
          <Link href="/lighthouse" className="rounded-full border border-moss/30 bg-moss/20 px-6 py-3 text-sm font-semibold text-white backdrop-blur">进入 AI 灯塔</Link>
        </div>
      </div>
    </section>
  )
}
