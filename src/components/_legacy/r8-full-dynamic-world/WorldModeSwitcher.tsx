'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { getAllAreas } from '@/lib/areas'
import { getPublicNodes } from '@/lib/nodes'

type Mode = 'world' | 'real' | 'archive'

const modeCopy: Record<Mode, { title: string; description: string }> = {
  world: {
    title: '世界模式',
    description: '用星屿、河流、纸页、灯塔和路径理解内容，适合漫游和沉浸。',
  },
  real: {
    title: '现实模式',
    description: '用区域、类型、时间、权限和索引理解内容，适合快速查找。',
  },
  archive: {
    title: '档案模式',
    description: '把世界压缩成可迁移、可回望、可导出的稳定资产。',
  },
}

export function WorldModeSwitcher() {
  const [mode, setMode] = useState<Mode>('world')
  const areas = useMemo(() => getAllAreas().slice(0, 7), [])
  const nodes = useMemo(() => getPublicNodes().slice(0, 12), [])

  return (
    <section className="rounded-[2.8rem] border border-white/65 bg-white/78 p-6 shadow-soft backdrop-blur md:p-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs font-semibold tracking-[0.36em] text-moss">WORLD / SYSTEM / ARCHIVE</p>
          <h2 className="mt-3 text-3xl font-semibold text-ink md:text-4xl">同一个宇宙，三种使用方式。</h2>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-ink/62">想探索时是世界；想查找时是系统；想长期保存时是档案。动态不是只在前台，而是把三层真相统一到一个运行面板。</p>
        </div>
        <div className="flex gap-2 rounded-full bg-sand/65 p-1">
          {(['world', 'real', 'archive'] as const).map((item) => (
            <button key={item} type="button" onClick={() => setMode(item)} className={`rounded-full px-4 py-2 text-xs font-semibold transition ${mode === item ? 'bg-ink text-white' : 'text-ink/55 hover:bg-white/70'}`}>
              {modeCopy[item].title}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[22rem_minmax(0,1fr)]">
        <motion.div layout className="rounded-[2rem] border border-white/60 bg-sand/55 p-6">
          <p className="text-xs font-semibold tracking-[0.3em] text-ink/40">ACTIVE MODE</p>
          <h3 className="mt-3 text-3xl font-semibold text-ink">{modeCopy[mode].title}</h3>
          <p className="mt-4 text-sm leading-7 text-ink/62">{modeCopy[mode].description}</p>
          <div className="mt-6 grid grid-cols-3 gap-2 text-center text-xs text-ink/55">
            <div className="rounded-2xl bg-white/65 p-3"><b className="block text-lg text-ink">{areas.length}</b>主干</div>
            <div className="rounded-2xl bg-white/65 p-3"><b className="block text-lg text-ink">{nodes.length}</b>节点</div>
            <div className="rounded-2xl bg-white/65 p-3"><b className="block text-lg text-ink">3</b>模式</div>
          </div>
        </motion.div>

        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {(mode === 'world' ? areas : nodes).slice(0, 9).map((item, index) => {
            const title = 'worldName' in item ? item.worldName : item.worldTitle ?? item.title
            const subtitle = 'realName' in item ? item.realName : `${item.type} · ${item.lifeStage}`
            const href = 'slug' in item ? `/node/${item.slug}` : '/atlas'
            return (
              <Link key={'id' in item ? item.id : title} href={href} className="group rounded-[1.6rem] border border-white/60 bg-white/62 p-4 transition hover:-translate-y-0.5 hover:bg-white">
                <motion.span className="mb-3 block h-2 w-16 rounded-full bg-gold/45" animate={{ width: `${48 + index * 6}px` }} />
                <span className="block text-sm font-semibold text-ink">{title}</span>
                <span className="mt-1 block text-xs leading-5 text-ink/45">{subtitle}</span>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
