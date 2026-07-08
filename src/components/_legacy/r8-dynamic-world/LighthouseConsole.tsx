'use client'

import { FormEvent, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { r3ContentPaths } from '@/features/_legacy/r3-content-life'
import { useWorldRuntime } from './WorldRuntimeProvider'

const recommendedQuestions = [
  '第一次来，应该从哪里开始？',
  '我想看技术与 AI 相关内容',
  '这个世界和普通博客有什么不同？',
  '哪些内容不会进入公开 AI？',
]

function answerQuestion(question: string) {
  if (question.includes('技术') || question.includes('AI')) {
    return '建议沿「技术与 AI 星路」前进：先看 AI 边界，再看 Agent、CLI、工程实践。公开灯塔只读取公开索引，不触碰私密档案。'
  }
  if (question.includes('普通博客') || question.includes('不同')) {
    return '普通博客先有栏目再塞内容；古月浮屿先有世界、位置、时间、关系和权限，再让内容以节点形态生长。'
  }
  if (question.includes('公开') || question.includes('私密')) {
    return '公开不是默认结果。public 节点可进入灯塔上下文；private、vault、sealed、家庭细节与地址类内容不会进入公开 AI。'
  }
  return '建议从「第一次来到这里」路径开始：世界宣言 → 入口清澈深处浩瀚 → 地图 → AI 灯塔边界。'
}

export function LighthouseConsole() {
  const { reducedMotion } = useWorldRuntime()
  const [question, setQuestion] = useState(recommendedQuestions[0])
  const [messages, setMessages] = useState([{ role: 'lighthouse', text: answerQuestion(recommendedQuestions[0]) }])
  const paths = useMemo(() => r3ContentPaths.slice(0, 3), [])

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const trimmed = question.trim()
    if (!trimmed) return
    setMessages((items) => [...items, { role: 'traveler', text: trimmed }, { role: 'lighthouse', text: answerQuestion(trimmed) }])
    setQuestion('')
  }

  return (
    <section className="rounded-[2.5rem] border border-white/70 bg-ink p-6 text-white shadow-soft md:p-8">
      <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
        <div>
          <p className="text-xs font-semibold tracking-[0.32em] text-white/45">LIGHTHOUSE CONSOLE</p>
          <h2 className="mt-3 text-3xl font-semibold md:text-4xl">灯塔先做成交互体验，再接真实模型。</h2>
          <p className="mt-4 text-sm leading-7 text-white/62">这里是前端模拟问答：它展示公开导览、路径推荐和隐私边界。即使没有后端 AI，访客也能获得动态反馈。</p>
          <div className="mt-6 grid gap-3">
            {recommendedQuestions.map((item) => (
              <button key={item} type="button" className="rounded-2xl bg-white/10 px-4 py-3 text-left text-sm transition hover:bg-white/16" onClick={() => setQuestion(item)}>
                {item}
              </button>
            ))}
          </div>
        </div>
        <div className="rounded-[2rem] bg-white/10 p-4 backdrop-blur">
          <div className="max-h-[360px] space-y-3 overflow-auto pr-1">
            {messages.map((message, index) => (
              <motion.div
                key={`${message.role}-${index}-${message.text}`}
                className={`rounded-2xl p-4 text-sm leading-7 ${message.role === 'traveler' ? 'ml-8 bg-white text-ink' : 'mr-8 bg-white/12 text-white/75'}`}
                initial={reducedMotion ? false : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {message.text}
              </motion.div>
            ))}
          </div>
          <form className="mt-4 flex gap-2" onSubmit={submit}>
            <input
              value={question}
              onChange={(event) => setQuestion(event.target.value)}
              className="min-w-0 flex-1 rounded-2xl border border-white/20 bg-white/90 px-4 py-3 text-sm text-ink outline-none focus:ring-2 focus:ring-gold"
              placeholder="向灯塔询问一条路径"
            />
            <button className="rounded-2xl bg-gold px-5 py-3 text-sm font-semibold text-ink" type="submit">询问</button>
          </form>
        </div>
      </div>
      <div className="mt-8 grid gap-3 md:grid-cols-3">
        {paths.map((path) => (
          <article key={path.id} className="rounded-3xl bg-white/10 p-5">
            <p className="text-xs text-white/45">{path.audience}</p>
            <h3 className="mt-2 text-lg font-semibold">{path.title}</h3>
            <p className="mt-2 text-sm leading-6 text-white/58">{path.description}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
