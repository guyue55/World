import { lighthouseProviderOutputSchema, type LighthouseProvider, type LighthouseProviderResult } from './types'

type OpenAIResponse = {
  output_text?: string
  output?: Array<{ content?: Array<{ type?: string; text?: string }> }>
  usage?: { input_tokens?: number; output_tokens?: number }
}

function readOutputText(response: OpenAIResponse) {
  if (response.output_text) return response.output_text
  return response.output?.flatMap((item) => item.content ?? []).find((item) => item.type === 'output_text')?.text ?? ''
}

export function createOpenAILighthouseProvider(options: { apiKey?: string; model?: string; fetchImpl?: typeof fetch } = {}): LighthouseProvider {
  const apiKey = options.apiKey ?? process.env.OPENAI_API_KEY
  const model = options.model ?? process.env.OPENAI_LIGHTHOUSE_MODEL ?? 'gpt-4.1-mini'
  const fetchImpl = options.fetchImpl ?? fetch

  return {
    id: 'openai',
    enabled: Boolean(apiKey),
    async answer(request): Promise<LighthouseProviderResult> {
      if (!apiKey) return { status: 'disabled', reason: 'OPENAI_API_KEY 未配置。' }
      try {
        const response = await fetchImpl('https://api.openai.com/v1/responses', {
          method: 'POST',
          headers: { authorization: `Bearer ${apiKey}`, 'content-type': 'application/json' },
          signal: request.signal,
          body: JSON.stringify({
            model,
            store: false,
            instructions: '你是古月浮屿的只读灯塔。只能依据给定公开上下文，用简洁中文回答。sourceIds 只能使用上下文中的 id；证据不足时明确说不知道。',
            input: JSON.stringify({ question: request.question, publicContext: request.context }),
            text: {
              format: {
                type: 'json_schema',
                name: 'worldos_lighthouse_answer',
                strict: true,
                schema: {
                  type: 'object',
                  additionalProperties: false,
                  required: ['answer', 'sourceIds'],
                  properties: {
                    answer: { type: 'string' },
                    sourceIds: { type: 'array', items: { type: 'string' }, maxItems: 6 },
                  },
                },
              },
            },
          }),
        })
        if (!response.ok) return { status: 'error', reason: `OpenAI HTTP ${response.status}`, provider: 'openai', model }
        const payload = await response.json() as OpenAIResponse
        const parsedJson = JSON.parse(readOutputText(payload)) as unknown
        const parsed = lighthouseProviderOutputSchema.safeParse(parsedJson)
        if (!parsed.success) return { status: 'invalid', reason: 'Provider 输出未通过结构校验。', provider: 'openai', model }
        return { status: 'success', output: parsed.data, provider: 'openai', model, inputTokens: payload.usage?.input_tokens, outputTokens: payload.usage?.output_tokens }
      } catch (error) {
        if (request.signal.aborted) return { status: 'timeout', reason: 'Provider 请求超时或被取消。', provider: 'openai', model }
        return { status: 'error', reason: error instanceof Error ? error.message : 'Provider 请求失败。', provider: 'openai', model }
      }
    },
  }
}
