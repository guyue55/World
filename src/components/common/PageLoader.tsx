export function PageLoader({ label = '正在加载' }: { label?: string }) {
  return (
    <main className="world-container flex min-h-[60vh] items-center justify-center py-16">
      <section className="rounded-world border border-ink/10 bg-white/45 p-8 text-center shadow-soft">
        <div className="mx-auto h-12 w-12 animate-pulse rounded-full bg-gold/30" />
        <p className="mt-5 text-sm tracking-[0.28em] text-moss">{label}</p>
      </section>
    </main>
  )
}
