import Image from 'next/image'
import Logo from '@/shared/assets/images/logo.png'
import { Typography } from '@/shared/ui'
import Link from 'next/link'

export const HeaderLogo = () => {
  return (
    <Link href={'/'} className={'flex items-center gap-4'}>
      <Image src={Logo} alt={'logo'} />
      <div className={'flex flex-col gap-1'}>
        <Typography
          variant={'title'}
          as={'h1'}
          textAlign={'left'}
          className={'font-black uppercase'}
        >
          Next Pizza
        </Typography>
        <Typography
          variant={'bodyNormal'}
          as={'p'}
          textAlign={'left'}
          className={'text-gray-400 leading-3'}
        >
          by nedonebo21
        </Typography>
      </div>
    </Link>
  )
}
