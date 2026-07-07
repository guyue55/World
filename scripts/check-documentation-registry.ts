// 用途：检查文档注册表
import fs from 'node:fs'
import path from 'node:path'
import { getAdrIndex, getDocumentationRegistry, validateDocumentationRegistry } from '../src/lib/documentation-registry'

function main() {
  const issues = validateDocumentationRegistry()
  const registry = getDocumentationRegistry()
  const adrIndex = getAdrIndex()
  const missing: string[] = []

  registry.requiredDocs.forEach((doc) => {
    if (!fs.existsSync(path.join(process.cwd(), doc.path))) {
      missing.push(doc.path)
    }
  })

  adrIndex.records.forEach((record) => {
    if (!fs.existsSync(path.join(process.cwd(), record.path))) {
      missing.push(record.path)
    }
  })

  if (missing.length > 0) {
    throw new Error(`Missing registered docs:\n${missing.join('\n')}`)
  }

  const errors = issues.filter((issue) => issue.severity === 'error')

  if (errors.length > 0) {
    throw new Error(errors.map((issue) => `${issue.id}: ${issue.message}`).join('\n'))
  }

  console.log(`Documentation registry check passed. docs=${registry.requiredDocs.length}, adr=${adrIndex.records.length}`)
}

main()
