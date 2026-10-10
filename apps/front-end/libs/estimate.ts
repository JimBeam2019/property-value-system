export type EstimateRequest = {
  square_footage: number
  bedrooms: number
  bathrooms: number
  year_built: number
  lot_size: number
  distance_to_city_center: number
  school_rating: number
}

export type EstimateResponse = {
  property: EstimateRequest
  predicted_price: number
}

/**
 * Get Property Estimate API
 * @param payload EstimateRequest
 * @returns Promise<EstimateResponse>
 */
export const getPropertyEstimate = async (
  payload: EstimateRequest
): Promise<EstimateResponse> => {
  const url = new URL(`${process.env.ESTIMATOR_SERVICE_URL}/estimates`)

  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
    cache: 'no-store',
  })

  if (!res.ok) {
    const errBody = await res.text()
    throw new Error(`Estimate request failed: ${res.status} ${errBody}`)
  }

  return res.json()
}
