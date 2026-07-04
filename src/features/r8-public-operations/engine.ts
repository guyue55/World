import { getR8CriticalRisks, r8CalendarItems, r8OperationsCadence, r8WorldReleaseLog } from './data'

export function describeR8PublicPulse(): string {
  const planned = r8CalendarItems.filter((item) => item.status === 'planned').length
  const risks = getR8CriticalRisks().length
  return `公开运营节奏已建立：${planned} 个计划项，${risks} 个高优先级风险被显式看管。`
}

export function getNextR8OperatingRitual(): string {
  const ritual = r8OperationsCadence[0]
  return ritual ? `${ritual.name}：${ritual.actions.join(' / ')}` : '暂无运营仪式'
}

export function getLatestR8PublicLogTitle(): string {
  const latest = r8WorldReleaseLog[0]
  return latest ? latest.title : '暂无公开日志'
}
