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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <JsonLd data={websiteJsonLd()} />
        <WorldShell>{children}</WorldShell>
      </body>
    </html>
  )
}
