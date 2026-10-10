'use client'

import { currencyFormatter, numberFormatter } from '@/libs/utils'
import { useEstimate } from '../context/EstimateProvider'

/**
 * Property Details
 *
 * @return {*}
 */
const PropertyDetails = () => {
  const { curPropertyEstimate } = useEstimate()

  if (!curPropertyEstimate || !curPropertyEstimate.price) {
    return <></>
  }

  const {
    square_footage,
    bedrooms,
    bathrooms,
    year_built,
    lot_size,
    distance_to_city_center,
    school_rating,
    price,
    timestampe,
  } = curPropertyEstimate

  const details: { label: string; value: string }[] = [
    {
      label: 'Square Footage',
      value: `${numberFormatter.format(square_footage)} sq ft`,
    },
    { label: 'Bedrooms', value: String(bedrooms) },
    { label: 'Bathrooms', value: String(bathrooms) },
    { label: 'Year Built', value: String(year_built) },
    { label: 'Lot Size', value: `${numberFormatter.format(lot_size)} sq ft` },
    {
      label: 'Distance to City Center',
      value: `${distance_to_city_center} km`,
    },
    { label: 'School Rating', value: `${school_rating} / 10` },
  ]

  return (
    <div className="m-6">
      <div className="w-full rounded-lg bg-white shadow-md">
        <div className="flex flex-col lg:flex-row">
          {/* CardContent — header */}
          <div className="p-6 lg:w-3/12 lg:shrink-0">
            <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
              Estimated Value
            </p>
            <h2 className="mt-1 text-3xl font-semibold text-gray-900 sm:text-4xl">
              {currencyFormatter.format(price)}
            </h2>
            <p className="text-sm font-medium tracking-wide text-gray-500 pt-4">
              Estimated at {new Date(timestampe).toLocaleTimeString()}
            </p>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-100 lg:border-t-0 lg:border-l" />

          {/* CardContent — details grid */}
          <div className="flex-1 p-6 lg:w-9/12">
            <dl className="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2 lg:grid-cols-4">
              {details.map((detail) => (
                <div
                  key={detail.label}
                  className="flex items-start justify-between gap-3"
                >
                  <dt className="text-xs font-medium uppercase tracking-wide text-gray-500">
                    {detail.label}
                  </dt>
                  <dd className="text-right text-base font-medium text-gray-900">
                    {detail.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PropertyDetails
