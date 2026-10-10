'use client'

import { SelectHTMLAttributes } from 'react'

import { currentYear } from '@/libs/utils'

export type SelectOption = { value: string | number; label: string }

type SelectFieldProps = SelectHTMLAttributes<HTMLSelectElement> & {
  label: string
  error?: string[]
  options: SelectOption[]
  placeholder?: string
}

export const bedroomOptions: SelectOption[] = Array.from(
  { length: 10 },
  (_, i) => {
    const n = i + 1
    return { value: n, label: `${n} ${n === 1 ? 'Bedroom' : 'Bedrooms'}` }
  }
)

export const bathroomOptions: SelectOption[] = Array.from(
  { length: 16 },
  (_, i) => {
    const n = (i + 1) * 0.5
    return { value: n, label: `${n} ${n === 1 ? 'Bathroom' : 'Bathrooms'}` }
  }
)

export const yearBuiltOptions: SelectOption[] = Array.from(
  { length: currentYear - 1800 + 1 },
  (_, i) => {
    const year = currentYear - i
    return { value: year, label: String(year) }
  }
)

/**
 * Select Field
 *
 * @param {SelectFieldProps} {
 *   label,
 *   error,
 *   id,
 *   options,
 *   placeholder,
 *   ...selectProps
 * }
 */
const SelectField = ({
  label,
  error,
  id,
  options,
  placeholder,
  ...selectProps
}: SelectFieldProps) => (
  <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:gap-4">
    <label
      htmlFor={id}
      className="text-sm font-medium text-gray-700 sm:w-36 sm:shrink-0 sm:pt-2"
    >
      {label}
    </label>
    <div className="flex-1">
      <div className="relative">
        <select
          id={id}
          defaultValue=""
          className={`w-full appearance-none rounded-md border bg-white px-3 py-2 pr-9 text-sm
          shadow-sm transition-colors
          focus:outline-none focus:ring-2 focus:ring-offset-0
          disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-400
          ${
            error
              ? 'border-red-500 text-gray-900 focus:border-red-500 focus:ring-red-200'
              : 'border-gray-300 text-gray-900 focus:border-blue-600 focus:ring-blue-200'
          }`}
          {...selectProps}
        >
          <option value="" disabled>
            {placeholder ?? `Select ${label.toLowerCase()}`}
          </option>
          {options.map(({ value, label }) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
        <svg
          className="pointer-events-none absolute right-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400"
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
      </div>
    </div>

    {error && <p className="text-xs text-red-600">{error[0]}</p>}
  </div>
)

export default SelectField
