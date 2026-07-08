// 用途：检测 AI 灯塔可用性，决定是否进入低光模式

export type LighthouseMode = 'full' | 'low-light'

export function getLighthouseMode(): LighthouseMode {
  if (typeof window !== 'undefined') return 'low-light'
  const hasKey = Boolean(process.env.OPENAI_API_KEY)
  return hasKey ? 'full' : 'low-light'
}

export function isLighthouseAvailable(): boolean {
  return getLighthouseMode() === 'full'
}
