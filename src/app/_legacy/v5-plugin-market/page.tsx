import { ResponsivePageShell } from '@/components/layout/ResponsivePageShell'
import { V5StatusCard } from '@/components/v5/V5StatusCard'

export default function Page() {
  return (
    <ResponsivePageShell>
      <section className="rounded-world border border-ink/10 bg-white/50 p-8 shadow-soft">
        <p className="text-sm tracking-[0.35em] text-moss">V5 WORLD PLATFORM</p>
        <h1 className="mt-4 text-4xl font-semibold md:text-6xl">插件市场</h1>
        <p className="mt-5 max-w-3xl leading-8 text-ink/70">插件包、版本、审核、安装、沙箱和外部生态接入。</p>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <V5StatusCard title="STATUS" value="V5" description="本地结构与工程阶段进行中" />
          <V5StatusCard title="BOUNDARY" value="SAFE" description="Agent 与插件默认不越权" />
          <V5StatusCard title="PROD" value="FALSE" description="生产上线需外部部署和人工签收" />
        </div>
      </section>
    </ResponsivePageShell>
  )
}
