import Link from 'next/link'
import { getHomepageRhythm } from '@/lib/homepage'
import { SectionHeader } from '@/components/layout/SectionHeader'

export function HomeWorldRhythm() {
  const rhythm = getHomepageRhythm()

  return (
    <section className="space-y-6">
      <SectionHeader
        eyebrow="WORLD RHYTHM"
        title="这个世界不只有技术，也有生活、记忆和未来"
        description="古月浮屿的世界感来自多种真实内容的长期共生。"
      />
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {rhythm.map((item) => (
          <Link key={item.id} href={item.href} className="rounded-world border border-ink/10 bg-white/40 p-5 transition hover:-translate-y-1 hover:bg-white/70">
            <p className="text-sm tracking-[0.25em] text-moss">{item.id.toUpperCase()}</p>
            <h3 className="mt-3 text-xl font-semibold">{item.title}</h3>
            <p className="mt-3 leading-7 text-ink/65">{item.description}</p>
          </Link>
        ))}
      </div>
    </section>
  )
}
