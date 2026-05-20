import readingComfortContract from '../../data/reading-comfort-contract.json'
import readingComfortQualityGate from '../../data/reading-comfort-quality-gate.json'

export type ReadingHeading = {
  id: string
  level: 2 | 3
  text: string
}

function slugifyHeading(text: string, index: number) {
  return `${text
    .toLowerCase()
    .replace(/[^\u4e00-\u9fa5a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 48) || 'section'}-${index}`
}

export function getReadingComfortContract() {
  return readingComfortContract
}

export function getReadingComfortQualityGate() {
  return readingComfortQualityGate
}

export function extractReadingHeadings(content: string | null): ReadingHeading[] {
  if (!content) return []

  return content
    .split('\n')
    .map((line, index) => {
      const trimmed = line.trim()

      if (trimmed.startsWith('## ')) {
        const text = trimmed.slice(3).trim()
        return { id: slugifyHeading(text, index), level: 2 as const, text }
      }

      if (trimmed.startsWith('### ')) {
        const text = trimmed.slice(4).trim()
        return { id: slugifyHeading(text, index), level: 3 as const, text }
      }

      return null
    })
    .filter((heading): heading is ReadingHeading => Boolean(heading))
}

export function getReadingComfortSummary(content: string | null, readingMinutes: number | null) {
  const headings = extractReadingHeadings(content)

  return {
    readingMinutes,
    headingCount: headings.length,
    readingWidth: '68-76ch',
    mobilePriority: '正文优先，目录和元信息后置',
  }
}
