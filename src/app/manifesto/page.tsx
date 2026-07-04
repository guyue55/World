import Link from 'next/link'
import { createPageMetadata } from '@/lib/metadata'

export const metadata = createPageMetadata({
  title: '世界宣言',
  description: '古月浮屿的世界法则、公开边界与协作原则。',
  path: '/manifesto',
})

const rules = [
  '入口清澈，深处浩瀚。',
  '公开层不是完整世界。',
  '世界为生活服务，不让生活服务世界。',
  '数据可导出，世界可迁移。',
  '辅助系统只能照亮道路，不能替代选择。',
]

const paths = [
  { href: '/atlas', label: '打开世界地图' },
  { href: '/archive', label: '查看档案索引' },
  { href: '/ask', label: '前往灯塔导览' },
]

export default function ManifestoPage() {
  return (
    <main className="reading-container space-y-10 py-16">
      <header className="space-y-4">
        <p className="text-sm tracking-[0.35em] text-moss">MANIFESTO</p>
        <h1 className="text-5xl font-semibold">世界宣言</h1>
        <p className="text-lg leading-9 text-ink/75">
          古月浮屿是一个个人数字世界。它用内容、区域、关系、时间、权限和规则安放技术、产品、灵感、生活与记忆。
        </p>
      </header>

      <section className="grid gap-4">
        {rules.map((rule) => (
          <div key={rule} className="rounded-world border border-ink/10 bg-white/55 p-6 text-xl font-medium shadow-soft">
            {rule}
          </div>
        ))}
      </section>

      <section className="prose prose-neutral max-w-none leading-8">
        <p>这个世界的目标不是展示全部，而是让值得保存的东西都能在时间中找到自己的形态。</p>
      </section>

      <nav className="flex flex-wrap gap-3" aria-label="世界宣言后续路径">
        {paths.map((path) => (
          <Link key={path.href} href={path.href} className="rounded-full border border-ink/10 bg-white/60 px-4 py-2 text-sm text-ink/70 transition hover:bg-white">
            {path.label}
          </Link>
        ))}
      </nav>
    </main>
  )
}
