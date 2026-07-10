import assert from 'node:assert/strict'
import fs from 'node:fs'
import { getPublicWorldObjectIndex } from '../src/lib/public-world-objects'
import { buildTimelineViewModel } from '../src/lib/scenes/build-timeline-model'
import { buildArchiveViewModel } from '../src/lib/scenes/build-archive-model'

const index = getPublicWorldObjectIndex()
const timeline = buildTimelineViewModel(index)
const timelineAgain = buildTimelineViewModel(index)
const archive = buildArchiveViewModel(index)
const archiveAgain = buildArchiveViewModel(index)

assert.deepEqual(timeline, timelineAgain, 'Timeline 模型必须确定性生成')
assert.deepEqual(archive, archiveAgain, 'Archive 模型必须确定性生成')
assert.equal(timeline.events.length, index.events.length, '全部公开事件必须进入时间河模型')
assert.equal(timeline.anchors.length, new Set(index.events.map((event) => event.date)).size, '每个公开日期必须有稳定时间锚')
assert.ok(timeline.anchors.every((anchor) => anchor.eventIds.length > 0), '不得生成空时间锚')
assert.equal(new Set(timeline.events.map((event) => event.id)).size, timeline.events.length, '时间事件不得重复')

assert.equal(archive.shelves.length, 8, '档案馆必须有八个一级区域分区')
assert.equal(archive.records.length, index.nodes.length, '全部公开节点必须进入馆藏模型')
assert.equal(new Set(archive.records.map((record) => record.id)).size, archive.records.length, '公开卷宗不得重复')
assert.equal(archive.shelves.reduce((count, shelf) => count + shelf.recordIds.length, 0), archive.records.length, '每卷公开记录必须且只能进入一个书架')
for (const record of archive.records) assert.ok(index.nodeById.has(record.id), `馆藏包含非公开节点：${record.id}`)

const timelinePage = fs.readFileSync('src/app/timeline/page.tsx', 'utf8')
const archivePage = fs.readFileSync('src/app/archive/page.tsx', 'utf8')
for (const retired of ['TimelineHero', 'TimelineStats', 'TimelineRiverRuntime', 'TimelineEventStream', 'ProductRouteGuide', 'SceneDeepInteractionPanel']) {
  assert.ok(!timelinePage.includes(retired), `Timeline 路由仍引用旧骨架组件：${retired}`)
}
for (const retired of ['SceneWorldPortal', 'ProductRouteGuide', 'SceneDeepInteractionPanel', 'ArchiveDynamicGuide']) {
  assert.ok(!archivePage.includes(retired), `Archive 路由仍引用旧骨架组件：${retired}`)
}
const archiveView = fs.readFileSync('src/components/archive/ArchiveView.tsx', 'utf8')
assert.match(archiveView, /import\('fuse\.js'\)/, 'Fuse.js 必须由输入后的动态 import 加载')
assert.ok(!archiveView.includes("from '@/lib/search'"), 'Archive 首屏不得静态导入 Fuse 搜索封装')

console.log(`C4 scene check passed. anchors=${timeline.anchors.length} events=${timeline.events.length} shelves=${archive.shelves.length} records=${archive.records.length}`)
