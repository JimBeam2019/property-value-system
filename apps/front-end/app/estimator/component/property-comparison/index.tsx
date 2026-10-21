'use client'

import { useMemo, useState } from 'react'

import {
  PropertyStoreState,
  usePropertyValueStore,
} from '@/store/property-value-store'
import PropertyDropdown from './PropertyDropdown'
import PropertyCard from './PropertyCard'
import { PropertyType } from '@/types/property'

/**
 * Property Comparison
 *
 * @return {*}
 */
const PropertyComparison = () => {
  const { properties } = usePropertyValueStore() as PropertyStoreState

  const [selectedProperties, setSelectedProperties] = useState<PropertyType[]>(
    []
  )

  const selectedIds = useMemo(
    () => new Set(selectedProperties.map(({ id }) => id)),
    [selectedProperties]
  )

  const remainingProperties = useMemo(
    () => properties.filter((property) => !selectedIds.has(property.id)),
    [properties, selectedIds]
  )

  if (properties.length === 0) {
    return <div className="m-6">No estimates yet.</div>
  }

  return (
    <div className="m-4">
      <div>
        <PropertyDropdown
          properties={remainingProperties}
          onSelect={({
            id,
            squareFootage,
            bedrooms,
            bathrooms,
            yearBuilt,
            lot_size,
            distance_to_city_center,
            school_rating,
            estimatedValue,
            timestampe,
          }) =>
            setSelectedProperties((prev) => [
              ...prev,
              {
                id,
                bedrooms,
                bathrooms,
                lot_size,
                distance_to_city_center,
                school_rating,
                timestampe,
                square_footage: squareFootage,
                year_built: yearBuilt,
                price: estimatedValue,
              },
            ])
          }
        />
      </div>

      <div className="grid grid-cols-1 gap-x-3 gap-y-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
        {selectedProperties.map((property, index) => (
          <div key={index}>
            <PropertyCard property={property} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default PropertyComparison
