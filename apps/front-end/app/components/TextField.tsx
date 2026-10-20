'use client'

import { InputHTMLAttributes } from 'react'

type FieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string
  error?: string[]
}

/**
 * Text Field
 *
 * @param {FieldProps} { label, error, id, ...inputProps }
 */
const TextField = ({ label, error, id, ...inputProps }: FieldProps) => (
  <div>
    <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:gap-4">
      <label
        htmlFor={id}
        className="text-sm font-medium text-gray-700 sm:w-36 sm:shrink-0 sm:pt-2"
      >
        {label}
      </label>
      <div className="flex-1">
        <input
          id={id}
          className={`
        w-full rounded-md border bg-white px-3 py-2 text-sm text-gray-900
        shadow-sm transition-colors
        placeholder:text-gray-400
        focus:outline-none focus:ring-2 focus:ring-offset-0
        disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-400
        ${
          error
            ? 'border-red-500 focus:border-red-500 focus:ring-red-200'
            : 'border-gray-300 focus:border-blue-600 focus:ring-blue-200'
        }
      `}
          {...inputProps}
        />
      </div>
    </div>

    {error && (
      <p className="mt-4 text-xs text-right text-red-600">{error[0]}</p>
    )}
  </div>
)

export default TextField
