import relations from '../../data/core/relations.json'
import type { Relation } from './types'

export function getAllRelations(): Relation[] {
  return relations as Relation[]
}

export function getRelationsFrom(nodeId: string): Relation[] {
  return getAllRelations().filter((relation) => relation.from === nodeId)
}

export function getRelationsTo(nodeId: string): Relation[] {
  return getAllRelations().filter((relation) => relation.to === nodeId)
}
