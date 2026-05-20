import { getPhaseEightDomainHttpsCdnPolicy } from '@/lib/phase-eight-production'

export function DomainHttpsCdnPanel() {
  const policy = getPhaseEightDomainHttpsCdnPolicy()

  return (
    <section className="rounded-world border border-ink/10 bg-white/45 p-6 shadow-soft">
      <h2 className="text-2xl font-semibold">域名 HTTPS CDN 策略</h2>
      <div className="mt-5 grid gap-4 md:grid-cols-3">
        <article className="rounded-2xl bg-paper/70 p-5">
          <p className="text-xs uppercase tracking-[0.2em] text-moss">DOMAIN</p>
          <h3 className="mt-3 text-lg font-semibold">域名</h3>
          <p className="mt-3 text-sm text-ink/60">required: {String(policy.domain.required)}</p>
          <p className="mt-2 text-sm text-ink/60">record: {policy.domain.recordType}</p>
        </article>
        <article className="rounded-2xl bg-paper/70 p-5">
          <p className="text-xs uppercase tracking-[0.2em] text-moss">HTTPS</p>
          <h3 className="mt-3 text-lg font-semibold">HTTPS</h3>
          <p className="mt-3 text-sm text-ink/60">required: {String(policy.https.required)}</p>
          <p className="mt-2 text-sm text-ink/60">enforce: {String(policy.https.enforceHttps)}</p>
        </article>
        <article className="rounded-2xl bg-paper/70 p-5">
          <p className="text-xs uppercase tracking-[0.2em] text-moss">CDN</p>
          <h3 className="mt-3 text-lg font-semibold">CDN</h3>
          <p className="mt-3 text-sm text-ink/60">required: {String(policy.cdn.required)}</p>
          <p className="mt-2 text-sm text-ink/60">{policy.cdn.cachePolicy}</p>
        </article>
      </div>
    </section>
  )
}
