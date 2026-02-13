import { Skeleton } from '@/shared/ui'

export const CheckoutItemSkeleton = () => {
  return (
    <div className={'flex items-center justify-between'}>
      <div className={'flex items-center gap-5'}>
        <Skeleton className={'w-[50px] h-[50px] bg-gray-200 rounded-full'} />
        <Skeleton className={'w-40 h-5 bg-gray-200 rounded'} />
      </div>
      <Skeleton className={'h-5 w-10 bg-gray-200 rounded'} />
      <Skeleton className={'h-8 w-[133px] bg-gray-200 rounded'} />
    </div>
  )
}
