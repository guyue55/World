import { themeModes } from '@/features/_legacy/theme-system'
import { ThemeAwareSurface } from './ThemeAwareSurface'
export function ThemePreviewPanel(){ return <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">{themeModes.map(theme=><ThemeAwareSurface key={theme.id} theme={theme}><div className="grid grid-cols-3 gap-2"><span className="h-10 rounded-2xl bg-white/40" /><span className="h-10 rounded-2xl bg-white/25" /><span className="h-10 rounded-2xl bg-white/15" /></div></ThemeAwareSurface>)}</section> }
