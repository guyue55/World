import { WorldRuntimeProvider } from './WorldRuntimeProvider'
import { SceneTransitionShell } from './SceneTransitionShell'
import { WorldChrome } from './WorldChrome'

export function WorldShell({ children }: { children: React.ReactNode }) {
  return (
    <WorldRuntimeProvider>
      <div className="min-h-screen">
        <a href="#main-content" className="skip-link">跳到主要内容</a>
        <WorldChrome />
        <div id="main-content" tabIndex={-1}>
          <SceneTransitionShell>
            {children}
          </SceneTransitionShell>
        </div>
      </div>
    </WorldRuntimeProvider>
  )
}
