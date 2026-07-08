import './globals.css'
import { WorldShell } from '@/components/world/WorldShell'
import { JsonLd } from '@/components/common/JsonLd'
import { createPageMetadata } from '@/lib/metadata'
import { websiteJsonLd } from '@/lib/jsonld'

export const metadata = createPageMetadata()

export const viewport = {
  themeColor: '#0a0a0a',
  manifest: '/manifest.json',
}

const themeInitScript = `(function(){try{var k='guyue-world:theme';var s=localStorage.getItem(k);var m=window.matchMedia('(prefers-color-scheme: dark)').matches;var d=s?s==='dark':m;var c=document.documentElement.classList;if(d){c.add('dark')}}catch(e){}})()`

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <JsonLd data={websiteJsonLd()} />
        <WorldShell>{children}</WorldShell>
      </body>
    </html>
  )
}
