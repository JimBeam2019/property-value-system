'use client'

import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react'

import useSWR from 'swr'

import {
  MarketFilterRanges,
  MarketPropertiesResponse,
  MarketPropertyType,
  MarketStatisticsResponse,
} from '@/types/market'
import { fetcher, fetcherWithParams } from '@/libs/fetcher'

export interface MarketContextType {
  marketFilterRanges: MarketFilterRanges | null
  currentProperty: MarketPropertyType | null
  newProperty: MarketPropertyType | null
  marketProperties: MarketPropertiesResponse | undefined
  marketStatistics: MarketStatisticsResponse | undefined
  addMarketFilterRanges: (marketFilterRanges: MarketFilterRanges) => void
  changeCurrentProperty: (property: MarketPropertyType | null) => void
  changeNewProperty: (property: MarketPropertyType | null) => void
}

const MarketContext = createContext<MarketContextType | null>(null)

export const useMarket = (): MarketContextType => {
  const context = useContext(MarketContext)

  if (context === null) {
    throw new Error('useMarket must be used within a EstimateProvider')
  }

  return context
}

/**
 * Market Provider
 *
 * @param {{ children: ReactNode }} { children }
 * @return {*}
 */
const MarketProvider = ({ children }: { children: ReactNode }) => {
  const [marketFilterRanges, setMarketFilterRanges] =
    useState<MarketFilterRanges | null>(null)

  const [currentProperty, setCurrentProperty] =
    useState<MarketPropertyType | null>(null)
  const [newProperty, setNewProperty] = useState<MarketPropertyType | null>(
    null
  )

  const { data: statData, isLoading: isLoadingStats } = useSWR(
    marketFilterRanges
      ? [
          '/api/market/statistic',
          {
            minPrice: marketFilterRanges.minPrice,
            maxPrice: marketFilterRanges.maxPrice,
            minBedrooms: marketFilterRanges.minBedrooms,
            maxBedrooms: marketFilterRanges.maxBedrooms,
            minYearBuilt: marketFilterRanges.minYearBuilt,
            maxYearBuilt: marketFilterRanges.maxYearBuilt,
            minSquareFootage: marketFilterRanges.minSquareFootage,
            maxSquareFootage: marketFilterRanges.maxSquareFootage,
            minSchoolRating: marketFilterRanges.minSchoolRating,
            maxSchoolRating: marketFilterRanges.maxSchoolRating,
          },
        ]
      : null,
    fetcherWithParams,
    { dedupingInterval: 2_000, keepPreviousData: true }
  )

  const { data: propertyData, isLoading: isLoadingProperties } = useSWR(
    '/api/market/properties',
    fetcher,
    {
      dedupingInterval: 2_000,
      keepPreviousData: true,
    }
  )

  const marketStatistics = useMemo(
    () =>
      !isLoadingStats && statData
        ? (statData as MarketStatisticsResponse)
        : undefined,
    [statData, isLoadingStats]
  )

  const marketProperties = useMemo(
    () =>
      !isLoadingProperties && propertyData
        ? (propertyData as MarketPropertiesResponse)
        : undefined,
    [isLoadingProperties, propertyData]
  )

  const addMarketFilterRanges = useCallback(
    (marketFilterRanges: MarketFilterRanges) =>
      setMarketFilterRanges(marketFilterRanges),
    []
  )

  const changeCurrentProperty = useCallback(
    (property: MarketPropertyType | null) => setCurrentProperty(property),
    []
  )

  const changeNewProperty = useCallback(
    (property: MarketPropertyType | null) => setNewProperty(property),
    []
  )

  const contextValue = useMemo(
    () => ({
      marketFilterRanges,
      currentProperty,
      newProperty,
      marketProperties,
      marketStatistics,
      addMarketFilterRanges,
      changeCurrentProperty,
      changeNewProperty,
    }),
    [
      addMarketFilterRanges,
      changeCurrentProperty,
      changeNewProperty,
      currentProperty,
      marketFilterRanges,
      marketProperties,
      marketStatistics,
      newProperty,
    ]
  )

  return (
    <MarketContext.Provider value={contextValue}>
      {children}
    </MarketContext.Provider>
  )
}

export default MarketProvider
