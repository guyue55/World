export function ProductBackdrop() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_12%,rgba(197,164,109,0.22),transparent_28rem),radial-gradient(circle_at_82%_6%,rgba(125,154,162,0.22),transparent_30rem),linear-gradient(180deg,rgba(247,241,230,0.95),rgba(216,226,208,0.5))]" />
      <div className="absolute left-[8%] top-24 h-44 w-44 rounded-full bg-gold/15 blur-3xl" />
      <div className="absolute right-[12%] top-36 h-56 w-56 rounded-full bg-lake/15 blur-3xl" />
      <div className="absolute bottom-16 left-[20%] h-64 w-64 rounded-full bg-moss/10 blur-3xl" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/80 to-transparent" />
    </div>
  )
}
