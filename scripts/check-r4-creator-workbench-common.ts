import fs from 'node:fs'
import path from 'node:path'
import { assertR4CreatorWorkbenchBoundary } from '../src/features/r4-creator-workbench'

export function exists(file: string) {
  return fs.existsSync(path.join(process.cwd(), file))
}

export function readJson(file: string) {
  return JSON.parse(fs.readFileSync(path.join(process.cwd(), file), 'utf-8'))
}

export function checkBatch(batch: number) {
  const batchDir = path.join(process.cwd(), 'data/r4-creator-workbench/batches')
  const files = fs.readdirSync(batchDir)
  const hit = files.find((file) => file.startsWith(String(batch).padStart(2, '0') + '-'))
  const errors: string[] = []

  if (!hit) return [`missing R4 batch ${batch}`]

  const data = readJson(`data/r4-creator-workbench/batches/${hit}`)
  if (data.batch !== batch) errors.push(`batch number mismatch: ${batch}`)
  if (data.status !== 'complete') errors.push(`batch ${batch} must be complete`)
  if (data.productionLive !== false) errors.push(`batch ${batch} productionLive must be false`)
  if (data.releaseReady !== false) errors.push(`batch ${batch} releaseReady must be false`)
  if (data.cleanProductionReady !== false) errors.push(`batch ${batch} cleanProductionReady must be false`)
  return errors
}

export function checkStage(stage: number, batches: number[]) {
  const errors: string[] = []
  const stageFile = `data/r4-creator-workbench/stages/stage-${String(stage).padStart(2, '0')}.json`

  if (!exists(stageFile)) errors.push(`missing stage file ${stageFile}`)
  else {
    const data = readJson(stageFile)
    if (data.stage !== stage) errors.push(`stage number mismatch: ${stage}`)
    if (data.status !== 'complete') errors.push(`stage ${stage} must be complete`)
    if (data.productionLive !== false) errors.push(`stage ${stage} productionLive must be false`)
    if (data.releaseReady !== false) errors.push(`stage ${stage} releaseReady must be false`)
    if (data.cleanProductionReady !== false) errors.push(`stage ${stage} cleanProductionReady must be false`)
  }

  for (const batch of batches) errors.push(...checkBatch(batch))
  return errors
}

export function checkRequiredFiles(files: string[]) {
  return files.filter((file) => !exists(file)).map((file) => `missing ${file}`)
}

export function checkBoundary() {
  return assertR4CreatorWorkbenchBoundary()
}

export function failIfErrors(errors: string[]) {
  if (errors.length > 0) throw new Error(errors.join('\n'))
}
