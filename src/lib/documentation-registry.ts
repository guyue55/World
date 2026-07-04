import documentationRegistry from '../../data/core/documentation-registry.json'
import adrIndex from '../../data/core/adr-index.json'
import glossary from '../../data/core/glossary.json'

export type DocumentationIssue = {
  id: string
  severity: 'warning' | 'error'
  message: string
}

export function getDocumentationRegistry() {
  return documentationRegistry
}

export function getAdrIndex() {
  return adrIndex
}

export function getGlossary() {
  return glossary
}

export function validateDocumentationRegistry(): DocumentationIssue[] {
  const issues: DocumentationIssue[] = []
  const docIds = new Set<string>()

  documentationRegistry.requiredDocs.forEach((doc) => {
    if (docIds.has(doc.id)) {
      issues.push({
        id: `duplicate-doc-${doc.id}`,
        severity: 'error',
        message: `重复文档 ID：${doc.id}`,
      })
    }

    docIds.add(doc.id)

    if (!doc.path.startsWith('docs/')) {
      issues.push({
        id: `doc-path-${doc.id}`,
        severity: 'error',
        message: `文档 ${doc.id} 必须位于 docs/ 下。`,
      })
    }
  })

  const adrIds = new Set<string>()

  adrIndex.records.forEach((record) => {
    if (adrIds.has(record.id)) {
      issues.push({
        id: `duplicate-adr-${record.id}`,
        severity: 'error',
        message: `重复 ADR：${record.id}`,
      })
    }

    adrIds.add(record.id)

    if (!record.path.startsWith('docs/09-adr/')) {
      issues.push({
        id: `adr-path-${record.id}`,
        severity: 'error',
        message: `ADR ${record.id} 必须位于 docs/09-adr/。`,
      })
    }
  })

  if (glossary.terms.length < 10) {
    issues.push({
      id: 'glossary-too-small',
      severity: 'warning',
      message: '术语表词条偏少。',
    })
  }

  return issues
}
