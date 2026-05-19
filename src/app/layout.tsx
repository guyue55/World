import './globals.css'
import { WorldShell } from '@/components/world/WorldShell'
import { JsonLd } from '@/components/common/JsonLd'
import { createPageMetadata } from '@/lib/metadata'
import { websiteJsonLd } from '@/lib/jsonld'

export const metadata = createPageMetadata()

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN">
      <body>
        <JsonLd data={websiteJsonLd()} />
        <WorldShell>{children}</WorldShell>
      </body>
    </html>
  )
}
