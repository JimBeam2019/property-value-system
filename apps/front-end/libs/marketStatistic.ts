import 'server-only'

import { MarketFilterRanges } from '@/types/market'
/**
 * ! Deprecated
 * @param param0
 * @returns
 */
export const getMarketStatistic = async ({
  marketFilters,
}: {
  marketFilters: MarketFilterRanges
}) => {
  const url = new URL(`${process.env.MARKET_ANALYSES_SERVICE_URL}/statistics`)

  const params = new URLSearchParams()
  params.append('minBedrooms', marketFilters.minPrice.toString())
  params.append('maxBedrooms', marketFilters.maxBedrooms.toString())

  url.search = params.toString()

  const res = await fetch(url, { method: 'GET', cache: 'no-store' })

  if (!res.ok) {
    const errBody = await res.text()
    throw new Error(`Market request failed: ${res.status} ${errBody}`)
  }

  return res.json()
}
