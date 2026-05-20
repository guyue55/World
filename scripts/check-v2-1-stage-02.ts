import fs from 'node:fs'
import path from 'node:path'
import routes from '../data/v2-1/stage-02-real-api-routes.json'

const errors: string[] = []

for (const route of routes.routes) {
  const file = path.join(process.cwd(), 'src/app', route.replace(/^\//, ''), 'route.ts')
  if (!fs.existsSync(file)) {
    errors.push(`missing route handler: ${route}`)
  }
}

const vaultRoute = fs.readFileSync(path.join(process.cwd(), 'src/app/api/v2/vault/route.ts'), 'utf-8')
if (!vaultRoute.includes("requirePermission(actor, 'vault.read')")) {
  errors.push('vault route must require vault.read')
}

const aiRoute = fs.readFileSync(path.join(process.cwd(), 'src/app/api/v2/ai/suggestions/route.ts'), 'utf-8')
if (!aiRoute.includes('autoPublish: false')) {
  errors.push('AI suggestions must not auto publish')
}

if (errors.length > 0) throw new Error(errors.join('\n'))
console.log('V2.1 stage 02 API route check passed.')
