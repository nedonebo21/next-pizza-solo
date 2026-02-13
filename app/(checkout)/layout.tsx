import { Metadata } from 'next'
import { ReactNode } from 'react'
import { Header } from '@/widgets/header'
import { Container } from '@/shared/ui'

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
