'use client'

import { useEffect, useRef, useState, type FormEvent } from 'react'
import { ArrowRight, LoaderCircle, Navigation, Send } from 'lucide-react'
import { SceneTransitionLink } from '@/components/world/migration/SceneTransitionLink'
import type { SceneContext, SceneId } from '@/lib/scenes/scene-context'
import type { SceneDestination } from '@/lib/scenes/scene-destination'
import type { LighthouseRuntimeResponse } from '@/server/ai/lighthouse-runtime'
import styles from './LighthouseGuideStage.module.css'

function destinationFor(href: string, title: string): SceneDestination {
  const sceneId: SceneId = href.startsWith('/node/') ? 'node' : href.startsWith('/paths') ? 'paths' : href.startsWith('/archive') ? 'archive' : href.startsWith('/timeline') ? 'timeline' : 'atlas'
  return { href, sceneId, transitionObject: sceneId === 'node' ? 'beam' : 'island', accessibleLabel: `沿灯塔光束前往 ${title}` }
}

export function PublicLighthouseConsole({ initialResponse, context, quickQuestions }: { initialResponse: LighthouseRuntimeResponse; context: SceneContext; quickQuestions: string[] }) {
  const [question, setQuestion] = useState('')
  const [response, setResponse] = useState(initialResponse)
  const [pending, setPending] = useState(false)
  const [error, setError] = useState('')
  const controllerRef = useRef<AbortController | null>(null)

  useEffect(() => () => controllerRef.current?.abort(), [])

  async function ask(nextQuestion: string) {
    const normalized = nextQuestion.trim()
    if (!normalized || pending) return
    controllerRef.current?.abort()
    const controller = new AbortController()
    controllerRef.current = controller
    setPending(true)
    setError('')
    try {
      const result = await fetch('/api/lighthouse/ask', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ question: normalized, context }),
        signal: controller.signal,
      })
      const body = await result.json() as LighthouseRuntimeResponse | { error?: string }
      if (!result.ok || !('answer' in body)) throw new Error('error' in body ? body.error : '灯塔暂时没有回应。')
      setResponse(body)
      setQuestion('')
    } catch (caught) {
      if (!controller.signal.aborted) setError(caught instanceof Error ? caught.message : '灯塔暂时没有回应。')
    } finally {
      if (!controller.signal.aborted) setPending(false)
    }
  }

  function onSubmit(event: FormEvent) {
    event.preventDefault()
    void ask(question)
  }

  const stateLabel = response.grounding.status === 'refusal' ? '边界已守住' : response.grounding.status === 'no-evidence' ? '没有足够线索' : response.mode === 'live-provider' ? '实时灯光' : '低光导览'

  return <div className={styles.console} data-lighthouse-state={response.grounding.status}>
    <div className={styles.questionRail}>
      <form onSubmit={onSubmit} className={styles.askForm}>
        <Navigation size={17} aria-hidden="true" />
        <label className="sr-only" htmlFor="lighthouse-question">向灯塔问路</label>
        <input id="lighthouse-question" value={question} maxLength={180} onChange={(event) => setQuestion(event.target.value)} placeholder="问我在哪、为什么相关、下一步去哪" />
        <button type="submit" disabled={pending || !question.trim()} aria-label="发出问路信号">{pending ? <LoaderCircle size={18} className={styles.spinner} /> : <Send size={18} />}</button>
      </form>
      <div className={styles.quickQuestions} aria-label="常用问路方式">
        {quickQuestions.map((item) => <button type="button" key={item} disabled={pending} onClick={() => void ask(item)}>{item}</button>)}
      </div>
      {error ? <p className={styles.error} role="alert">{error}</p> : null}
    </div>

    <section className={styles.answer} aria-live="polite" aria-busy={pending}>
      <header><span className={styles.beaconDot} aria-hidden="true" /><p>{stateLabel}</p></header>
      <p className={styles.answerText}>{response.answer}</p>
      {response.sources.length > 0 ? <div className={styles.sources}><small>光束依据</small>{response.sources.slice(0, 3).map((source) => <SceneTransitionLink key={`${source.href}-${source.title}`} href={source.href} destination={destinationFor(source.href, source.title)} sourceObjectId={source.slug || source.href}><span>{source.title}</span><ArrowRight size={14} /><em>{source.reason}</em></SceneTransitionLink>)}</div> : null}
      <nav className={styles.nextSteps} aria-label="灯塔推荐的下一站">
        {response.nextSteps.slice(0, 3).map((step) => <SceneTransitionLink key={`${step.href}-${step.title}`} href={step.href} destination={destinationFor(step.href, step.title)} sourceObjectId={step.href}><span>{step.title}</span><small>{step.reason}</small><ArrowRight size={15} /></SceneTransitionLink>)}
      </nav>
    </section>
  </div>
}
