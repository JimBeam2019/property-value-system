'use client'

import { currencyFormatter, numberFormatter } from '@/libs/utils'
import { PropertyType } from '@/types/property'

/**
 * Property Card
 *
 * @return {*}
 */
const PropertyCard = ({ property }: { property: PropertyType }) => {
  if (!property.price) {
    return <div className="m-6">No estimates yet.</div>
  }

  return (
    <div className="m-6">
      <div className="w-full max-w-sm overflow-hidden rounded-lg bg-white shadow-md transition-shadow hover:shadow-lg">
        {/* CardContent */}
        <div className="p-4">
          <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
            Estimated Value
          </p>
          <h3 className="mt-1 text-2xl font-semibold text-gray-900">
            {currencyFormatter.format(property.price)}
          </h3>

          <dl className="mt-4 text-sm">
            <div className="flex justify-between pr-4">
              <dt className="text-gray-500">Sq. Footage</dt>
              <dd className="font-medium text-gray-700">
                {numberFormatter.format(property.square_footage)}
              </dd>
            </div>
            <div className="flex justify-between pr-4">
              <dt className="text-gray-500">Lot Size</dt>
              <dd className="font-medium text-gray-700">
                {numberFormatter.format(property.lot_size)}
              </dd>
            </div>
            <div className="flex justify-between pr-4">
              <dt className="text-gray-500">Bedrooms</dt>
              <dd className="font-medium text-gray-700">{property.bedrooms}</dd>
            </div>
            <div className="flex justify-between pr-4">
              <dt className="text-gray-500">Bathrooms</dt>
              <dd className="font-medium text-gray-700">
                {property.bathrooms}
              </dd>
            </div>
            <div className="flex justify-between pr-4">
              <dt className="text-gray-500">Bathrooms</dt>
              <dd className="font-medium text-gray-700">
                {property.bathrooms}
              </dd>
            </div>
            <div className="flex justify-between pr-4">
              <dt className="text-gray-500">Distance to City Center</dt>
              <dd className="font-medium text-gray-700">
                {property.distance_to_city_center}
              </dd>
            </div>
            <div className="flex justify-between pr-4">
              <dt className="text-gray-500">School Rating</dt>
              <dd className="font-medium text-gray-700">
                {property.school_rating}
              </dd>
            </div>
            <div className="flex justify-between pr-4">
              <dt className="text-gray-500">Year Built</dt>
              <dd className="font-medium text-gray-700">
                {property.year_built}
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  )
}

export default PropertyCard
