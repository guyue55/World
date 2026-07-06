'use client'

import Link from 'next/link'

export default function ErrorPage({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <main className="world-container flex min-h-[70vh] items-center py-16">
      <section className="max-w-2xl rounded-world border border-ink/10 bg-white/45 p-8 shadow-soft">
        <p className="text-sm tracking-[0.35em] text-moss">世界修复</p>
        <h1 className="mt-4 text-5xl font-semibold">星图暂时没有展开。</h1>
        <p className="mt-6 leading-8 text-ink/70">请稍后重试，或先前往档案馆。</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <button onClick={reset} className="rounded-full bg-ink px-5 py-3 text-paper">重新展开</button>
          <Link href="/archive" className="rounded-full border border-ink/10 bg-white/60 px-5 py-3">打开档案馆</Link>
        </div>
      </section>
    </main>
  )
}
