import civilizationData from '../../../data/r8-civilization-universe/civilization-universe.json'

export type CivilizationLayer = {
  id: string
  name: string
  realName: string
  purpose: string
  objects: string[]
  defaultAction: string
}

export type WorldObject = {
  id: string
  name: string
  realName: string
  action: string
  href: string
  risk: string
  mode: 'world' | 'reality' | 'reader'
}

export type NodeLife = {
  id: string
  worldTitle: string
  realTitle: string
  area: string
  stage: string
  maturity: number
  visibility: string
  trust: string
  origin: string
  relations: string[]
  growth: string[]
  nextAction: string
}

export type RouteAnchor = {
  match: string
  where: string
  what: string
  do: string[]
  next: string[]
  visibility: string
}

export type CivilizationData = typeof civilizationData

export function getCivilizationData() {
  return civilizationData
}

export function getCivilizationLayers(): CivilizationLayer[] {
  return civilizationData.civilizationLayers as CivilizationLayer[]
}

export function getWorldObjects(): WorldObject[] {
  return civilizationData.worldObjects as WorldObject[]
}

export function getNodeLives(): NodeLife[] {
  return civilizationData.nodeLives as NodeLife[]
}

export function getRouteAnchors(): RouteAnchor[] {
  return civilizationData.routeAnchors as RouteAnchor[]
}

export function resolveRouteAnchor(pathname: string): RouteAnchor {
  const anchors = getRouteAnchors()
  const exact = anchors.find((anchor) => anchor.match === pathname)
  if (exact) return exact

  const prefix = anchors
    .filter((anchor) => anchor.match !== '/' && pathname.startsWith(anchor.match))
    .sort((a, b) => b.match.length - a.match.length)[0]

  return prefix ?? anchors[0]
}
