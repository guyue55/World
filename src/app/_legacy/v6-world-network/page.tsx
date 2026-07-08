import Link from 'next/link'
import { ResponsivePageShell } from '@/components/_legacy/layout/ResponsivePageShell'
import { worldNetworkNodes } from '@/features/_legacy/experience-realization'

export default function V6WorldNetworkPage() {
  return (
    <ResponsivePageShell>
      <section className="rounded-[3rem] border border-white/50 bg-ink p-8 text-white shadow-soft md:p-12">
        <p className="text-sm tracking-[0.42em] text-white/60">V6 WORLD NETWORK</p>
        <h1 className="mt-4 text-4xl font-semibold md:text-6xl">多世界网络</h1>
        <p className="mt-5 max-w-3xl leading-8 text-white/70">
          多个世界可以连接、发现、订阅，但私密世界只产生脱敏信号，不能复制原文。
        </p>
      </section>
      <section className="mt-8 grid gap-4 md:grid-cols-4">
        {worldNetworkNodes.map((world) => (
          <article key={world.kind} className="rounded-[2rem] border border-white/50 bg-white/70 p-5 shadow-soft">
            <p className="text-xs tracking-[0.3em] text-moss">{world.kind}</p>
            <h2 className="mt-3 text-2xl font-semibold">{world.name}</h2>
            <p className="mt-3 text-sm leading-6 text-ink/65">{world.description}</p>
          </article>
        ))}
      </section>
      <section className="mt-8 rounded-[2rem] border border-moss/20 bg-moss/10 p-6">
        <h2 className="text-2xl font-semibold">开放协议入口</h2>
        <p className="mt-3 leading-7 text-ink/65">世界可导出、可迁移、可互操作，但能力描述必须受权限控制。</p>
        <Link href="/v6-open-protocol" className="mt-4 inline-flex rounded-full bg-ink px-5 py-3 text-sm text-white">查看开放协议 →</Link>
      </section>
    </ResponsivePageShell>
  )
}
