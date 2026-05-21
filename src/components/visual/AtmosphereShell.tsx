import type { ReactNode } from 'react'
export function AtmosphereShell({ children, intensity = 'normal' }: { children: ReactNode; intensity?: 'quiet' | 'normal' | 'strong' }) {
  const opacity = intensity === 'strong' ? 'opacity-80' : intensity === 'quiet' ? 'opacity-35' : 'opacity-55'
  return <div className="relative"><div className={`pointer-events-none fixed inset-0 -z-10 ${opacity}`}><div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,.36),transparent_26%),radial-gradient(circle_at_80%_0%,rgba(121,151,128,.22),transparent_34%)]" /></div>{children}</div>
}
