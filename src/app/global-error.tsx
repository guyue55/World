'use client'

export default function GlobalError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <html lang="zh-CN">
      <body>
        <main style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', background: '#F7F1E6', color: '#25302A', padding: 24 }}>
          <section style={{ maxWidth: 680, border: '1px solid rgba(37,48,42,0.12)', borderRadius: 28, padding: 32, background: 'rgba(255,255,255,0.55)' }}>
            <p style={{ letterSpacing: '0.35em', color: '#71816D', fontSize: 12 }}>世界修复</p>
            <h1 style={{ fontSize: 42, lineHeight: 1.15 }}>世界外壳暂时需要修复。</h1>
            <p style={{ lineHeight: 1.8, color: 'rgba(37,48,42,0.72)' }}>请重新尝试展开星图。</p>
            <button onClick={reset} style={{ marginTop: 24, borderRadius: 999, background: '#25302A', color: '#F7F1E6', padding: '12px 20px' }}>重新展开</button>
          </section>
        </main>
      </body>
    </html>
  )
}
