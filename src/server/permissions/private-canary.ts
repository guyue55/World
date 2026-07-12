import crypto from 'node:crypto'
import fs from 'node:fs'
import path from 'node:path'
import { z } from 'zod'

const fixtureSchema = z.object({
  visibility: z.literal('private'),
  tokens: z.array(z.string().min(12).max(160)).length(6).refine((tokens) => new Set(tokens).size === tokens.length, 'canary token 必须唯一'),
})

export type PrivateCanaryStatus = {
  fixtureLoaded: boolean
  privateCanaryHashes: string[]
  errorCode: 'not-configured' | 'invalid-path' | 'invalid-fixture' | null
}

function digest(value: string) {
  return crypto.createHash('sha256').update(value).digest('hex')
}

export function readPrivateCanaryStatus(fixturePath = process.env.WORLDOS_PRIVATE_CANARY_FIXTURE): PrivateCanaryStatus {
  if (!fixturePath) return { fixtureLoaded: false, privateCanaryHashes: [], errorCode: 'not-configured' }
  try {
    if (!path.isAbsolute(fixturePath)) return { fixtureLoaded: false, privateCanaryHashes: [], errorCode: 'invalid-path' }
    const stat = fs.lstatSync(fixturePath)
    if (!stat.isFile() || stat.isSymbolicLink() || stat.size > 16 * 1024) return { fixtureLoaded: false, privateCanaryHashes: [], errorCode: 'invalid-path' }
    const fixture = fixtureSchema.parse(JSON.parse(fs.readFileSync(fixturePath, 'utf8')))
    return { fixtureLoaded: true, privateCanaryHashes: fixture.tokens.map(digest).sort(), errorCode: null }
  } catch {
    return { fixtureLoaded: false, privateCanaryHashes: [], errorCode: 'invalid-fixture' }
  }
}
