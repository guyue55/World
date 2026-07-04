'use client'

import { useEffect, useState } from 'react'

type Mode = 'world' | 'reality' | 'reader'

const modes: Array<{ id: Mode; label: string; hint: string }> = [
  { id: 'world', label: '世界', hint: '沉浸探索' },
  { id: 'reality', label: '现实', hint: '高效查找' },
  { id: 'reader', label: '静读', hint: '降低干扰' },
]

export function WorldModeDock() {
  const [mode, setMode] = useState<Mode>('world')

  useEffect(() => {
    const saved = window.localStorage.getItem('guyue-r87-mode') as Mode | null
    if (saved === 'world' || saved === 'reality' || saved === 'reader') setMode(saved)
  }, [])

  useEffect(() => {
    document.documentElement.dataset.worldMode = mode
    window.localStorage.setItem('guyue-r87-mode', mode)
  }, [mode])

  return (
    <div className="fixed bottom-24 right-4 z-[46] hidden rounded-full border border-white/50 bg-white/65 p-1 shadow-soft backdrop-blur md:flex">
      {modes.map((item) => (
        <button
          key={item.id}
          type="button"
          onClick={() => setMode(item.id)}
          title={item.hint}
          className={`rounded-full px-3 py-2 text-xs font-semibold transition ${mode === item.id ? 'bg-ink text-white' : 'text-ink/55 hover:bg-white'}`}
        >
          {item.label}
        </button>
      ))}
    </div>
  )
}
