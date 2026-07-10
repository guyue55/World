import { WorldFallbackScene } from '@/components/world/WorldFallbackScene'

export default function ForbiddenPage() {
  return (
    <WorldFallbackScene
      eyebrow="私密门"
      title="这扇门只为特定的人打开。"
      description="公开世界不是完整世界。家庭、保险箱、私密档案与内部工作台默认被守门，前端只体现边界，实际访问由服务端路由拦截。"
      sceneLabel="Permission · 服务端守门"
      primaryAction={{ href: '/atlas', label: '返回外庭' }}
      actions={[
        { href: '/archive', label: '查看公开内容' },
        { href: '/ask', label: '询问灯塔' },
      ]}
    />
  )
}
