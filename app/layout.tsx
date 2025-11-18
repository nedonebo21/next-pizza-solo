import { Nunito } from 'next/font/google'

import { Header } from '@/widgets/header'

import type { Metadata } from 'next'
import type { ReactNode } from 'react'

import '@/shared/styles/globals.css'

const nunito = Nunito({
  subsets: ['cyrillic'],
  variable: '--font-nunito',
  weight: ['400', '500', '600', '700', '800', '900'],
})

export const metadata: Metadata = {
  title: 'Next Pizza | Главная',
  description: 'Next-Pizza is Dodo Pizza analogue by nedonebo21',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  return (
    <html lang={'en'}>
      <body className={nunito.className}>
        <main className={'min-h-screen bg-white'}>
          <Header />
          {children}
        </main>
      </body>
    </html>
  )
}
