import fs from 'node:fs'
import path from 'node:path'
import { NextResponse } from 'next/server'
import { readPrivateCanaryStatus } from '@/server/permissions/private-canary'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

type BuildIdentity = { buildId?: string; sourceCommit?: string }

function readBuildIdentity(): BuildIdentity {
  const distDirName = process.env.WORLDOS_DIST_DIR || '.next'
  if (!/^\.next(?:-[a-z0-9-]+)?$/i.test(distDirName)) return {}
  const identityPath = path.join(process.cwd(), distDirName, 'worldos-build-identity.json')
  if (!fs.existsSync(identityPath)) return {}
  try { return JSON.parse(fs.readFileSync(identityPath, 'utf8')) as BuildIdentity } catch { return {} }
}

export async function GET() {
  const canary = readPrivateCanaryStatus()
  const identity = readBuildIdentity()
  const body = {
    fixtureLoaded: canary.fixtureLoaded,
    privateCanaryHashes: canary.privateCanaryHashes,
    buildId: identity.buildId ?? null,
    sourceCommit: process.env.WORLDOS_SOURCE_COMMIT || identity.sourceCommit || null,
    errorCode: canary.errorCode,
  }
  return NextResponse.json(body, {
    status: process.env.WORLDOS_PRIVATE_CANARY_FIXTURE && !canary.fixtureLoaded ? 503 : 200,
    headers: { 'Cache-Control': 'no-store, max-age=0' },
  })
}
