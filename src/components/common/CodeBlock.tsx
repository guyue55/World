export function CodeBlock({ code, lang }: { code: string; lang: string }) {
  return (
    <figure className="overflow-hidden rounded-2xl border border-ink/10 bg-night text-paper">
      <figcaption className="border-b border-paper/10 px-4 py-2 text-xs uppercase tracking-[0.2em] text-paper/45">
        {lang}
      </figcaption>
      <pre className="overflow-x-auto p-4 text-sm leading-7">
        <code>{code}</code>
      </pre>
    </figure>
  )
}
