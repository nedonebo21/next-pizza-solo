import { ReactNode } from 'react'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Next Pizza | Dashboard',
  description: 'Next-Pizza is Dodo Pizza analogue by nedonebo21',
}

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <html lang={'en'}>
      <body>{children}</body>
    </html>
  )
}
