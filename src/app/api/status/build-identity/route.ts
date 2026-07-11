import fs from 'node:fs'
import path from 'node:path'
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

export async function GET() {
  const distDirName = process.env.WORLDOS_DIST_DIR || '.next'
  if (!/^\.next(?:-[a-z0-9-]+)?$/i.test(distDirName)) {
    return NextResponse.json({ error: '构建目录配置无效' }, { status: 500 })
  }

  const identityPath = path.join(process.cwd(), distDirName, 'worldos-build-identity.json')
  if (!fs.existsSync(identityPath)) {
    return NextResponse.json({ error: '当前生产构建尚无身份记录' }, { status: 503 })
  }

  const identity = JSON.parse(fs.readFileSync(identityPath, 'utf8'))
  return NextResponse.json(identity, {
    headers: {
      'Cache-Control': 'no-store, max-age=0',
    },
  })
}
