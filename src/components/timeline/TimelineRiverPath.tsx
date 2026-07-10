import type { TimelineAnchorView } from '@/lib/scenes/build-timeline-model'
import styles from './TimelineRiverStage.module.css'

export function TimelineRiverPath({ anchors, activeAnchorId }: { anchors: TimelineAnchorView[]; activeAnchorId: string }) {
  const points = anchors.map((anchor) => `${anchor.x},${anchor.y}`).join(' ')
  const mobilePoints = anchors.map((anchor) => `${anchor.mobileX},${anchor.mobileY}`).join(' ')
  return (
    <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
      <defs>
        <filter id="time-river-glow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="0.7" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>
      <g className={styles.riverDesktop}>
        <polyline points={points} fill="none" stroke="rgba(240,201,121,0.28)" strokeWidth="1.7" vectorEffect="non-scaling-stroke" filter="url(#time-river-glow)" />
        <polyline points={points} fill="none" stroke="rgba(215,235,236,0.76)" strokeWidth="0.22" strokeDasharray="1.2 1.1" vectorEffect="non-scaling-stroke" />
      </g>
      <g className={styles.riverMobile}>
        <polyline points={mobilePoints} fill="none" stroke="rgba(240,201,121,0.28)" strokeWidth="1.7" vectorEffect="non-scaling-stroke" filter="url(#time-river-glow)" />
        <polyline points={mobilePoints} fill="none" stroke="rgba(215,235,236,0.76)" strokeWidth="0.22" strokeDasharray="1.2 1.1" vectorEffect="non-scaling-stroke" />
      </g>
      {anchors.map((anchor) => <g key={anchor.id}>
        <g className={styles.riverDesktop} opacity={anchor.id === activeAnchorId ? 1 : 0.46}>
          <circle cx={anchor.x} cy={anchor.y} r={anchor.id === activeAnchorId ? 3.1 : 1.8} fill="rgba(5,18,24,0.8)" stroke="#f0c979" strokeWidth="0.18" />
          <circle cx={anchor.x} cy={anchor.y} r={anchor.id === activeAnchorId ? 5.2 : 3} fill="none" stroke="#d8b875" strokeWidth="0.1" strokeDasharray="0.7 0.8" />
        </g>
        <g className={styles.riverMobile} opacity={anchor.id === activeAnchorId ? 1 : 0.46}>
          <circle cx={anchor.mobileX} cy={anchor.mobileY} r={anchor.id === activeAnchorId ? 3.1 : 1.8} fill="rgba(5,18,24,0.8)" stroke="#f0c979" strokeWidth="0.18" />
          <circle cx={anchor.mobileX} cy={anchor.mobileY} r={anchor.id === activeAnchorId ? 5.2 : 3} fill="none" stroke="#d8b875" strokeWidth="0.1" strokeDasharray="0.7 0.8" />
        </g>
      </g>)}
    </svg>
  )
}
