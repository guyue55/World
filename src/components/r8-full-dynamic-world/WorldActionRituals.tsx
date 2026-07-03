'use client'

import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { useWorldRuntime } from '@/components/r8-dynamic-world'
import actionsJson from '../../../data/r8-full-dynamic-world/dynamic-actions.json'

type Action = { id: string; label: string; worldEffect: string }

export function WorldActionRituals() {
  const actions = actionsJson.actions as Action[]
  const { reducedMotion } = useWorldRuntime()
  const [active, setActive] = useState(actions[0])
  const particles = useMemo(() => Array.from({ length: 10 }, (_, index) => index), [])

  return (
    <section className="overflow-hidden rounded-[2.8rem] border border-white/65 bg-ink p-6 text-white shadow-soft md:p-8">
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_24rem] lg:items-center">
        <div>
          <p className="text-xs font-semibold tracking-[0.36em] text-white/45">ACTION RITUALS</p>
          <h2 className="mt-3 text-3xl font-semibold md:text-5xl">每一次操作，都像世界里的一个动作。</h2>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-white/62">阅读是展开卷轴，搜索是点亮罗盘，归档是送入档案馆，AI 整理是灯塔照亮星线。这里把动作反馈做成前端可感知的仪式。</p>
          <div className="mt-7 flex flex-wrap gap-2">
            {actions.map((action) => (
              <button key={action.id} type="button" onClick={() => setActive(action)} className={`rounded-full px-4 py-2 text-xs font-semibold transition ${active.id === action.id ? 'bg-white text-ink' : 'bg-white/10 text-white/70 hover:bg-white/18'}`}>
                {action.label}
              </button>
            ))}
          </div>
        </div>
        <div className="relative min-h-[18rem] rounded-[2rem] border border-white/15 bg-white/8 p-6">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(255,255,255,0.16),transparent_60%)]" />
          {particles.map((particle) => (
            <motion.span
              key={particle}
              className="absolute h-2 w-2 rounded-full bg-white/55"
              style={{ left: `${12 + (particle * 17) % 78}%`, top: `${14 + (particle * 23) % 70}%` }}
              animate={reducedMotion ? undefined : { y: [0, -20, 0], opacity: [0.2, 0.9, 0.2], scale: [0.8, 1.25, 0.8] }}
              transition={{ duration: 3.6 + particle * 0.18, repeat: Infinity, ease: 'easeInOut' }}
            />
          ))}
          <div className="relative z-10 flex h-full min-h-[14rem] flex-col justify-end">
            <p className="text-sm font-semibold text-white">{active.label}</p>
            <p className="mt-3 text-sm leading-7 text-white/68">{active.worldEffect}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
