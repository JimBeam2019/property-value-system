'use client'

import { InputHTMLAttributes } from 'react'

type FieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string
  error?: string[]
}

/**
 * Text Field with Vertical Layout
 *
 * @param {FieldProps} { label, error, id, ...inputProps }
 */
const TextFieldVertical = ({ label, error, id, ...inputProps }: FieldProps) => (
  <div className="w-full">
    <label
      htmlFor={id}
      className="mb-2 block text-sm font-medium text-gray-700"
    >
      {label}
    </label>
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

    {error && <p className="mt-1 text-xs text-red-600">{error[0]}</p>}
  </div>
)

export default TextFieldVertical
