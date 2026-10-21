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
  PriceByBedrooms,
  PriceBySize,
  PriceByYearBuilt,
} from '@/types/market'
import { fetcher, fetcherWithParams } from '@/libs/fetcher'

export interface MarketContextType {
  marketFilterRanges: MarketFilterRanges | null
  currentProperty: MarketPropertyType | null
  newProperty: MarketPropertyType | null
  marketProperties: MarketPropertiesResponse | undefined
  marketStatistics: MarketStatisticsResponse | undefined
  marketPricesByYearBuilt: PriceByYearBuilt[] | undefined
  marketPricesBySize: PriceBySize[] | undefined
  marketPricesByBedrooms: PriceByBedrooms[] | undefined
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

  const { data: statsData, isLoading: isLoadingStats } = useSWR(
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

  const { data: priceByYearBuiltData, isLoading: isLoadingPriceByYearBuilt } =
    useSWR(
      marketFilterRanges
        ? [
            '/api/market/price-by-year-built',
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

  const { data: priceBySizeData, isLoading: isLoadingPriceBySize } = useSWR(
    marketFilterRanges
      ? [
          '/api/market/price-by-size',
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

  const { data: priceByBedroomsData, isLoading: isLoadingPriceByBedrooms } =
    useSWR(
      marketFilterRanges
        ? [
            '/api/market/price-by-bedrooms',
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
      !isLoadingStats && statsData
        ? (statsData as MarketStatisticsResponse)
        : undefined,
    [statsData, isLoadingStats]
  )

  const marketPricesByYearBuilt = useMemo(
    () =>
      !isLoadingPriceByYearBuilt && priceByYearBuiltData
        ? (priceByYearBuiltData as PriceByYearBuilt[])
        : undefined,
    [isLoadingPriceByYearBuilt, priceByYearBuiltData]
  )

  const marketPricesBySize = useMemo(
    () =>
      !isLoadingPriceBySize && priceBySizeData
        ? (priceBySizeData as PriceBySize[])
        : undefined,
    [isLoadingPriceBySize, priceBySizeData]
  )

  const marketPricesByBedrooms = useMemo(
    () =>
      !isLoadingPriceByBedrooms && priceByBedroomsData
        ? (priceByBedroomsData as PriceByBedrooms[])
        : undefined,
    [isLoadingPriceByBedrooms, priceByBedroomsData]
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
      marketPricesByYearBuilt,
      marketPricesBySize,
      marketPricesByBedrooms,
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
      marketPricesByBedrooms,
      marketPricesBySize,
      marketPricesByYearBuilt,
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
