// 用途：检查公开 SEO 发布
import fs from 'node:fs'
import path from 'node:path'
import nodes from '../data/domains/experience/nodes.json'
import publicSeoReleaseContract from '../data/release/public-seo-release-contract.json'
import publicSeoReleaseRecord from '../data/release/public-seo-release-record.json'

function read(file: string) {
  return fs.readFileSync(path.join(process.cwd(), file), 'utf-8')
}

function exists(file: string) {
  return fs.existsSync(path.join(process.cwd(), file))
}

function main() {
  const errors: string[] = []
  const forbidden = new Set(publicSeoReleaseContract.forbiddenVisibility)
  const publicLeakNodes = nodes.filter((node) => forbidden.has(node.visibility))

  if (publicLeakNodes.some((node) => Boolean(node.featured))) {
    errors.push('forbidden visibility node must not be featured')
  }

  if (!exists('public/robots.txt')) errors.push('missing public/robots.txt')
  if (!exists('public/world-index.json')) errors.push('missing public/world-index.json')

  const robots = read('public/robots.txt')
  if (!robots.includes('Sitemap')) errors.push('robots.txt must mention sitemap')
  const publicIndex = exists('public/world-index.json') ? JSON.parse(read('public/world-index.json')) : null
  if (publicIndex?.areas?.some((area: Record<string, unknown>) => 'defaultVisibility' in area)) {
    errors.push('public world index areas must not expose defaultVisibility')
  }

  if (publicSeoReleaseContract.requiredSeoChecks.length < 6) {
    errors.push('required SEO checks too few')
  }

  if (publicSeoReleaseRecord.status !== 'pending-real-build-output') {
    errors.push('SEO release record must remain pending until real build output exists')
  }

  const pkg = JSON.parse(read('package.json'))
  if (!pkg.scripts['check:public-seo-release']) errors.push('package missing check:public-seo-release')
  if (!pkg.scripts['public-seo:print']) errors.push('package missing public-seo:print')

  if (errors.length > 0) throw new Error(errors.join('\n'))
  console.log('Public SEO release check passed.')
}

main()
