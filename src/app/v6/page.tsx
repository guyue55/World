import { ResponsivePageShell } from '@/components/layout/ResponsivePageShell'
import { V6StatusCard } from '@/components/v6/V6StatusCard'

export default function Page() {
  return (
    <ResponsivePageShell>
      <section className="rounded-world border border-ink/10 bg-white/50 p-8 shadow-soft">
        <p className="text-sm tracking-[0.35em] text-moss">V6 WORLD NETWORK</p>
        <h1 className="mt-4 text-4xl font-semibold md:text-6xl">多世界网络 / 个人文明操作系统</h1>
        <p className="mt-5 max-w-3xl leading-8 text-ink/70">V6 聚合多世界网络、个人文明 OS、Agent Society、长期记忆图谱、共享宇宙和开放世界协议。</p>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <V6StatusCard title="STATUS" value="V6" description="多世界网络与个人文明 OS" />
          <V6StatusCard title="BOUNDARY" value="GOVERNED" description="世界、Agent、协议均受权限治理" />
          <V6StatusCard title="PROD" value="FALSE" description="生产上线需外部部署和人工签收" />
        </div>
      </section>
    </ResponsivePageShell>
  )
}
