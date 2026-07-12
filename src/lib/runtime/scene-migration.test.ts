import assert from 'node:assert/strict'
import test from 'node:test'
import { buildArrivalSceneContext, isMigrationReturnContextForPath, reduceMigrationState } from './scene-migration'
import { createSceneContext } from '@/lib/scenes/scene-destination'

test('迁移状态保持来源、途中、抵达和沉淀语义', () => {
  const source = { ...createSceneContext('atlas', '/atlas'), focusedObjectId: 'node-a' }
  const target = { href: '/node/a', sceneId: 'node' as const, objectId: 'node-a', transitionObject: 'star' as const, accessibleLabel: '进入 A' }
  const leaving = reduceMigrationState({ kind: 'idle' }, { type: 'START', source, target })
  const transit = reduceMigrationState(leaving, { type: 'TRANSIT' })
  const arriving = reduceMigrationState(transit, { type: 'ARRIVE' })
  assert.equal(leaving.kind, 'leaving')
  assert.equal(transit.kind, 'inTransit')
  assert.equal(arriving.kind, 'arriving')
  assert.deepEqual(buildArrivalSceneContext(createSceneContext('node', '/node/a'), arriving), { ...createSceneContext('node', '/node/a'), focusedObjectId: 'node-a' })
})

test('返回上下文只允许恢复同一路径的滚动和焦点', () => {
  const value = { schemaVersion: 1 as const, path: '/atlas', scrollX: 12, scrollY: 480, focusId: 'atlas-tech' }
  assert.equal(isMigrationReturnContextForPath(value, '/atlas'), true)
  assert.equal(isMigrationReturnContextForPath(value, '/node/a'), false)
  assert.equal(isMigrationReturnContextForPath({ ...value, scrollY: -1 }, '/atlas'), false)
})
