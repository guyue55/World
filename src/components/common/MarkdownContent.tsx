import { CodeBlock } from './CodeBlock'

function slugifyHeading(text: string, index: number) {
  return `${text
    .toLowerCase()
    .replace(/[^\u4e00-\u9fa5a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 48) || 'section'}-${index}`
}

function inlineMarkdown(text: string) {
  const parts = text.split(/(`[^`]+`)/g)

  return parts.map((part, index) => {
    if (part.startsWith('`') && part.endsWith('`')) {
      return (
        <code key={index} className="rounded bg-ink/5 px-1.5 py-0.5 text-sm">
          {part.slice(1, -1)}
        </code>
      )
    }

    return part
  })
}

export function MarkdownContent({ content }: { content: string }) {
  const lines = content.split('\n')
  const blocks: React.ReactNode[] = []
  let i = 0

  while (i < lines.length) {
    const line = lines[i]
    const trimmed = line.trim()

    if (!trimmed) {
      i += 1
      continue
    }

    if (trimmed.startsWith('```')) {
      const lang = trimmed.replace('```', '').trim() || 'text'
      const code: string[] = []
      i += 1
      while (i < lines.length && !lines[i].trim().startsWith('```')) {
        code.push(lines[i])
        i += 1
      }
      i += 1
      blocks.push(<CodeBlock key={blocks.length} code={code.join('\n')} lang={lang} />)
      continue
    }

    if (trimmed.startsWith('# ')) {
      const text = trimmed.slice(2)
      blocks.push(<h1 id={slugifyHeading(text, blocks.length)} key={blocks.length} className="text-4xl font-semibold leading-tight">{text}</h1>)
      i += 1
      continue
    }

    if (trimmed.startsWith('## ')) {
      const text = trimmed.slice(3)
      blocks.push(<h2 id={slugifyHeading(text, i)} key={blocks.length} className="scroll-mt-24 pt-8 text-2xl font-semibold leading-snug">{text}</h2>)
      i += 1
      continue
    }

    if (trimmed.startsWith('### ')) {
      const text = trimmed.slice(4)
      blocks.push(<h3 id={slugifyHeading(text, i)} key={blocks.length} className="scroll-mt-24 pt-5 text-xl font-semibold leading-snug">{text}</h3>)
      i += 1
      continue
    }

    if (trimmed.startsWith('- ')) {
      const items: string[] = []
      while (i < lines.length && lines[i].trim().startsWith('- ')) {
        items.push(lines[i].trim().slice(2))
        i += 1
      }
      blocks.push(
        <ul key={blocks.length} className="list-disc space-y-2 pl-6 leading-8 text-ink/75">
          {items.map((item) => <li key={item}>{inlineMarkdown(item)}</li>)}
        </ul>
      )
      continue
    }

    const paragraph: string[] = [trimmed]
    i += 1
    while (
      i < lines.length &&
      lines[i].trim() &&
      !lines[i].trim().startsWith('#') &&
      !lines[i].trim().startsWith('- ') &&
      !lines[i].trim().startsWith('```')
    ) {
      paragraph.push(lines[i].trim())
      i += 1
    }

    blocks.push(
      <p key={blocks.length} className="leading-9 text-ink/75">
        {inlineMarkdown(paragraph.join(' '))}
      </p>
    )
  }

  return <div className="prose-guyue space-y-5">{blocks}</div>
}
