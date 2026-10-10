'use client'

import { SelectHTMLAttributes } from 'react'

export type SelectOption = { value: string | number; label: string }

type SelectFieldProps = SelectHTMLAttributes<HTMLSelectElement> & {
  label: string
  error?: string[]
  options: SelectOption[]
  placeholder?: string
}

/**
 * Select Field with Vertical Layout
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
const SelectFieldVertical = ({
  label,
  error,
  id,
  options,
  placeholder,
  ...selectProps
}: SelectFieldProps) => (
  <div className="w-full">
    <label
      htmlFor={id}
      className="mb-2 block text-sm font-medium text-gray-700"
    >
      {label}
    </label>

    <div className="relative">
      <select
        id={id}
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
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
      </svg>
    </div>

    {error && <p className="text-xs text-red-600">{error[0]}</p>}
  </div>
)

export default SelectFieldVertical
