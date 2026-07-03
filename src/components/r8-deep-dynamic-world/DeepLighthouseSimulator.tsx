'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import type { Node, Path } from '@/lib/types'
import { useWorldRuntime } from '@/components/r8-dynamic-world'

const questionBank = [
  '第一次来，应该从哪里开始？',
  '我想看技术和 AI 相关内容',
  '这个世界是如何被创造出来的？',
  '有没有适合随便漫游的路径？',
  '哪些内容是公开的，哪些不会进入 AI？',
]

function buildAnswer(question: string, nodes: Node[], paths: Path[]) {
  if (question.includes('技术') || question.includes('AI')) {
    return {
      title: '建议沿“技术与 AI”星路前进',
      body: '先进入技术星域，再阅读 AI 灯塔边界、CLI / Agent 相关节点，最后回到档案馆做现实查找。灯塔只读公开索引，不会触碰私密档案。',
      href: paths.find((path) => path.audience === 'tech') ? '/paths' : '/archive',
    }
  }
  if (question.includes('创造') || question.includes('世界')) {
    return {
      title: '建议从创世原点与世界宪章开始',
      body: '这个世界的核心不是栏目，而是节点、时间、位置、关系和权限。你可以先看世界地图，再沿时间河理解它如何生长。',
      href: '/manifesto',
    }
  }
  if (question.includes('公开') || question.includes('AI')) {
    return {
      title: '公开层不是完整宇宙',
      body: '访客看到的是精选世界。AI 灯塔只使用公开上下文；私密、家庭、vault 与创世台内容默认不进入访客 AI。',
      href: '/r5-lighthouse',
    }
  }
  return {
    title: '建议走“第一次来到这里”路径',
    body: `当前公开世界已有 ${nodes.length} 个节点与 ${paths.length} 条路径。你可以先打开地图，再沿精选路径进入节点。`,
    href: '/paths',
  }
}

export function DeepLighthouseSimulator({ nodes, paths }: { nodes: Node[]; paths: Path[] }) {
  const { markJourney } = useWorldRuntime()
  const [question, setQuestion] = useState(questionBank[0])
  const answer = useMemo(() => buildAnswer(question, nodes, paths), [nodes, paths, question])

  return (
    <section className="rounded-[2.8rem] border border-white/70 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.9),rgba(197,164,109,0.20)_42%,rgba(125,154,162,0.20)_100%)] p-6 shadow-soft backdrop-blur md:p-8">
      <div className="grid gap-8 xl:grid-cols-[0.9fr_1.1fr]">
        <div>
          <p className="text-xs font-semibold tracking-[0.36em] text-moss">LIGHTHOUSE SIMULATOR</p>
          <h2 className="mt-3 text-3xl font-semibold text-ink md:text-5xl">没有真实模型，也要像灯塔。</h2>
          <p className="mt-3 text-sm leading-7 text-ink/62">这不是假聊天框，而是公开上下文的前端导览模拟：问题会触发不同路径建议，同时持续展示边界。</p>
          <div className="mt-6 space-y-2">
            {questionBank.map((item) => (
              <button key={item} type="button" onClick={() => setQuestion(item)} className={`w-full rounded-2xl px-4 py-3 text-left text-sm font-semibold transition ${question === item ? 'bg-ink text-white' : 'bg-white/70 text-ink/60 hover:bg-white'}`}>
                {item}
              </button>
            ))}
          </div>
        </div>
        <div className="rounded-[2rem] border border-white/60 bg-white/72 p-6">
          <p className="text-xs font-semibold tracking-[0.28em] text-ink/42">灯塔回应</p>
          <h3 className="mt-3 text-3xl font-semibold text-ink">{answer.title}</h3>
          <p className="mt-4 text-sm leading-8 text-ink/64">{answer.body}</p>
          <Link href={answer.href} onClick={() => markJourney(answer.href, answer.title)} className="mt-6 inline-flex rounded-2xl bg-ink px-5 py-3 text-sm font-semibold text-white">
            跟随这束光
          </Link>
          <div className="mt-6 rounded-2xl bg-sand/65 p-4 text-xs leading-6 text-ink/55">
            边界：只使用公开节点、公开路径和公开运营说明；不会读取 private-archive、vault、owner-only API 或未发布草稿。
          </div>
        </div>
      </div>
    </section>
  )
}
