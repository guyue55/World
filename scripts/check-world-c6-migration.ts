import fs from 'node:fs'
import assert from 'node:assert/strict'
import { reduceMigrationState, type MigrationState } from '@/lib/runtime/scene-migration'
import { createSceneContext } from '@/lib/scenes/scene-destination'
import type { SceneDestination } from '@/lib/scenes/scene-destination'

const source = createSceneContext('atlas', '/atlas')
const target: SceneDestination = { href: '/node/world-manifesto', sceneId: 'node', objectId: 'node-world-manifesto', transitionObject: 'star', accessibleLabel: '进入创世初光' }
let state: MigrationState = { kind: 'idle' }
state = reduceMigrationState(state, { type: 'START', source, target }); assert.equal(state.kind, 'leaving')
state = reduceMigrationState(state, { type: 'TRANSIT' }); assert.equal(state.kind, 'inTransit')
state = reduceMigrationState(state, { type: 'ARRIVE' }); assert.equal(state.kind, 'arriving')
state = reduceMigrationState(state, { type: 'SETTLE', current: createSceneContext('node', '/node/world-manifesto') }); assert.equal(state.kind, 'settled')

for (const type of ['CANCEL', 'ROUTE_ERROR', 'UNMOUNT'] as const) {
  const active = reduceMigrationState({ kind: 'idle' }, { type: 'START', source, target })
  assert.equal(reduceMigrationState(active, { type }).kind, 'idle', `${type} 必须回到 idle`)
}
assert.equal(reduceMigrationState({ kind: 'idle' }, { type: 'START', source, target, reduced: true }).kind, 'reduced')
assert.equal(reduceMigrationState({ kind: 'idle' }, { type: 'TRANSIT' }).kind, 'idle')

const files = {
  island: 'src/components/product/WorldGatewayStage.tsx',
  star: 'src/components/atlas/AtlasInspector.tsx',
  ripple: 'src/components/timeline/TimelineRiverStage.tsx',
  document: 'src/components/archive/ArchiveView.tsx',
  waypoint: 'src/components/paths/JourneyRouteStage.tsx',
  beam: 'src/components/node/NodePlaceRoom.tsx',
}
for (const [object, file] of Object.entries(files)) assert.match(fs.readFileSync(file, 'utf8'), new RegExp(`transitionObject: ['"]${object}['"]|destination=\\{direction\\}`), `${file} 缺少 ${object} 迁移对象`)
const layer = fs.readFileSync('src/components/world/migration/SceneMigrationLayer.tsx', 'utf8')
assert.doesNotMatch(layer, />\s*(正在|迁移中|离开|途中|抵达)\s*</, '迁移层不得展示工程步骤文字')
assert.match(fs.readFileSync('src/components/world/migration/SceneTransitionLink.tsx', 'utf8'), /startViewTransition/, '未试点 View Transition')

console.log('C6 migration check passed. states=idle/leaving/inTransit/arriving/settled reduced=true objects=6')
