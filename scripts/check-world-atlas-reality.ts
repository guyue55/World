import assert from 'node:assert/strict'
import fs from 'node:fs'
import { buildAtlasViewModel } from '../src/lib/scenes/build-atlas-model'
import { getPublicWorldObjectIndex } from '../src/lib/public-world-objects'
import { getPublicWorldCuration } from '../src/lib/public-world-curation'

const index = getPublicWorldObjectIndex()
const first = buildAtlasViewModel(index)
const second = buildAtlasViewModel(index)
const curation = getPublicWorldCuration()

assert.deepEqual(first, second, '相同事实源必须生成完全稳定的 Atlas 布局')
assert.equal(first.areas.length, 8, 'Atlas 必须包含八座一级区域浮屿')
assert.equal(first.nodes.length, 24, '首屏只投影每区三个代表地点')
assert.equal(first.links.length, 8, '区域关系线必须来自公开区域关系事实源')
assert.equal(new Set(first.areas.map((area) => area.id)).size, first.areas.length, '区域不得重复')
assert.equal(new Set(first.nodes.map((node) => node.id)).size, first.nodes.length, '代表地点不得重复')

for (const area of first.areas) {
  assert.ok(area.x >= 0 && area.x <= 100 && area.y >= 0 && area.y <= 100, `区域坐标越界：${area.id}`)
  assert.deepEqual(area.representativeNodeIds, curation.representativeNodeIdsByArea[area.id], `区域策展事实不一致：${area.id}`)
}
for (const node of first.nodes) {
  assert.ok(index.nodeById.has(node.id), `Atlas 引用了非公开或不存在节点：${node.id}`)
  assert.ok(node.x >= 0 && node.x <= 100 && node.y >= 0 && node.y <= 100, `节点坐标越界：${node.id}`)
}

const pageSource = fs.readFileSync('src/app/atlas/page.tsx', 'utf8')
for (const retired of ['AtlasHero', 'AtlasStats', 'AtlasLiveConstellation', 'ProductRouteGuide', 'SceneDeepInteractionPanel', 'AreaNodeCluster']) {
  assert.ok(!pageSource.includes(retired), `Atlas 公开路由仍引用旧骨架组件：${retired}`)
}

console.log(`Atlas reality check passed. areas=${first.areas.length} representativeNodes=${first.nodes.length} links=${first.links.length} totalPublicNodes=${first.totalPublicNodeCount}`)
