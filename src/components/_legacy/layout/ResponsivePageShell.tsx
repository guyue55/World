import type { ReactNode } from 'react'

type ResponsivePageShellProps = {
  children: ReactNode
  className?: string
}

export function ResponsivePageShell({ children, className = '' }: ResponsivePageShellProps) {
  return (
    <main className={`mx-auto w-full max-w-[1600px] space-y-16 px-4 pb-20 sm:px-6 lg:px-8 xl:px-10 ${className}`}>
      {children}
    </main>
  )
}
