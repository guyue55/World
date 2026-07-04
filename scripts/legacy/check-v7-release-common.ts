import fs from 'node:fs'
import path from 'node:path'
import { assertV7ReleaseBoundary } from '../src/features/v7-release-ops'

export function exists(file: string) {
  return fs.existsSync(path.join(process.cwd(), file))
}

export function readJson(file: string) {
  return JSON.parse(fs.readFileSync(path.join(process.cwd(), file), 'utf-8'))
}

export function checkBatch(batch: number) {
  const files = fs.readdirSync(path.join(process.cwd(), 'data/v7-release-ops/batches'))
  const hit = files.find((file) => file.startsWith(String(batch).padStart(2, '0') + '-'))
  const errors: string[] = []
  if (!hit) return [`missing V7 batch ${batch}`]
  const data = readJson(`data/v7-release-ops/batches/${hit}`)
  if (data.batch !== batch) errors.push(`batch number mismatch: ${batch}`)
  if (data.status !== 'complete') errors.push(`batch ${batch} must be complete`)
  if (data.productionLive !== false) errors.push(`batch ${batch} productionLive must be false`)
  return errors
}

export function checkStage(stage: number, batches: number[]) {
  const errors: string[] = []
  const stageFile = `data/v7-release-ops/stages/stage-${String(stage).padStart(2, '0')}.json`
  if (!exists(stageFile)) errors.push(`missing stage file ${stageFile}`)
  else {
    const data = readJson(stageFile)
    if (data.stage !== stage) errors.push(`stage number mismatch: ${stage}`)
    if (data.status !== 'complete') errors.push(`stage ${stage} must be complete`)
    if (data.releaseReady !== false) errors.push(`stage ${stage} releaseReady must be false`)
  }
  for (const batch of batches) errors.push(...checkBatch(batch))
  return errors
}

export function checkRequiredFiles(files: string[]) {
  return files.filter((file) => !exists(file)).map((file) => `missing ${file}`)
}

export function checkBoundary() {
  return assertV7ReleaseBoundary()
}

export function failIfErrors(errors: string[]) {
  if (errors.length > 0) throw new Error(errors.join('\n'))
}
