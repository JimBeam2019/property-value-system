'use client'

import { useMemo, useState } from 'react'
import { ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react'
import { MarketPropertyType } from '@/types/market'
import { currencyFormatter } from '@/libs/utils'
import { useMarket } from '../context/MarketProvider'
import ExportButtons from './ExportButtons'

interface Props {
  data: MarketPropertyType[]
  onSelect: (property: MarketPropertyType) => void
}

type SortKey = keyof Pick<
  MarketPropertyType,
  | 'squareFootage'
  | 'bedrooms'
  | 'bathrooms'
  | 'yearBuilt'
  | 'lotSize'
  | 'schoolRating'
  | 'distanceToCityCenter'
  | 'price'
>

type SortDirection = 'asc' | 'desc'

type SortState = {
  key: SortKey
  direction: SortDirection
} | null

const columns: { key: SortKey; label: string }[] = [
  { key: 'squareFootage', label: 'Sq Ft' },
  { key: 'bedrooms', label: 'Bedrooms' },
  { key: 'bathrooms', label: 'Bathrooms' },
  { key: 'yearBuilt', label: 'Year Built' },
  { key: 'lotSize', label: 'Lot Size' },
  { key: 'schoolRating', label: 'School' },
  { key: 'distanceToCityCenter', label: 'Distance to City Center' },
  { key: 'price', label: 'Price' },
]

/**
 * Property Table
 *
 * @param {Props} { data, onSelect }
 * @return {*}
 */
const PropertyTable = ({ data, onSelect }: Props) => {
  const [sort, setSort] = useState<SortState>(null)
  const [globalFilter, setGlobalFilter] = useState('')

  const { currentProperty, changeCurrentProperty, changeNewProperty } =
    useMarket()

  const toggleSort = (key: SortKey) => {
    setSort((current) => {
      if (current?.key !== key) return { key, direction: 'asc' }
      if (current.direction === 'asc') return { key, direction: 'desc' }
      return null // third click clears sorting, matching TanStack's default cycle
    })
  }

  const filteredData = useMemo(() => {
    if (!globalFilter.trim()) return data

    const query = globalFilter.trim().toLowerCase()

    return data.filter((property) =>
      Object.values(property).some((value) =>
        String(value).toLowerCase().includes(query)
      )
    )
  }, [data, globalFilter])

  const sortedData = useMemo(() => {
    if (!sort) return filteredData

    const { key, direction } = sort

    const sorted = [...filteredData].sort((a, b) => {
      const aVal = a[key]
      const bVal = b[key]
      if (aVal < bVal) return direction === 'asc' ? -1 : 1
      if (aVal > bVal) return direction === 'asc' ? 1 : -1
      return 0
    })

    return sorted
  }, [filteredData, sort])

  const renderSortIcon = (key: SortKey) => {
    if (sort?.key !== key)
      return <ArrowUpDown size={16} className="text-gray-400" />

    return sort.direction === 'asc' ? (
      <ArrowUp size={16} className="text-gray-700" />
    ) : (
      <ArrowDown size={16} className="text-gray-700" />
    )
  }

  const renderAnalysisButton = (property: MarketPropertyType) => {
    if (!currentProperty) {
      return (
        <button
          onClick={(e) => {
            e.stopPropagation()
            onSelect(property)
          }}
          className="rounded bg-blue-600 px-3 py-1 text-white transition-colors hover:bg-blue-700"
        >
          Analyse
        </button>
      )
    }

    if (currentProperty.id === property.id) {
      return (
        <button
          onClick={(e) => {
            e.stopPropagation()
            changeCurrentProperty(null)
            changeNewProperty(null)
          }}
          className="rounded bg-red-600 px-3 py-1 text-white transition-colors hover:bg-red-700"
        >
          Cancel
        </button>
      )
    }

    return (
      <button
        onClick={(e) => {
          e.stopPropagation()
          onSelect(property)
        }}
        className="rounded bg-blue-600 px-3 py-1 text-white transition-colors hover:bg-blue-700"
      >
        Analyse
      </button>
    )
  }

  return (
    <div>
      <div className="flex justify-between pr-4">
        <dt>
          <input
            className="mb-4 w-full rounded border border-gray-200 p-2"
            placeholder="Search properties..."
            value={globalFilter}
            onChange={(e) => setGlobalFilter(e.target.value)}
          />
        </dt>
        <dd>
          <ExportButtons rows={filteredData} />
        </dd>
      </div>

      <div className="w-full overflow-x-auto rounded-lg border border-gray-200 bg-white shadow-sm">
        <table className="w-full min-w-[640px] border-collapse text-sm">
          <thead>
            <tr className="bg-gray-50">
              {columns.map((col) => (
                <th
                  key={col.key}
                  scope="col"
                  className="border-b border-gray-200 px-4 py-3 text-left font-semibold text-gray-700"
                >
                  <button
                    onClick={() => toggleSort(col.key)}
                    className="flex items-center gap-1 hover:text-gray-900"
                  >
                    {col.label}
                    {renderSortIcon(col.key)}
                  </button>
                </th>
              ))}
              <th className="border-b border-gray-200 px-4 py-3" />
            </tr>
          </thead>

          <tbody>
            {sortedData.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length + 1}
                  className="px-4 py-8 text-center text-gray-500"
                >
                  No properties match your search.
                </td>
              </tr>
            ) : (
              sortedData.map((property) => (
                <tr
                  key={property.id}
                  onClick={() => onSelect(property)}
                  className="cursor-pointer transition-colors hover:bg-gray-50"
                >
                  <td className="border-b border-gray-100 px-4 py-3 text-gray-700">
                    {property.squareFootage.toLocaleString()}
                  </td>
                  <td className="border-b border-gray-100 px-4 py-3 text-gray-700">
                    {property.bedrooms}
                  </td>
                  <td className="border-b border-gray-100 px-4 py-3 text-gray-700">
                    {property.bathrooms}
                  </td>
                  <td className="border-b border-gray-100 px-4 py-3 text-gray-700">
                    {property.yearBuilt}
                  </td>
                  <td className="border-b border-gray-100 px-4 py-3 text-gray-700">
                    {property.lotSize}
                  </td>
                  <td className="border-b border-gray-100 px-4 py-3 text-gray-700">
                    {property.schoolRating}
                  </td>
                  <td className="border-b border-gray-100 px-4 py-3 text-gray-700">
                    {property.distanceToCityCenter}
                  </td>
                  <td className="border-b border-gray-100 px-4 py-3 font-medium text-gray-900">
                    {currencyFormatter.format(property.price)}
                  </td>
                  <td className="border-b border-gray-100 px-4 py-3">
                    {renderAnalysisButton(property)}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default PropertyTable
