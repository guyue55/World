import { experienceThemeModes } from '@/features/_legacy/experience-realization'

export function ThemeModeGallery() {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {experienceThemeModes.map((theme) => (
        <article key={theme.id} className="rounded-[2rem] border border-white/50 bg-white/70 p-5 shadow-soft">
          <p className="text-xs tracking-[0.32em] text-moss">{theme.id.toUpperCase()}</p>
          <h3 className="mt-3 text-2xl font-semibold">{theme.title}</h3>
          <p className="mt-3 min-h-24 text-sm leading-6 text-ink/65">{theme.description}</p>
          <p className="mt-4 rounded-2xl bg-sand/60 p-3 text-xs leading-5 text-ink/60">{theme.layout}</p>
        </article>
      ))}
    </div>
  )
}
