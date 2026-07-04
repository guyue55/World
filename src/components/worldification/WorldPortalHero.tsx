import { worldZones } from '@/features/worldification-v4'

export function WorldPortalHero() {
  const primary = worldZones.slice(0, 4)
  return (
    <section className="relative overflow-hidden rounded-[3rem] border border-white/50 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.95),rgba(218,231,218,0.78)_42%,rgba(17,24,23,0.92))] p-8 shadow-soft md:p-12">
      <div className="absolute right-8 top-8 h-36 w-36 rounded-full border border-white/30 bg-white/20 blur-sm" />
      <p className="text-sm tracking-[0.48em] text-moss">GUYUE FLOATING ISLANDS</p>
      <h1 className="mt-4 max-w-4xl text-5xl font-semibold leading-tight text-ink md:text-7xl">进入古月浮屿，而不是打开一页博客</h1>
      <p className="mt-6 max-w-3xl text-base leading-8 text-ink/70">这里是文章、项目、记忆、路径、主题展览和 AI 灯塔共同组成的个人数字世界。V4 的目标，是让第一眼就不像普通博客。</p>
      <div className="mt-8 grid gap-3 md:grid-cols-4">
        {primary.map((zone) => (
          <a key={zone.id} href={zone.route} className="rounded-[2rem] border border-white/50 bg-white/70 p-4 text-sm shadow-soft transition hover:-translate-y-1">
            <span className="text-xs tracking-[0.24em] text-moss">{zone.kind}</span>
            <strong className="mt-2 block text-lg">{zone.title}</strong>
            <span className="mt-2 block leading-6 text-ink/60">{zone.visualCue}</span>
          </a>
        ))}
      </div>
    </section>
  )
}
