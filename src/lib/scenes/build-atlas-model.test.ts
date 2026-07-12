import assert from 'node:assert/strict'
import test from 'node:test'
import { projectAtlasNodePosition } from './build-atlas-model'

test('同一区域前六个代表节点使用不重复轨道', () => {
  const points = Array.from({ length: 6 }, (_, index) => projectAtlasNodePosition({ x: 50, y: 50 }, index, { width: 100, height: 100 }))
  assert.equal(new Set(points.map((point) => `${point.x},${point.y}`)).size, 6)
  assert.ok(points.every((point) => point.x >= 4 && point.x <= 96 && point.y >= 5 && point.y <= 95))
})
