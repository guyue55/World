import Link from 'next/link'

export function NodeReadingActions() {
  return (
    <div className="flex flex-wrap gap-3">
      <Link className="rounded-full border border-ink/10 bg-white/50 px-5 py-3 transition hover:bg-white" href="/atlas">返回地图</Link>
      <Link className="rounded-full border border-ink/10 bg-white/50 px-5 py-3 transition hover:bg-white" href="/archive">打开档案馆</Link>
      <Link className="rounded-full border border-ink/10 bg-white/50 px-5 py-3 transition hover:bg-white" href="/paths">选择路径</Link>
    </div>
  )
}
