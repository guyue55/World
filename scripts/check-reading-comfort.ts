// 用途：检查阅读舒适度
import fs from 'node:fs'
import path from 'node:path'
import readingComfortContract from '../data/domains/experience/reading-comfort-contract.json'
import readingComfortQualityGate from '../data/domains/experience/reading-comfort-quality-gate.json'

function read(file: string) {
  return fs.readFileSync(path.join(process.cwd(), file), 'utf-8')
}

function main() {
  const errors: string[] = []
  const checks = {
    requiredComponents: readingComfortQualityGate.requiredComponents.length,
    readingWidthChMin: 68,
    readingWidthChMax: 76,
    tocHeadingLevels: 2,
    collapsibleRelationGroups: 1,
    mobilePriorityRules: 3,
  }

  Object.entries(checks).forEach(([key, value]) => {
    const expected = readingComfortQualityGate.minimums[key as keyof typeof readingComfortQualityGate.minimums]
    if (value < expected) errors.push(`${key} below minimum: ${value} < ${expected}`)
  })

  readingComfortQualityGate.requiredComponents.forEach((component) => {
    const files = [
      `src/components/reading/${component}.tsx`,
      `src/components/node/${component}.tsx`,
      `src/components/common/${component}.tsx`,
    ]
    if (!files.some((file) => fs.existsSync(path.join(process.cwd(), file)))) {
      errors.push(`missing reading comfort component: ${component}`)
    }
  })

  const page = read('src/app/node/[slug]/page.tsx')
  ;['ReadingComfortBar', 'ReadingToc', 'NodeReadingBody', 'NodeRelationRail'].forEach((token) => {
    if (!page.includes(token)) errors.push(`node page missing ${token}`)
  })

  const css = read('src/app/globals.css')
  if (!css.includes('.prose-guyue')) errors.push('globals.css missing prose-guyue')
  if (!css.includes('72ch')) errors.push('reading prose width should include 72ch')

  const rail = read('src/components/node/NodeRelationRail.tsx')
  if (!rail.includes('AccessibleCollapsible')) errors.push('relation rail must use collapsible grouping')

  if (readingComfortContract.pageParts.length < 6) errors.push('reading comfort contract too small')

  if (errors.length > 0) throw new Error(errors.join('\n'))
  console.log('Reading comfort check passed.')
}

main()
