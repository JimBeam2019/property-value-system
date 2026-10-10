import 'server-only'

import { MarketFilterRanges } from '@/types/market'

/**
 * Get Market Filter Ranges API
 * @returns Promise<MarketFilterRanges>
 */
export const getMarketFilterRanges = async (): Promise<MarketFilterRanges> => {
  const url = new URL(
    `${process.env.MARKET_ANALYSES_SERVICE_URL}/filter-ranges`
  )

  const res = await fetch(url, { method: 'GET', cache: 'no-store' })

  if (!res.ok) {
    const errBody = await res.text()
    throw new Error(`Market request failed: ${res.status} ${errBody}`)
  }

  return res.json()
}
