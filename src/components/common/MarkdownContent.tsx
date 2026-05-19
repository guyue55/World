import { CodeBlock } from './CodeBlock'

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
      blocks.push(<h1 key={blocks.length} className="text-4xl font-semibold">{trimmed.slice(2)}</h1>)
      i += 1
      continue
    }

    if (trimmed.startsWith('## ')) {
      blocks.push(<h2 key={blocks.length} className="pt-6 text-2xl font-semibold">{trimmed.slice(3)}</h2>)
      i += 1
      continue
    }

    if (trimmed.startsWith('### ')) {
      blocks.push(<h3 key={blocks.length} className="pt-4 text-xl font-semibold">{trimmed.slice(4)}</h3>)
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

  return <div className="space-y-5">{blocks}</div>
}
