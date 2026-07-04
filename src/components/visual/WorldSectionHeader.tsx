export function WorldSectionHeader({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) {
  return (
    <header className="max-w-4xl">
      <p className="text-sm tracking-[0.42em] text-moss">{eyebrow}</p>
      <h1 className="mt-4 text-4xl font-semibold leading-tight text-ink md:text-6xl">{title}</h1>
      <p className="mt-5 text-lg leading-8 text-ink/70">{description}</p>
    </header>
  )
}
