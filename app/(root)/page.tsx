import { Home } from '@/pages/home'

import type { GetSearchParams } from '@/features/browse-products'

type PageProps = {
  searchParams: GetSearchParams
}

export default async function Page({ searchParams }: PageProps) {
  const resolvedParams = await searchParams

  return <Home searchParams={resolvedParams} />
}
