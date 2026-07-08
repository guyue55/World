'use client'

// 世界运行时氛围层：抽离自 WorldRuntimeProvider 的装饰性 Framer 动效背景。
import { motion } from 'framer-motion'
import { useWorldRuntime } from './WorldRuntimeProvider'

const projectionLines = [
  { id: 'atlas', left: '7%', top: '18%', width: '38vw', rotate: '-10deg', delay: 0 },
  { id: 'timeline', left: '52%', top: '23%', width: '34vw', rotate: '16deg', delay: 0.8 },
  { id: 'archive', left: '12%', top: '68%', width: '30vw', rotate: '9deg', delay: 1.4 },
  { id: 'path', left: '46%', top: '73%', width: '42vw', rotate: '-13deg', delay: 0.4 },
]

const runtimeNodes = [
  { id: '入口', left: '14%', top: '23%', delay: 0 },
  { id: '地图', left: '39%', top: '17%', delay: 0.6 },
  { id: '时间', left: '69%', top: '29%', delay: 1.1 },
  { id: '档案', left: '25%', top: '72%', delay: 1.7 },
  { id: '灯塔', left: '78%', top: '68%', delay: 2.2 },
]

export function RuntimeAtmosphere() {
  const runtime = useWorldRuntime()
  const shouldMove = !runtime.reducedMotion && !runtime.compactMotion
  const activeProjectionLines = runtime.compactMotion ? projectionLines.slice(0, 2) : projectionLines
  const activeRuntimeNodes = runtime.compactMotion ? runtimeNodes.slice(0, 3) : runtimeNodes

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(115deg,rgba(247,241,230,0.72),rgba(216,226,208,0.38)_46%,rgba(125,154,162,0.20))]" />
      <motion.div
        className="absolute left-1/2 top-[8%] h-[42rem] w-[42rem] -translate-x-1/2 rounded-full border border-ink/8"
        animate={shouldMove ? { rotate: 360, scale: [1, 1.025, 1] } : undefined}
        transition={{ rotate: { duration: 80, repeat: Infinity, ease: 'linear' }, scale: { duration: 12, repeat: Infinity, ease: 'easeInOut' } }}
      />
      <motion.div
        className="absolute left-1/2 top-[13%] h-[28rem] w-[28rem] -translate-x-1/2 rounded-full border border-lake/20"
        animate={shouldMove ? { rotate: -360 } : undefined}
        transition={{ duration: 64, repeat: Infinity, ease: 'linear' }}
      />
      <div className="absolute inset-0 opacity-[0.16] [background-image:linear-gradient(rgba(37,48,42,0.18)_1px,transparent_1px),linear-gradient(90deg,rgba(37,48,42,0.14)_1px,transparent_1px)] [background-size:88px_88px]" />
      {activeProjectionLines.map((line) => (
        <motion.span
          key={line.id}
          className="absolute h-px origin-left bg-gradient-to-r from-transparent via-ink/20 to-transparent"
          style={{ left: line.left, top: line.top, width: line.width, rotate: line.rotate }}
          animate={shouldMove ? { opacity: [0.18, 0.72, 0.18], x: [0, 18, 0] } : undefined}
          transition={{ duration: 8, delay: line.delay, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}
      {activeRuntimeNodes.map((node) => (
        <motion.span
          key={node.id}
          className="absolute flex h-12 w-12 items-center justify-center rounded-[1rem] border border-white/65 bg-paper/35 text-[10px] font-semibold text-ink/46 shadow-[0_16px_40px_rgba(37,48,42,0.08)] backdrop-blur-md"
          style={{ left: node.left, top: node.top }}
          animate={shouldMove ? { opacity: [0.42, 0.88, 0.42], y: [0, -10, 0] } : undefined}
          transition={{ duration: 7, delay: node.delay, repeat: Infinity, ease: 'easeInOut' }}
        >
          {node.id}
        </motion.span>
      ))}
      <motion.div
        className="absolute bottom-[8%] left-[-12%] h-28 w-[130%] border-y border-white/45 bg-white/12 backdrop-blur-[2px]"
        animate={shouldMove ? { x: ['-4%', '4%', '-4%'] } : undefined}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        style={{ transform: 'rotate(-4deg)' }}
      />
    </div>
  )
}
