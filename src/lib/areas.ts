import areas from '../../data/domains/experience/areas.json'
import type { Area } from './types'

export function getAllAreas(): Area[] {
  return [...areas].sort((a, b) => (a.order ?? 999) - (b.order ?? 999)) as Area[]
}

export function getAreaById(id: string): Area | undefined {
  return getAllAreas().find((area) => area.id === id)
}
