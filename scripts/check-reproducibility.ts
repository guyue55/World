import fs from 'node:fs'
import path from 'node:path'
import {
  getAssemblyManifest,
  getEnvironmentBaseline,
  getRepositoryStructureContract,
  validateAssemblyData,
} from '../src/lib/assembly'

function main() {
  const issues = validateAssemblyData()
  const missing: string[] = []

  const assembly = getAssemblyManifest()
  const env = getEnvironmentBaseline()
  const repo = getRepositoryStructureContract()
  const pkg = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'package.json'), 'utf-8'))

  assembly.requiredRoots.forEach((root) => {
    if (!fs.existsSync(path.join(process.cwd(), root))) missing.push(root)
  })

  assembly.requiredFiles.forEach((file) => {
    if (!fs.existsSync(path.join(process.cwd(), file))) missing.push(file)
  })

  env.requiredScripts.forEach((script) => {
    if (!pkg.scripts?.[script]) missing.push(`package.json scripts.${script}`)
  })

  repo.roots.forEach((root) => {
    if (!fs.existsSync(path.join(process.cwd(), root.path))) missing.push(root.path)
  })

  const errors = issues.filter((issue) => issue.severity === 'error')

  if (errors.length > 0 || missing.length > 0) {
    throw new Error([
      ...errors.map((issue) => `${issue.id}: ${issue.message}`),
      ...missing.map((item) => `missing: ${item}`),
    ].join('\n'))
  }

  console.log(`Reproducibility check passed. roots=${assembly.requiredRoots.length}, scripts=${env.requiredScripts.length}`)
}

main()
