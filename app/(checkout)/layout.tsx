import { Container } from '@/shared/ui'
import { Header } from '@/widgets/header'

import type { Metadata } from 'next'
import type { ReactNode } from 'react'


export const metadata: Metadata = {
  title: 'Next Pizza | Cart',
  description: 'Next-Pizza is Dodo Pizza analogue by nedonebo21',
}

export default function CheckoutLayout({ children }: { children: ReactNode }) {
  return (
    <main className={'min-h-screen bg-[#f4f1ee]'}>
      <Container>
        <Header hasCart={false} hasSearch={false} className={'border-gray-200'} />
        {children}
      </Container>
    </main>
  )
}
