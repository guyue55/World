import { ArrowRight } from 'lucide-react'
import { SceneObjectButton } from './SceneObjectButton'

export type WorldExit = {
  href: string
  label: string
  description?: string
}

export function WorldExitRail({ exits, label = '前往其他空间' }: { exits: WorldExit[]; label?: string }) {
  return (
    <nav aria-label={label} className="flex flex-wrap items-center gap-2" data-world-exit-rail>
      {exits.map((exit) => (
        <SceneObjectButton key={exit.href} href={exit.href} label={exit.description ? `${exit.label}：${exit.description}` : exit.label} icon={<ArrowRight aria-hidden="true" size={16} />}>
          {exit.label}
        </SceneObjectButton>
      ))}
    </nav>
  )
}
