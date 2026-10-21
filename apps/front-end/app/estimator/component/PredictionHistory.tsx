'use client'

import { currencyFormatter, numberFormatter } from '@/libs/utils'
import {
  PropertyStoreState,
  usePropertyValueStore,
} from '@/store/property-value-store'
import VerticalBarChart from './charts/VerticalBartChart'

type PropertyEstimate = {
  id: string
  square_footage: number
  bedrooms: number
  bathrooms: number
  year_built: number
  lot_size: number
  distance_to_city_center: number
  school_rating: number
  estimated_value: number
}

const columns: {
  key: keyof PropertyEstimate
  label: string
  align?: 'right'
}[] = [
  { key: 'square_footage', label: 'Sq. Footage', align: 'right' },
  { key: 'bedrooms', label: 'Beds', align: 'right' },
  { key: 'bathrooms', label: 'Baths', align: 'right' },
  { key: 'year_built', label: 'Year Built', align: 'right' },
  { key: 'lot_size', label: 'Lot Size', align: 'right' },
  {
    key: 'distance_to_city_center',
    label: 'Dist. to City (mi)',
    align: 'right',
  },
  { key: 'school_rating', label: 'School Rating', align: 'right' },
  { key: 'estimated_value', label: 'Estimated Value', align: 'right' },
]
/**
 * Prediction History
 *
 * @return {*}
 */
const PredictionHistory = () => {
  const { properties } = usePropertyValueStore() as PropertyStoreState

  if (properties.length === 0) {
    return (
      <div className="rounded-lg border border-gray-200 bg-white p-8 text-center text-sm text-gray-500 shadow-sm">
        No estimates yet.
      </div>
    )
  }

  return (
    <div className="m-4">
      <div className="w-full overflow-x-auto rounded-lg border border-gray-200 bg-white shadow-sm">
        <div className="grid grid-cols-12 gap-2">
          <div className="col-span-12 sm:col-span-12 lg:col-span-9 p-6">
            <table className="w-full min-w-[720px] border-collapse text-sm">
              <thead>
                <tr className="bg-gray-50">
                  {columns.map(({ key, label, align }) => (
                    <th
                      key={key}
                      scope="col"
                      className={`border-b border-gray-200 px-4 py-3 font-semibold text-gray-700 ${align === 'right' ? 'text-right' : 'text-left'}`}
                    >
                      {label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {properties.map(
                  ({
                    id,
                    square_footage,
                    bedrooms,
                    bathrooms,
                    year_built,
                    lot_size,
                    distance_to_city_center,
                    school_rating,
                    price,
                  }) =>
                    id && (
                      <tr
                        key={id}
                        className="transition-colors hover:bg-gray-50"
                      >
                        <td className="border-b border-gray-100 px-4 py-3 text-right text-gray-700">
                          {numberFormatter.format(square_footage)}
                        </td>
                        <td className="border-b border-gray-100 px-4 py-3 text-right text-gray-700">
                          {bedrooms}
                        </td>
                        <td className="border-b border-gray-100 px-4 py-3 text-right text-gray-700">
                          {bathrooms}
                        </td>
                        <td className="border-b border-gray-100 px-4 py-3 text-right text-gray-700">
                          {year_built}
                        </td>
                        <td className="border-b border-gray-100 px-4 py-3 text-right text-gray-700">
                          {numberFormatter.format(lot_size)}
                        </td>
                        <td className="border-b border-gray-100 px-4 py-3 text-right text-gray-700">
                          {distance_to_city_center}
                        </td>
                        <td className="border-b border-gray-100 px-4 py-3 text-right text-gray-700">
                          {school_rating}
                        </td>
                        <td className="border-b border-gray-100 px-4 py-3 text-right font-medium text-gray-900">
                          {price && currencyFormatter.format(price)}
                        </td>
                      </tr>
                    )
                )}
              </tbody>
            </table>
          </div>

          <div className="col-span-12 lg:col-span-3 max-h-[480px] overflow-y-auto p-6">
            <VerticalBarChart properties={properties} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default PredictionHistory
