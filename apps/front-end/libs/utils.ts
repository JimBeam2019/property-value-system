/**
 * Currency Formatter
 */
export const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 2,
})

/**
 * Number Formatter
 */
export const numberFormatter = new Intl.NumberFormat('en-US')

/**
 * Current Year
 */
export const currentYear = new Date().getFullYear()
