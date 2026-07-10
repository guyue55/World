import { Check, LockKeyhole } from 'lucide-react'
import type { JourneyStepView } from '@/lib/scenes/build-path-model'

export type JourneyWaypointStatus = 'walked' | 'current' | 'reachable' | 'unreached'

export function JourneyWaypoint({ step, status, onSelect }: { step: JourneyStepView; status: JourneyWaypointStatus; onSelect: () => void }) {
  const disabled = status === 'unreached'
  return (
    <button
      type="button"
      className="journey-waypoint"
      style={{ '--waypoint-x': `${step.x}%`, '--waypoint-y': `${step.y}%`, '--waypoint-mobile-y': `${step.mobileY}%` } as React.CSSProperties}
      data-status={status}
      data-path-step={step.index}
      disabled={disabled}
      onClick={onSelect}
      aria-label={`${step.index + 1}. ${step.title}，${status === 'walked' ? '已走过' : status === 'current' ? '当前位置' : status === 'reachable' ? '可以前往' : '尚未抵达'}`}
    >
      <span aria-hidden="true">{status === 'walked' ? <Check size={14} /> : status === 'unreached' ? <LockKeyhole size={12} /> : step.index + 1}</span>
      <strong>{step.title}</strong>
      <small>{step.areaTitle}</small>
    </button>
  )
}
