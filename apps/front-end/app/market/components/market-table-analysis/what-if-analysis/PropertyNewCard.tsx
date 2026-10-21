'use client'

import { currencyFormatter, numberFormatter } from '@/libs/utils'
import { MarketPropertyType } from '@/types/market'
import { useMarket } from '@/app/market/context/MarketProvider'

/**
 * Property New Card
 *
 * @param {{ property: MarketPropertyType }} { property }
 * @return {*}
 */
const PropertyNewCard = ({
  newProperty,
}: {
  newProperty: MarketPropertyType
}) => {
  const { currentProperty } = useMarket()

  if (!newProperty.price || !currentProperty) {
    return <></>
  }

  const renderNumberDiff = (newValue: number, curValue: number) => {
    const difference = newValue - curValue

    if (difference === 0) {
      return <></>
    }

    return (
      <strong
        className={`mt-4 text-sm ${difference > 0 ? 'text-green-600' : 'text-red-600'}`}
      >
        {` (${difference > 0 ? '+' : ''}${numberFormatter.format(difference)})`}
      </strong>
    )
  }
  const renderCurrentDiff = (newValue: number, curValue: number) => {
    const difference = newValue - curValue

    if (difference === 0) {
      return <></>
    }

    return (
      <strong
        className={`mt-4 text-md ${difference > 0 ? 'text-green-600' : 'text-red-600'}`}
      >
        {` (${difference > 0 ? '+' : ''}${currencyFormatter.format(difference)})`}
      </strong>
    )
  }

  const renderValueDiff = (newValue: number, curValue: number) => {
    let difference = newValue - curValue

    difference = Number(difference.toFixed(2))

    if (difference === 0) {
      return <></>
    }

    return (
      <strong
        className={`mt-4 text-sm ${difference > 0 ? 'text-green-600' : 'text-red-600'}`}
      >
        {` (${difference > 0 ? '+' : ''}${difference})`}
      </strong>
    )
  }

  return (
    <div className="m-6">
      <div className="w-full max-w-sm overflow-hidden rounded-lg bg-white shadow-md transition-shadow hover:shadow-lg">
        {/* CardContent */}
        <div className="p-4">
          <dl className="mt-4 text-sm">
            <div className="flex justify-between pr-4">
              <dt className="text-gray-500">Sq. Footage</dt>
              <dd className="font-medium text-gray-700">
                {numberFormatter.format(newProperty.squareFootage)}
                {renderNumberDiff(
                  newProperty.squareFootage,
                  currentProperty.squareFootage
                )}
              </dd>
            </div>
            <div className="flex justify-between pr-4">
              <dt className="text-gray-500">Lot Size</dt>
              <dd className="font-medium text-gray-700">
                {numberFormatter.format(newProperty.lotSize)}
                {renderNumberDiff(newProperty.lotSize, currentProperty.lotSize)}
              </dd>
            </div>
            <div className="flex justify-between pr-4">
              <dt className="text-gray-500">Bedrooms</dt>
              <dd className="font-medium text-gray-700">
                {newProperty.bedrooms}
                {renderValueDiff(
                  newProperty.bedrooms,
                  currentProperty.bedrooms
                )}
              </dd>
            </div>
            <div className="flex justify-between pr-4">
              <dt className="text-gray-500">Bathrooms</dt>
              <dd className="font-medium text-gray-700">
                {newProperty.bathrooms}
                {renderValueDiff(
                  newProperty.bathrooms,
                  currentProperty.bathrooms
                )}
              </dd>
            </div>
            <div className="flex justify-between pr-4">
              <dt className="text-gray-500">Distance to City Center</dt>
              <dd className="font-medium text-gray-700">
                {newProperty.distanceToCityCenter}
                {renderValueDiff(
                  newProperty.distanceToCityCenter,
                  currentProperty.distanceToCityCenter
                )}
              </dd>
            </div>
            <div className="flex justify-between pr-4">
              <dt className="text-gray-500">School Rating</dt>
              <dd className="font-medium text-gray-700">
                {newProperty.schoolRating}
                {renderValueDiff(
                  newProperty.schoolRating,
                  currentProperty.schoolRating
                )}
              </dd>
            </div>
            <div className="flex justify-between pr-4">
              <dt className="text-gray-500">Year Built</dt>
              <dd className="font-medium text-gray-700">
                {newProperty.yearBuilt}
                {renderValueDiff(
                  newProperty.yearBuilt,
                  currentProperty.yearBuilt
                )}
              </dd>
            </div>
          </dl>

          <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
            Estimated Value
          </p>
          <h3 className="mt-1 text-2xl font-semibold text-gray-900">
            {currencyFormatter.format(newProperty.price)}
            {renderCurrentDiff(newProperty.price, currentProperty.price)}
          </h3>
        </div>
      </div>
    </div>
  )
}

export default PropertyNewCard
