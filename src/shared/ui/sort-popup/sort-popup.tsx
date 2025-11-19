import { ComponentProps } from 'react'
import { cn } from '@/shared/lib/utils'
import { ArrowUpDown } from 'lucide-react'
import { Typography } from '@/shared/ui/typography'

type SortPopupProps = Omit<ComponentProps<'div'>, 'children'>

export const SortPopup = ({ className, ...rest }: SortPopupProps) => {
  return (
    <div
      className={cn(
        'inline-flex items-center gap-2 bg-gray-50 px-4 h-[52px] rounded-2xl cursor-pointer',
        className
      )}
      {...rest}
    >
      <ArrowUpDown size={16} />
      <Typography variant={'bodyNormal'}>Сортировка:</Typography>
      <Typography variant={'bodyNormal'} className={'text-primary'}>
        Популярное
      </Typography>
    </div>
  )
}
