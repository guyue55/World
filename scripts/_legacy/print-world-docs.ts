import { getAdrIndex, getDocumentationRegistry, getGlossary } from '../src/lib/documentation-registry'

function main() {
  const registry = getDocumentationRegistry()
  const adr = getAdrIndex()
  const glossary = getGlossary()

  console.log(`Registered docs: ${registry.requiredDocs.length}`)
  registry.requiredDocs.forEach((doc) => console.log(`${doc.id}: ${doc.path}`))

  console.log(`ADR records: ${adr.records.length}`)
  adr.records.forEach((record) => console.log(`${record.id}: ${record.title}`))

  console.log(`Glossary terms: ${glossary.terms.length}`)
}

main()
