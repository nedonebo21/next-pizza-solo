import { Nunito } from 'next/font/google'

import type { ReactNode } from 'react'

import '@/shared/styles/globals.css'
import { Toaster } from 'react-hot-toast'
import { Providers } from '@/app/providers/providers'

const nunito = Nunito({
  subsets: ['cyrillic'],
  variable: '--font-nunito',
  weight: ['400', '500', '600', '700', '800', '900'],
})

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  return (
    <html lang={'en'}>
      <body className={nunito.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
