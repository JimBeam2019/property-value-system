'use client'

import { currencyFormatter } from '@/libs/utils'
import { useMarket } from '../context/MarketProvider'

/**
 * Market Analysis Details
 *
 * @return {*}
 */
const MarketAnalysisDetails = () => {
  const { marketStatistics } = useMarket()

  if (!marketStatistics) {
    return <h2>🌀 Loading Market Statistics...</h2>
  }

  return (
    <div className="m-6">
      <div className="w-full rounded-lg border border-gray-200 bg-white shadow-md">
        <dl className="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4">
          <div className="gap-3 p-6">
            <dt className="text-xs font-medium uppercase tracking-wide text-gray-500">
              Total Properties:
            </dt>
            <dd className="mt-1 text-3xl font-semibold text-gray-600 sm:text-4xl">
              {marketStatistics.count}
            </dd>
          </div>

          <div className="gap-3 p-6">
            <dt className="text-xs font-medium uppercase tracking-wide text-gray-500">
              Average Price:
            </dt>
            <dd className="mt-1 text-3xl font-semibold text-gray-600 sm:text-4xl">
              {currencyFormatter.format(marketStatistics.averagePrice)}
            </dd>
          </div>

          <div className="gap-3 p-6">
            <dt className="text-xs font-medium uppercase tracking-wide text-gray-500">
              Median Price:
            </dt>
            <dd className="mt-1 text-3xl font-semibold text-gray-600 sm:text-4xl">
              {currencyFormatter.format(marketStatistics.medianPrice)}
            </dd>
          </div>

          <div className="gap-3 p-6">
            <dt className="text-xs font-medium uppercase tracking-wide text-gray-500">
              Min Price:
            </dt>
            <dd className="mt-1 text-3xl font-semibold text-gray-600 sm:text-4xl">
              {currencyFormatter.format(marketStatistics.minPrice)}
            </dd>
          </div>

          <div className="gap-3 p-6">
            <dt className="text-xs font-medium uppercase tracking-wide text-gray-500">
              Max Price:
            </dt>
            <dd className="mt-1 text-3xl font-semibold text-gray-600 sm:text-4xl">
              {currencyFormatter.format(marketStatistics.maxPrice)}
            </dd>
          </div>

          <div className="gap-3 p-6">
            <dt className="text-xs font-medium uppercase tracking-wide text-gray-500">
              Average Square Footage:
            </dt>
            <dd className="mt-1 text-3xl font-semibold text-gray-600 sm:text-4xl">
              {currencyFormatter.format(marketStatistics.averageSquareFootage)}
            </dd>
          </div>

          <div className="gap-3 p-6">
            <dt className="text-xs font-medium uppercase tracking-wide text-gray-500">
              Average Price Per Square Footage:
            </dt>
            <dd className="mt-1 text-3xl font-semibold text-gray-600 sm:text-4xl">
              {currencyFormatter.format(
                marketStatistics.averagePricePerSquareFootage
              )}
            </dd>
          </div>
        </dl>
      </div>
    </div>
  )
}

export default MarketAnalysisDetails
