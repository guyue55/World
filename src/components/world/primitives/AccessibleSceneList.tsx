import Link from 'next/link'

export type AccessibleSceneItem = {
  id: string
  href: string
  title: string
  description?: string
}

export function AccessibleSceneList({ title, items, className = '' }: { title: string; items: AccessibleSceneItem[]; className?: string }) {
  return (
    <section className={className} data-accessible-scene-list aria-labelledby="accessible-scene-list-title">
      <h2 id="accessible-scene-list-title" className="world-scene-title text-2xl">{title}</h2>
      <ul className="mt-4 divide-y divide-current/15 border-y border-current/15">
        {items.map((item) => (
          <li key={item.id}>
            <Link href={item.href} className="block min-h-11 py-3 focus-visible:outline">
              <span className="font-medium">{item.title}</span>
              {item.description ? <span className="mt-1 block text-sm opacity-70">{item.description}</span> : null}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}
