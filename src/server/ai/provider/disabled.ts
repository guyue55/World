import type { LighthouseProvider } from './types'

export function createDisabledLighthouseProvider(): LighthouseProvider {
  return {
    id: 'disabled',
    enabled: false,
    async answer() {
      return { status: 'disabled', reason: '未配置合法的服务端 AI Provider 凭据。' }
    },
  }
}
