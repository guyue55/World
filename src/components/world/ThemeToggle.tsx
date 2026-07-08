'use client'

import { useEffect, useState } from 'react'
import { Moon, Sun } from 'lucide-react'

const themeKey = 'guyue-world:theme'

export function ThemeToggle() {
  const [isDark, setIsDark] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    setIsDark(document.documentElement.classList.contains('dark'))
  }, [])

  function toggle() {
    const next = !isDark
    setIsDark(next)
    const root = document.documentElement
    root.classList.toggle('dark', next)
    try {
      window.localStorage.setItem(themeKey, next ? 'dark' : 'light')
    } catch {
      // localStorage may be unavailable in strict privacy modes
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isDark ? '\u5207\u6362\u5230\u6d45\u8272\u6a21\u5f0f' : '\u5207\u6362\u5230\u6df1\u8272\u6a21\u5f0f'}
      className="rounded-full border border-ink/10 bg-paper/80 p-2 text-ink transition hover:bg-mist aria-pressed:bg-ink aria-pressed:text-paper"
      aria-pressed={mounted ? isDark : false}
    >
      {mounted && isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </button>
  )
}
