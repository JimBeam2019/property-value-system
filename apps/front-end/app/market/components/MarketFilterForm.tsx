'use client'

import RangeSlider from '@/app/components/RangeSlider'
import { MarketFilterRanges } from '@/types/market'
import { SubmitEvent, useCallback, useState } from 'react'
import { useMarket } from '../context/MarketProvider'
import useEffectOnce from '@/libs/useEffectOnce'

/**
 * Market Filter Form
 *
 * @param {{
 *   marketFilterRanges: MarketFilterRanges
 * }} {
 *   marketFilterRanges,
 * }
 * @return {*}
 */
const MarketFilterForm = ({
  marketFilterRanges,
}: {
  marketFilterRanges: MarketFilterRanges
}) => {
  const {
    minPrice,
    maxPrice,
    minBedrooms,
    maxBedrooms,
    minYearBuilt,
    maxYearBuilt,
    minSquareFootage,
    maxSquareFootage,
    minSchoolRating,
    maxSchoolRating,
  } = marketFilterRanges

  const { addMarketFilterRanges } = useMarket()

  const [price, setPrice] = useState<[number, number]>([
    Math.floor(minPrice),
    Math.floor(maxPrice),
  ])
  const [bedrooms, setBedrooms] = useState<[number, number]>([
    minBedrooms,
    maxBedrooms,
  ])
  const [yearBuilt, setYearBuilt] = useState<[number, number]>([
    minYearBuilt,
    maxYearBuilt,
  ])
  const [squareFootage, setSquareFootage] = useState<[number, number]>([
    minSquareFootage,
    maxSquareFootage,
  ])
  const [schoolRating, setSchoolRating] = useState<[number, number]>([
    minSchoolRating,
    maxSchoolRating,
  ])

  useEffectOnce(() => {
    if (marketFilterRanges) addMarketFilterRanges(marketFilterRanges)
  })

  const handleSubmit = useCallback(
    (event: SubmitEvent<HTMLFormElement>) => {
      event.preventDefault()

      addMarketFilterRanges({
        minPrice: price[0],
        maxPrice: price[1],
        minBedrooms: bedrooms[0],
        maxBedrooms: bedrooms[1],
        minYearBuilt: yearBuilt[0],
        maxYearBuilt: yearBuilt[1],
        minSquareFootage: squareFootage[0],
        maxSquareFootage: squareFootage[1],
        minSchoolRating: schoolRating[0],
        maxSchoolRating: schoolRating[1],
      })
    },
    [
      addMarketFilterRanges,
      bedrooms,
      price,
      schoolRating,
      squareFootage,
      yearBuilt,
    ]
  )

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <form onSubmit={handleSubmit}>
        <div className="py-6">
          <RangeSlider
            label="Price"
            min={Math.floor(minPrice)}
            max={Math.floor(maxPrice)}
            value={price}
            onChange={setPrice}
          />
        </div>

        <div className="py-6">
          <RangeSlider
            label="Bedrooms"
            min={minBedrooms}
            max={maxBedrooms}
            value={bedrooms}
            onChange={setBedrooms}
          />
        </div>

        <div className="py-6">
          <RangeSlider
            label="Year Built"
            min={minYearBuilt}
            max={maxYearBuilt}
            value={yearBuilt}
            onChange={setYearBuilt}
          />
        </div>

        <div className="py-6">
          <RangeSlider
            label="Square Footage"
            min={minSquareFootage}
            max={maxSquareFootage}
            step={10}
            value={squareFootage}
            onChange={setSquareFootage}
            formatValue={(value) => `${value.toLocaleString()} sq ft`}
          />
        </div>

        <div className="py-6">
          <RangeSlider
            label="School Rating"
            min={minSchoolRating}
            max={maxSchoolRating}
            step={0.1}
            value={schoolRating}
            onChange={setSchoolRating}
          />
        </div>

        <button
          type="submit"
          className="mt-6 w-full rounded-md bg-blue-600 px-4 py-2.5 text-sm font-medium
          text-white shadow-sm transition-colors
          hover:bg-blue-700
          focus:outline-none focus:ring-2 focus:ring-blue-300
          disabled:cursor-not-allowed disabled:bg-blue-300
          sm:w-auto"
        >
          Apply
        </button>
      </form>
    </div>
  )
}

export default MarketFilterForm
