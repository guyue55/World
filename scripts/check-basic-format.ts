// 用途：检查基本格式
import fs from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const targetExtensions = new Set(['.ts', '.tsx', '.json', '.md', '.css'])
const ignored = new Set(['node_modules', '.next', '.git', '.turbo', 'dist', 'build', 'coverage', 'reports'])

function walk(dir: string, result: string[] = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (ignored.has(entry.name)) continue
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) walk(full, result)
    else if (targetExtensions.has(path.extname(entry.name))) result.push(full)
  }
  return result
}

function main() {
  const files = walk(root)
  const errors: string[] = []

  files.forEach((file) => {
    const content = fs.readFileSync(file, 'utf-8')
    const rel = path.relative(root, file)

    if (content.includes('\t')) errors.push(`${rel}: contains tab characters`)
    if (!content.endsWith('\n')) errors.push(`${rel}: must end with newline`)
    if (/ +$/m.test(content)) errors.push(`${rel}: contains trailing spaces`)

    if (file.endsWith('.json')) {
      try {
        JSON.parse(content)
      } catch (error) {
        errors.push(`${rel}: invalid JSON: ${(error as Error).message}`)
      }
    }
  })

  if (errors.length > 0) {
    throw new Error(`Basic format check failed:\n${errors.join('\n')}`)
  }

  console.log(`Basic format check passed for ${files.length} files.`)
}

main()
