'use client'

import Link from 'next/link'
import { useState } from 'react'
import type { LighthousePrompt } from '@/lib/lighthouse'

export function LighthousePromptGuide({ prompts }: { prompts: LighthousePrompt[] }) {
  const [activeId, setActiveId] = useState(prompts[0]?.id)
  const active = prompts.find((prompt) => prompt.id === activeId) ?? prompts[0]

  return (
    <section className="rounded-world border border-ink/10 bg-white/45 p-6 shadow-soft">
      <p className="text-sm tracking-[0.35em] text-moss">LOW LIGHT PROMPTS</p>
      <h2 className="mt-3 text-3xl font-semibold">先问一个安全的问题</h2>
      <p className="mt-3 max-w-2xl leading-8 text-ink/70">
        这些问题不会调用远程模型，只会把你带到公开路径、地图或档案馆。
      </p>
      <div className="mt-6 grid gap-3 lg:grid-cols-[1fr_320px]">
        <div className="flex flex-wrap gap-2">
          {prompts.map((prompt) => (
            <button
              key={prompt.id}
              type="button"
              onClick={() => setActiveId(prompt.id)}
              className={`rounded-full px-4 py-2 text-sm transition ${
                active?.id === prompt.id ? 'bg-ink text-paper shadow-soft' : 'bg-white/70 text-ink/70 hover:bg-white'
              }`}
            >
              {prompt.label}
            </button>
          ))}
        </div>
        {active && (
          <div className="rounded-2xl bg-paper/75 p-5">
            <p className="text-sm text-ink/50">建议入口</p>
            <p className="mt-2 font-semibold">{active.label}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {active.tags.map((tag) => <span key={tag} className="rounded-full bg-white/70 px-2 py-1 text-xs text-ink/50">#{tag}</span>)}
            </div>
            <Link href={active.href} className="mt-5 inline-flex rounded-full bg-ink px-5 py-3 text-paper">
              前往
            </Link>
          </div>
        )}
      </div>
    </section>
  )
}
