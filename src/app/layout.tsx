import './globals.css'
import { WorldShell } from '@/components/world/WorldShell'
import { JsonLd } from '@/components/common/JsonLd'
import { createPageMetadata } from '@/lib/metadata'
import { websiteJsonLd } from '@/lib/jsonld'
import { StaticGatewayNoScript } from '@/components/product/StaticGatewayNoScript'
import { getPublicWorldObjectIndex } from '@/lib/public-world-objects'
import { buildGatewayModel } from '@/lib/scenes/build-gateway-model'

export const metadata = createPageMetadata()

export const viewport = {
  themeColor: '#0a0a0a',
  manifest: '/manifest.json',
}

const themeInitScript = `(function(){try{var k='guyue-world:theme';var s=localStorage.getItem(k);var m=window.matchMedia('(prefers-color-scheme: dark)').matches;var d=s?s==='dark':m;var c=document.documentElement.classList;if(d){c.add('dark')}}catch(e){}})()`

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const staticGateway = buildGatewayModel(getPublicWorldObjectIndex())

  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <JsonLd data={websiteJsonLd()} />
        <noscript><StaticGatewayNoScript model={staticGateway} /></noscript>
        <WorldShell>{children}</WorldShell>
      </body>
    </html>
  )
}
