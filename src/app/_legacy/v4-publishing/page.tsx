import { ResponsivePageShell } from '@/components/_legacy/layout/ResponsivePageShell'

export default function Page() {
  return (
    <ResponsivePageShell>
      <section className="rounded-world border border-ink/10 bg-white/50 p-8 shadow-soft">
        <p className="text-sm tracking-[0.35em] text-moss">V4</p>
        <h1 className="mt-4 text-4xl font-semibold md:text-6xl">发布网络</h1>
        <p className="mt-5 max-w-3xl leading-8 text-ink/70">世界协议、多渠道发布、内容分发、版本治理和回滚。</p>
        <p className="mt-6 rounded-2xl bg-paper/70 p-4 text-sm text-ink/60">
          当前为 V4 结构完成态页面入口，不代表 production-ready。
        </p>
      </section>
    </ResponsivePageShell>
  )
}
