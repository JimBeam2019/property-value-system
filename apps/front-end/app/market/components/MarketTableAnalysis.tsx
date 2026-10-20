'use client'

import { useMemo } from 'react'

import { MarketPropertyType } from '@/types/market'
import PropertyTable from './PropertyTable'
import { useMarket } from '../context/MarketProvider'
import MarketWhatIfAnalysis from './MarketWhatIfAnalysis'

/**
 * Market Table Analysis
 *
 * @return {*}
 */
const MarketTableAnalysis = () => {
  const {
    newProperty,
    marketProperties,
    changeCurrentProperty,
    changeNewProperty,
  } = useMarket()

  const properties = useMemo(() => {
    if (!marketProperties || marketProperties.properties.length === 0) return []

    return marketProperties.properties.map(
      (
        {
          squareFootage,
          bedrooms,
          bathrooms,
          yearBuilt,
          lotSize,
          schoolRating,
          distanceToCityCenter,
          price,
        },
        index
      ) =>
        ({
          squareFootage,
          bedrooms,
          bathrooms,
          yearBuilt,
          lotSize,
          schoolRating,
          distanceToCityCenter,
          price,
          id: index + 1,
        }) as MarketPropertyType
    )
  }, [marketProperties])

  if (!marketProperties) {
    return (
      <>
        <p>🌀 Loading Market Analysis...</p>
      </>
    )
  }

  return (
    <div className="m-4">
      <div className="w-full overflow-x-auto rounded-lg border border-gray-200 bg-white shadow-sm">
        <div className="rounded-xl bg-white p-6 shadow-sm">
          <PropertyTable
            data={properties}
            onSelect={(property) => {
              changeCurrentProperty(property)

              if (newProperty && property.id !== newProperty.id)
                changeNewProperty(null)
            }}
          />

          <MarketWhatIfAnalysis />
        </div>
      </div>
    </div>
  )
}

export default MarketTableAnalysis
