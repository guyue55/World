'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useMemo, useState } from 'react'
import { getCivilizationData, getCivilizationLayers, resolveRouteAnchor } from './types'

export function CivilizationUniverseSection() {
  const pathname = usePathname()
  const anchor = useMemo(() => resolveRouteAnchor(pathname), [pathname])
  const layers = getCivilizationLayers()
  const data = getCivilizationData()
  const [active, setActive] = useState(layers[0]?.id ?? 'nature')
  const layer = layers.find((item) => item.id === active) ?? layers[0]

  return (
    <section className="rounded-[2.6rem] border border-white/65 bg-white/86 p-6 shadow-soft backdrop-blur md:p-8">
      <div className="grid gap-8 xl:grid-cols-[0.85fr_1.15fr]">
        <div>
          <p className="text-xs font-semibold tracking-[0.36em] text-moss">R8.9 CIVILIZATION UNIVERSE</p>
          <h2 className="mt-3 text-3xl font-semibold text-ink md:text-4xl">{anchor.where}</h2>
          <p className="mt-4 leading-8 text-ink/60">{anchor.what}。这一层把宇宙感继续落到文明秩序：自然、生活、创作、工程、知识与精神同时存在，但每个对象都有现实解释、动作与边界。</p>

          <div className="mt-5 rounded-[1.6rem] bg-sand/72 p-4">
            <p className="text-sm font-semibold text-ink">七个不迷路锚点</p>
            <div className="mt-3 grid gap-2 text-xs font-semibold text-ink/56 sm:grid-cols-2">
              <span>我在哪里：{anchor.where}</span>
              <span>这里是什么：{anchor.what}</span>
              <span>谁能看到：{anchor.visibility}</span>
              <span>如何回去：世界地图 / 创世原点</span>
            </div>
          </div>
        </div>

        <div className="grid gap-4">
          <div className="grid gap-3 sm:grid-cols-3">
            {layers.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setActive(item.id)}
                className={`rounded-[1.35rem] p-4 text-left text-xs font-semibold transition ${active === item.id ? 'bg-ink text-white' : 'bg-sand/65 text-ink/54 hover:bg-white'}`}
              >
                <span className="block text-sm">{item.name}</span>
                <span className="mt-1 block opacity-70">{item.realName}</span>
              </button>
            ))}
          </div>

          <div className="rounded-[1.8rem] border border-white/70 bg-white/62 p-5">
            <p className="text-sm font-semibold text-ink">{layer.name}｜{layer.realName}</p>
            <p className="mt-2 text-sm leading-7 text-ink/58">{layer.purpose}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {layer.objects.map((object) => (
                <span key={object} className="rounded-full bg-ink/5 px-3 py-1 text-xs font-semibold text-ink/45">{object}</span>
              ))}
            </div>
          </div>

          <div className="rounded-[1.8rem] border border-white/70 bg-sand/56 p-5">
            <p className="text-sm font-semibold text-ink">当前页面可执行动作</p>
            <div className="mt-3 grid gap-2 sm:grid-cols-3">
              {anchor.do.map((action) => (
                <span key={action} className="rounded-full bg-white px-4 py-3 text-center text-xs font-semibold text-ink/58">{action}</span>
              ))}
            </div>
          </div>

          <div className="rounded-[1.8rem] border border-white/70 bg-ink p-5 text-white">
            <p className="text-sm font-semibold">今日世界提示</p>
            <p className="mt-2 text-sm leading-7 text-white/68">{data.dailyWorld.todayPrompts[0]}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {anchor.next.map((href) => (
                <Link key={href} href={href} className="rounded-full bg-white px-4 py-2 text-xs font-semibold text-ink">{href}</Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
