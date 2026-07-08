import type { ReactNode } from 'react'

export function CosmicBackdrop({ children }: { children: ReactNode }) {
  return (
    <div className="relative overflow-hidden rounded-[3rem] border border-white/40 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,.38),transparent_28%),radial-gradient(circle_at_80%_0%,rgba(121,151,128,.30),transparent_34%),linear-gradient(135deg,#101615_0%,#26342f_45%,#f4ead8_100%)] p-6 text-white shadow-soft md:p-10">
      <div className="pointer-events-none absolute inset-0 opacity-60">
        <div className="absolute left-[12%] top-[18%] h-1.5 w-1.5 rounded-full bg-white" />
        <div className="absolute right-[16%] top-[22%] h-2 w-2 rounded-full bg-mist" />
        <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-white/20 blur-3xl" />
        <div className="absolute -bottom-28 left-10 h-80 w-80 rounded-full bg-moss/30 blur-3xl" />
      </div>
      <div className="relative">{children}</div>
    </div>
  )
}
