export function StatusSectionNav({
  sections,
}: {
  sections: Array<{ id: string; title: string; purpose: string }>
}) {
  return (
    <nav className="rounded-world border border-ink/10 bg-white/45 p-4 shadow-soft" aria-label="状态页分组导航">
      <div className="flex flex-wrap gap-2">
        {sections.map((section) => (
          <a key={section.id} href={`#${section.id}`} className="rounded-full bg-paper/80 px-4 py-2 text-sm text-ink/65 hover:bg-white">
            {section.title}
          </a>
        ))}
      </div>
    </nav>
  )
}
