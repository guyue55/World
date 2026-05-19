import { getAllPaths } from '@/lib/paths'
import { PathCard } from '@/components/paths/PathCard'
import { createPageMetadata } from '@/lib/metadata'

export const metadata = createPageMetadata({
  title: '精选路径',
  description: '为不同旅人准备的古月浮屿探索路线。',
  path: '/paths',
})

export default function PathsPage() {
  const paths = getAllPaths()

  return (
    <main className="world-container space-y-10 py-16">
      <header className="max-w-3xl space-y-4">
        <p className="text-sm tracking-[0.35em] text-moss">PATHS</p>
        <h1 className="text-5xl font-semibold">精选路径</h1>
        <p className="leading-8 text-ink/70">
          路径不是分类，而是为不同旅人准备的行走路线。
        </p>
      </header>
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {paths.map((path) => <PathCard key={path.id} path={path} />)}
      </section>
    </main>
  )
}
