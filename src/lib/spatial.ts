import spatialProtocol from '../../data/spatial-protocol.json'
import type { Area, Node } from './types'
import { getAllAreas, getAreaById } from './areas'
import { VISIBILITY_DEPTH, type WorldDepth } from './world-core'

export type SpatialCoordinate = {
  areaId: string
  x: number
  y: number
  z?: number
  depth: WorldDepth
  zone?: string
}

export function getSpatialProtocol() {
  return spatialProtocol
}

export function getAreaCoordinate(areaId: string): SpatialCoordinate | undefined {
  return spatialProtocol.areaCoordinates.find((item) => item.areaId === areaId) as SpatialCoordinate | undefined
}

export function getAllAreaCoordinates(): SpatialCoordinate[] {
  return spatialProtocol.areaCoordinates as SpatialCoordinate[]
}

export function getNodeCoordinate(node: Node): SpatialCoordinate {
  const areaCoordinate = getAreaCoordinate(node.areaId)

  return {
    areaId: node.areaId,
    x: areaCoordinate?.x ?? 0,
    y: areaCoordinate?.y ?? 0,
    z: areaCoordinate?.z,
    depth: VISIBILITY_DEPTH[node.visibility],
    zone: areaCoordinate?.zone,
  }
}

export function validateSpatialProtocol(areas: Area[] = getAllAreas()): string[] {
  const errors: string[] = []
  const areaIds = new Set(areas.map((area) => area.id))
  const coordinateAreaIds = new Set(spatialProtocol.areaCoordinates.map((item) => item.areaId))

  areaIds.forEach((areaId) => {
    if (!coordinateAreaIds.has(areaId)) {
      errors.push(`Missing spatial coordinate for area: ${areaId}`)
    }
  })

  spatialProtocol.areaCoordinates.forEach((coordinate) => {
    if (!getAreaById(coordinate.areaId)) {
      errors.push(`Spatial coordinate references missing area: ${coordinate.areaId}`)
    }
  })

  return errors
}
