'use client'

import { useEffect, useState } from 'react'
import {
  getDefaultThemeMode,
  isThemeModeId,
  themeModes,
  themeStorageKey,
  type ThemeModeId,
} from '@/features/theme-system'

function readStoredTheme() {
  try {
    const stored = window.localStorage.getItem(themeStorageKey)
    return stored && isThemeModeId(stored) ? stored : null
  } catch {
    return null
  }
}

function writeStoredTheme(nextTheme: ThemeModeId) {
  try {
    window.localStorage.setItem(themeStorageKey, nextTheme)
  } catch {
    // Browser storage may be unavailable in privacy modes; state update is still enough for this session.
  }
}

export function ThemeSwitcher() {
  const [theme, setTheme] = useState<ThemeModeId>(getDefaultThemeMode())

  useEffect(() => {
    const stored = readStoredTheme()
    if (stored) setTheme(stored)
  }, [])

  function updateTheme(nextTheme: ThemeModeId) {
    setTheme(nextTheme)
    writeStoredTheme(nextTheme)
  }

  return (
    <div className="rounded-[2rem] border border-white/50 bg-white/75 p-4 shadow-soft">
      <p className="text-xs tracking-[0.3em] text-moss">THEME SWITCHER</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {themeModes.map((mode) => (
          <button
            key={mode.id}
            type="button"
            onClick={() => updateTheme(mode.id)}
            className={`rounded-full px-4 py-2 text-sm transition ${theme === mode.id ? 'bg-ink text-white' : 'bg-sand/70 text-ink/70'}`}
            aria-pressed={theme === mode.id}
          >
            {mode.title}
          </button>
        ))}
      </div>
      <p className="mt-4 text-sm leading-6 text-ink/60">
        当前主题：{theme}。该选择保存在浏览器本地，不影响服务端构建，也不会读取私密内容。
      </p>
    </div>
  )
}
