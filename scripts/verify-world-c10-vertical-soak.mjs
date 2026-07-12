import fs from 'node:fs'
import path from 'node:path'

const reportPath = path.resolve(process.argv[2] || 'docs/90-archive/reports/worldos-living-world/checkpoint-c/c10-2026-07-12/evidence/c10-vertical-soak-600s.json')
const report = JSON.parse(fs.readFileSync(reportPath, 'utf8'))
const failures = []
const check = (condition, message) => { if (!condition) failures.push(message) }

check(report.mode === 'full-600-second', '不是正式十分钟报告')
check(report.wallElapsedSeconds >= 600 && report.monotonicElapsedSeconds >= 600, '墙钟或单调时钟不足十分钟')
check(Date.parse(report.finishedAt) - Date.parse(report.startedAt) >= 600_000, 'ISO 时间边界不足十分钟')
check(report.hiddenElapsedSeconds >= 120, '后台时间不足两分钟')
check(report.continuousWallClock === true && report.edited === false && report.repeatedAssembly === false, 'soak 连续性声明异常')
check(Array.isArray(report.samples) && report.samples.length >= 90, '时序样本不足')

const epochs = new Set(report.samples.map((sample) => sample.runtime?.worldTimeEpoch).filter(Boolean))
check(epochs.size >= 2, '原始样本未证明 minute tick')
const action = (type) => report.actions?.find((item) => item.type === type)
check(Boolean(action('relation-node-round-trip')?.firstNodePath) && Boolean(action('relation-node-round-trip')?.relatedNodePath), '缺少关系 Node 往返')
check(action('hidden-recovery')?.hiddenElapsedSeconds >= 120 && action('hidden-recovery')?.resumed === true, '后台恢复动作失败')
check(Boolean(action('audio-toggle')), '缺少声音启停')
check(action('memory-clear')?.clicked === true && action('memory-clear')?.afterKeys?.every((key) => key.includes('cleared')), '记忆清除失败')

const intervals = report.frame?.sampleIntervalsMs ?? []
const sorted = [...intervals].sort((a, b) => a - b)
const p95 = sorted[Math.min(sorted.length - 1, Math.floor(sorted.length * 0.95))]
check(intervals.length >= 3_000 && report.frame.count >= 10_000, '持续帧原始样本不足')
check(Number.isFinite(p95) && p95 <= 34 && Math.abs(p95 - report.frame.p95Ms) < 0.001, '帧 p95 回算失败或越界')

const tail = report.samples.filter((sample) => String(sample.label).startsWith('settled-tail')).slice(-12)
check(tail.length >= 12, '稳定尾段样本不足')
check(new Set(tail.map((sample) => sample.metrics.JSEventListeners)).size === 1, '稳定尾段 listener 仍在增长')
check(new Set(tail.map((sample) => sample.metrics.Nodes)).size === 1, '稳定尾段 DOM nodes 仍在增长')
check(report.resources?.settledGrowth?.heapBytes <= 2 * 1024 * 1024, '稳定尾段 heap 增长越界')
check(report.resources?.settledGrowth?.listeners <= 2 && report.resources?.settledGrowth?.nodes <= 8, '稳定尾段资源增长越界')

const events = report.audioEvents ?? []
const count = (type) => events.filter((event) => event.type === type).length
check(count('construct') === 1, 'AudioContext 构造数不为一')
check(count('suspended') >= 2 && count('resumed') >= 2, '声音后台或启停生命周期不完整')
check(count('source-start') - count('source-ended') === report.resources?.activeOscillators, 'oscillator start/end 账不平')
check(report.resources?.activeOscillators === 4 && report.resources?.audioContexts === 1, 'Gateway 终态声音资源异常')

const final = report.samples.at(-1)?.runtime
check(final?.ambient?.length === 1 && final.ambient[0].scene === 'gateway' && final.ambient[0].state === 'running', '终态 adapter 不唯一或未运行')
check(final?.audio?.constructed === 1 && final.audio.states?.[0] === 'running', '终态 AudioContext 异常')
check((report.browserErrors ?? []).length === 0, '存在浏览器错误')
check((report.failures ?? []).length === 0, '采集器记录了失败')

if (failures.length) {
  console.error('C.10 vertical soak verification failed:')
  failures.forEach((failure) => console.error(`- ${failure}`))
  process.exit(1)
}

console.log(`C.10 vertical soak verified from raw samples: seconds=${report.wallElapsedSeconds} samples=${report.samples.length} frames=${report.frame.count} p95=${p95.toFixed(2)}ms audioEvents=${events.length}`)
