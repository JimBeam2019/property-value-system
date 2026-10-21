'use client'

import { useEffect, useMemo, useRef, useState } from 'react'

import { currencyFormatter, numberFormatter } from '@/libs/utils'
import { PropertyType } from '@/types/property'

interface PropertyDropdownProps {
  properties: PropertyType[]
  onSelect?: (property: PropertyMenuItem) => void
}

type PropertyMenuItem = {
  id: number
  squareFootage: number
  bedrooms: number
  bathrooms: number
  yearBuilt: number
  lot_size: number
  distance_to_city_center: number
  school_rating: number
  estimatedValue: number
  timestampe: number
}

/**
 * Property Dropdown Menu
 *
 * @param {PropertyDropdownProps} { properties, onSelect }
 * @return {*}
 */
const PropertyDropdown = ({ properties, onSelect }: PropertyDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [selected, setSelected] = useState<PropertyMenuItem | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const propertyMenuItems = useMemo(
    () =>
      properties.map(
        ({
          id,
          square_footage,
          lot_size,
          bedrooms,
          bathrooms,
          distance_to_city_center,
          school_rating,
          year_built,
          price,
        }) =>
          ({
            id,
            bedrooms,
            bathrooms,
            lot_size,
            distance_to_city_center,
            school_rating,
            squareFootage: square_footage,
            yearBuilt: year_built,
            estimatedValue: price,
          }) as PropertyMenuItem
      ),
    [properties]
  )

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      )
        setIsOpen(false)
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsOpen(false)
    }

    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('keydown', handleEscape)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleEscape)
    }
  }, [])

  const handleSelect = (property: PropertyMenuItem) => {
    setSelected(property)
    setIsOpen(false)
    onSelect?.(property)
  }

  return (
    <div ref={containerRef} className="relative w-full max-w-md">
      <button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        className="flex w-full items-center justify-between rounded-md border border-gray-300
          bg-white px-3 py-2.5 text-sm text-gray-900 shadow-sm transition-colors
          hover:border-gray-400
          focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-600"
      >
        <span className={selected ? 'text-gray-900' : 'text-gray-400'}>
          {selected
            ? `Picked the property of ${currencyFormatter.format(selected.estimatedValue)}`
            : 'Select a property'}
        </span>
        <svg
          className={`h-4 w-4 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {isOpen && (
        <ul
          role="listbox"
          className="absolute z-10 mt-2 max-h-96 w-full overflow-y-auto rounded-lg
            border border-gray-100 bg-white py-1 shadow-lg"
        >
          {propertyMenuItems.map((property) => (
            <li
              key={property.id}
              role="option"
              aria-selected={selected?.id === property.id}
            >
              <button
                type="button"
                onClick={() => handleSelect(property)}
                className={`
                  w-full px-4 py-3 text-left transition-colors
                  hover:bg-gray-50
                  focus:outline-none focus-visible:bg-blue-50
                  ${selected?.id === property.id ? 'bg-blue-50' : ''}
                `}
              >
                {/* Layer 1 — title / subtitle */}
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                  <span className="text-sm font-semibold text-gray-900">
                    {currencyFormatter.format(property.estimatedValue)}
                  </span>
                  <span className="text-xs text-gray-500">
                    Built in {property.yearBuilt}
                  </span>
                </div>

                {/* Layer 2 — stats row */}
                <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-gray-600">
                  <span className="font-medium text-blue-600">
                    {numberFormatter.format(property.squareFootage)} sq ft
                  </span>
                  <span className="text-gray-300">•</span>
                  <span>
                    {property.bedrooms} bedroom{property.bedrooms > 1 && 's'}
                  </span>
                  <span className="text-gray-300">•</span>
                  <span>
                    {property.bathrooms} bathroom{property.bathrooms > 1 && 's'}
                  </span>
                </div>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default PropertyDropdown
