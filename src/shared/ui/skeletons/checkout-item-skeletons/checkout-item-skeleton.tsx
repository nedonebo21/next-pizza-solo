import { Skeleton } from '@/shared/ui'

export const CheckoutItemSkeleton = () => {
  return (
    <div className={'flex items-center justify-between'}>
      <div className={'flex items-center gap-5'}>
        <Skeleton className={'w-[50px] h-[50px] rounded-full'} />
        <Skeleton className={'w-40 h-5 rounded'} />
      </div>
      <Skeleton className={'h-5 w-10 rounded'} />
      <Skeleton className={'h-8 w-[133px] rounded'} />
    </div>
  )
}
