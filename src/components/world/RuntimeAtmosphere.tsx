'use client'

// 世界运行时底色只负责无脚本可见的环境兜底；场景动态由各舞台自行管理。
import { useEffect, useMemo } from 'react'
import { getAmbientEnvironmentState } from '@/lib/ambient-environment'
import { useWorldRuntime } from './WorldRuntimeProvider'

const projectionLines = [
  { id: 'atlas', left: '7%', top: '18%', width: '38vw', rotate: '-10deg' },
  { id: 'timeline', left: '52%', top: '23%', width: '34vw', rotate: '16deg' },
  { id: 'archive', left: '12%', top: '68%', width: '30vw', rotate: '9deg' },
  { id: 'path', left: '46%', top: '73%', width: '42vw', rotate: '-13deg' },
]

const runtimeNodePositions = [
  { id: 'scene-0', left: '14%', top: '23%' },
  { id: 'scene-1', left: '39%', top: '17%' },
  { id: 'scene-2', left: '69%', top: '29%' },
  { id: 'season', left: '25%', top: '72%' },
  { id: 'beacon', left: '78%', top: '68%' },
]

export function RuntimeAtmosphere() {
  const runtime = useWorldRuntime()
  const environment = useMemo(
    () => getAmbientEnvironmentState({
      dayPeriod: runtime.dayPeriod,
      season: runtime.season,
      sceneId: runtime.currentScene,
      aiStatus: runtime.aiStatus,
    }),
    [runtime.aiStatus, runtime.currentScene, runtime.dayPeriod, runtime.season]
  )
  const activeProjectionLines = runtime.compactMotion ? projectionLines.slice(0, 2) : projectionLines
  const runtimeNodeLabels = [
    ...environment.objectLabels,
    environment.seasonal.nodeLabel,
    environment.ai.label,
  ]
  const activeRuntimeNodes = runtime.compactMotion ? runtimeNodePositions.slice(0, 3) : runtimeNodePositions

  useEffect(() => {
    const root = document.documentElement
    root.dataset.worldDayPeriod = environment.dayPeriod
    root.dataset.worldSeason = environment.season
    return () => {
      delete root.dataset.worldDayPeriod
      delete root.dataset.worldSeason
    }
  }, [environment.dayPeriod, environment.season])

  return (
    <div
      aria-hidden="true"
      data-testid="ambient-environment-v2"
      data-day-period={environment.dayPeriod}
      data-season={environment.season}
      data-current-scene={environment.sceneId}
      data-ai-status={environment.aiStatus}
      data-motion-mode={runtime.motionMode}
      data-sensory-mode={runtime.sensoryMode}
      data-reduced-motion={runtime.reducedMotion ? 'true' : 'false'}
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      <div className="absolute inset-0" style={{ background: environment.day.background }} />
      <div
        className="absolute right-[8%] top-[12%] h-60 w-60 rounded-full blur-3xl"
        style={{ backgroundColor: environment.day.glow, opacity: environment.ai.beaconOpacity }}
      />
      <div
        className="absolute left-1/2 top-[8%] h-[42rem] w-[42rem] -translate-x-1/2 rounded-full border border-ink/8"
      />
      <div
        className="absolute left-1/2 top-[13%] h-[28rem] w-[28rem] -translate-x-1/2 rounded-full border border-lake/20"
      />
      <div
        className="absolute inset-0 [background-image:linear-gradient(rgba(37,48,42,0.18)_1px,transparent_1px),linear-gradient(90deg,rgba(37,48,42,0.14)_1px,transparent_1px)] [background-size:88px_88px]"
        style={{ opacity: environment.seasonal.textureOpacity }}
      />
      {activeProjectionLines.map((line) => (
        <span
          key={line.id}
          className="absolute h-px origin-left bg-gradient-to-r from-transparent via-ink/20 to-transparent"
          style={{ left: line.left, top: line.top, width: line.width, rotate: line.rotate }}
        />
      ))}
      {activeRuntimeNodes.map((node, index) => (
        <span
          key={node.id}
          className="absolute flex h-12 w-12 items-center justify-center rounded-[1rem] border border-white/65 bg-paper/35 text-[10px] font-semibold text-ink/46 shadow-[0_16px_40px_rgba(37,48,42,0.08)] backdrop-blur-md"
          style={{ left: node.left, top: node.top }}
        >
          {runtimeNodeLabels[index] ?? environment.scene.label}
        </span>
      ))}
      <div
        className="absolute bottom-[8%] left-[-12%] h-28 w-[130%] border-y border-white/45 bg-white/12 backdrop-blur-[2px]"
        style={{ transform: 'rotate(-4deg)' }}
      />
    </div>
  )
}
