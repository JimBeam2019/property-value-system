import { MarketPropertyResponse } from '@/types/market'

export type MarketWhatIfRequest = {
  squareFootage: number
  bedrooms: number
  bathrooms: number
  yearBuilt: number
  lotSize: number
  distanceToCityCenter: number
  schoolRating: number
}

/**
 * Post Market What-If API
 * @param payload MarketWhatIfRequest
 * @returns Promise<MarketPropertyResponse>
 */
export const postMarketWhatIf = async (
  payload: MarketWhatIfRequest
): Promise<MarketPropertyResponse> => {
  const url = new URL(`${process.env.MARKET_ANALYSES_SERVICE_URL}/what-if`)

  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
    cache: 'no-store',
  })

  if (!res.ok) {
    const errBody = await res.text()
    throw new Error(`Market What-If request failed: ${res.status} ${errBody}`)
  }

  return res.json()
}
