import assert from 'node:assert/strict'
import test from 'node:test'
import { buildWorldTimeSnapshot, WORLD_TIME_ZONE } from './clock'

const epoch = (iso: string) => new Date(iso).getTime()
const closeTo = (actual: number, expected: number, tolerance = 1e-8) => assert.ok(Math.abs(actual - expected) <= tolerance, `${actual} != ${expected}`)

test('项目时区固定为 Asia/Shanghai，且同一 epoch 在不同时区产生不同墙上时间', () => {
  assert.equal(WORLD_TIME_ZONE, 'Asia/Shanghai')
  const now = epoch('2026-07-12T00:30:00.000Z')
  const shanghai = buildWorldTimeSnapshot(now, WORLD_TIME_ZONE)
  const utc = buildWorldTimeSnapshot(now, 'UTC')
  assert.equal(shanghai.worldDateKey, '2026-07-12')
  assert.equal(shanghai.dayPeriod, 'dawn')
  closeTo(shanghai.dayProgress, 8.5 / 24)
  assert.equal(utc.dayPeriod, 'night')
  closeTo(utc.dayProgress, 0.5 / 24)
})

test('昼夜边界在 05/09/17/21 点稳定切换', () => {
  const cases = [
    ['2026-07-11T20:59:59.999Z', 'night'],
    ['2026-07-11T21:00:00.000Z', 'dawn'],
    ['2026-07-12T01:00:00.000Z', 'day'],
    ['2026-07-12T09:00:00.000Z', 'dusk'],
    ['2026-07-12T13:00:00.000Z', 'night'],
  ] as const
  for (const [iso, period] of cases) assert.equal(buildWorldTimeSnapshot(epoch(iso), WORLD_TIME_ZONE).dayPeriod, period)
})

test('四季从 3/6/9/12 月开始，并按真实日历区间计算进度', () => {
  const starts = [
    ['2026-02-28T16:00:00.000Z', 'spring'],
    ['2026-05-31T16:00:00.000Z', 'summer'],
    ['2026-08-31T16:00:00.000Z', 'autumn'],
    ['2026-11-30T16:00:00.000Z', 'winter'],
  ] as const
  for (const [iso, season] of starts) {
    const snapshot = buildWorldTimeSnapshot(epoch(iso), WORLD_TIME_ZONE)
    assert.equal(snapshot.season, season)
    closeTo(snapshot.seasonProgress, 0)
  }
  const leapWinter = buildWorldTimeSnapshot(epoch('2028-01-14T16:00:00.000Z'), WORLD_TIME_ZONE)
  assert.equal(leapWinter.season, 'winter')
  assert.ok(leapWinter.seasonProgress > 0.49 && leapWinter.seasonProgress < 0.51)
})

test('页面隐藏后使用当前 epoch 直接重算，不追补中间帧', () => {
  const before = buildWorldTimeSnapshot(epoch('2026-07-11T20:59:00.000Z'), WORLD_TIME_ZONE)
  const after = buildWorldTimeSnapshot(epoch('2026-07-11T21:01:00.000Z'), WORLD_TIME_ZONE)
  assert.equal(before.dayPeriod, 'night')
  assert.equal(after.dayPeriod, 'dawn')
  assert.equal(after.nowEpochMs - before.nowEpochMs, 120_000)
  assert.ok(after.dayProgress > before.dayProgress)
})

test('worldDateKey 和完整 snapshot 对相同输入保持确定性', () => {
  const now = epoch('2026-12-31T16:00:00.123Z')
  const first = buildWorldTimeSnapshot(now, WORLD_TIME_ZONE)
  const second = buildWorldTimeSnapshot(now, WORLD_TIME_ZONE)
  assert.deepEqual(first, second)
  assert.equal(first.worldDateKey, '2027-01-01')
  assert.equal(first.nowEpochMs, now)
})

test('拒绝非法 epoch 与时区', () => {
  assert.throws(() => buildWorldTimeSnapshot(Number.NaN, WORLD_TIME_ZONE), /epoch/i)
  assert.throws(() => buildWorldTimeSnapshot(Date.now(), 'Mars/Olympus'), /time zone|timezone|时区/i)
})
