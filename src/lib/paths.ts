import paths from '../../data/domains/experience/paths.json'
import type { Path } from './types'

export function getAllPaths(): Path[] {
  return (paths as Path[]).filter((path) => path.visibility === 'public')
}

export function getPathById(id: string): Path | undefined {
  return getAllPaths().find((path) => path.id === id)
}
