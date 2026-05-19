import { createPageMetadata } from '@/lib/metadata'

export const metadata = createPageMetadata({
  title: '世界宣言',
  description: '古月浮屿的世界法则：AI 是灯塔，不是太阳；公开层不是完整世界。',
  path: '/manifesto',
})

const rules = [
  'AI 是灯塔，不是太阳。',
  '公开层不是完整世界。',
  '入口清澈，深处浩瀚。',
  '世界为生活服务，不让生活服务世界。',
  '数据可导出，世界可迁移。',
]

export default function ManifestoPage() {
  return (
    <main className="reading-container space-y-10 py-16">
      <header className="space-y-4">
        <p className="text-sm tracking-[0.35em] text-moss">MANIFESTO</p>
        <h1 className="text-5xl font-semibold">世界宣言</h1>
        <p className="text-lg leading-9 text-ink/75">
          古月浮屿所说的数字宇宙，不是公共多人 3D 元宇宙，也不是虚拟经济空间。
          它是一个个人数字世界。
        </p>
      </header>

      <section className="grid gap-4">
        {rules.map((rule) => (
          <div key={rule} className="rounded-world border border-ink/10 bg-white/45 p-6 text-xl font-medium shadow-soft">
            {rule}
          </div>
        ))}
      </section>

      <section className="prose prose-neutral max-w-none leading-8">
        <p>
          以内容为星体，以区域为空间，以关系为星线，以时间为河流，
          以权限为边界，以规则为自然法则，以 AI 为灯塔，以导出和传承为未来根系。
        </p>
      </section>
    </main>
  )
}
