'use client'

import { useEffect, useRef, type ReactNode } from 'react'
import { X } from 'lucide-react'

type SceneInspectorProps = {
  open: boolean
  title: string
  children: ReactNode
  onClose: () => void
}

export function SceneInspector({ open, title, children, onClose }: SceneInspectorProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!open) return
    closeButtonRef.current?.focus()
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [onClose, open])

  if (!open) return null

  return (
    <aside
      className="world-ui-surface fixed inset-x-3 bottom-3 z-40 max-h-[70svh] overflow-y-auto border border-white/20 bg-night/95 p-4 text-paper shadow-2xl md:absolute md:inset-auto md:right-4 md:top-4 md:w-[min(32%,24rem)]"
      role="dialog"
      aria-modal="true"
      aria-labelledby="scene-inspector-title"
    >
      <div className="flex items-center justify-between gap-3">
        <h2 id="scene-inspector-title" className="world-scene-title text-xl">{title}</h2>
        <button ref={closeButtonRef} type="button" onClick={onClose} className="grid min-h-11 min-w-11 place-items-center rounded-lg hover:bg-white/10 focus-visible:outline" aria-label="关闭详情">
          <X aria-hidden="true" size={18} />
        </button>
      </div>
      <div className="mt-4">{children}</div>
    </aside>
  )
}
