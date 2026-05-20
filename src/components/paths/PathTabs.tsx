import type { Path } from '@/lib/types'
import { AccessibleTabs } from '@/components/interaction/AccessibleTabs'
import { PathCard } from '@/components/paths/PathCard'

export function PathTabs({ paths }: { paths: Path[] }) {
  const audiences = Array.from(new Set(paths.map((path) => path.audience)))

  return (
    <AccessibleTabs
      label="路径人群筛选"
      items={audiences.map((audience) => {
        const filtered = paths.filter((path) => path.audience === audience)

        return {
          id: audience,
          label: audience,
          panel: (
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {filtered.map((path) => <PathCard key={path.id} path={path} />)}
            </div>
          ),
        }
      })}
    />
  )
}
