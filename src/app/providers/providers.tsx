'use client'

import { SessionProvider } from 'next-auth/react'
import NextTopLoader from 'nextjs-toploader'
import { Toaster } from 'react-hot-toast'

import type { ReactNode } from 'react'

export const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <SessionProvider>{children}</SessionProvider>
      <Toaster />
      <NextTopLoader />
    </>
  )
}
