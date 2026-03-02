import { Resend } from 'resend'

import type { ReactNode } from 'react'

export const sendEmail = async (to: string, subject: string, template: ReactNode) => {
  const resend = new Resend(process.env.NEXT_PUBLIC_RESEND_TOKEN)

  const { data, error } = await resend.emails.send({
    from: 'onboarding@resend.dev',
    to,
    subject,
    text: '',
    react: template,
  })

  if (error) {
    console.error(error)
  }

  return data
}
