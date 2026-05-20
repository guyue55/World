import https from 'node:https'
import http from 'node:http'
import previewSmokeConfig from '../data/preview-smoke-config.json'

const baseUrl = process.env[previewSmokeConfig.previewUrlEnv]

function request(url: string) {
  return new Promise<number>((resolve, reject) => {
    const client = url.startsWith('https://') ? https : http
    const req = client.request(url, { method: 'HEAD' }, (res) => {
      resolve(res.statusCode ?? 0)
    })
    req.on('error', reject)
    req.setTimeout(10000, () => {
      req.destroy(new Error('request timeout'))
    })
    req.end()
  })
}

async function main() {
  if (!baseUrl) {
    console.log(`Missing ${previewSmokeConfig.previewUrlEnv}. Example: GUYUE_PREVIEW_URL=https://example.vercel.app npm run preview:smoke`)
    process.exit(2)
  }

  let failed = false
  for (const route of previewSmokeConfig.routes) {
    const url = new URL(route.route, baseUrl).toString()
    try {
      const status = await request(url)
      console.log(`${status} ${url}`)
      if (status < 200 || status >= 400) failed = true
    } catch (error) {
      failed = true
      console.log(`ERROR ${url} ${(error as Error).message}`)
    }
  }

  process.exit(failed ? 1 : 0)
}

main()
