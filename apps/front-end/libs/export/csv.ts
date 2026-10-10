import { ExportColumn } from './columns'

const escapeCell = (value: string | number | null | undefined): string => {
  if (value == null) return ''

  let text = String(value)

  // Neutralize spreadsheet formula injection (=, +, -, @) in text values.
  // Numbers are exempt so negative values stay numeric.
  if (typeof value === 'string' && /^[=+\-@\t\r]/.test(text)) {
    text = `'${text}`
  }

  // Quote cells containing commas, quotes, or newlines; double any quotes.
  if (/[",\n\r]/.test(text)) {
    text = `"${text.replace(/"/g, '""')}"`
  }

  return text
}

export const toCsv = <T>(rows: T[], columns: ExportColumn<T>[]): string => {
  const header = columns.map((c) => escapeCell(c.header)).join(',')
  const body = rows.map((row) =>
    columns.map((c) => escapeCell(c.value(row))).join(',')
  )
  return [header, ...body].join('\r\n')
}

export const downloadBlob = (blob: Blob, filename: string) => {
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')

  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  link.remove()
  URL.revokeObjectURL(url) // free the memory
}

export const exportCsv = <T>(
  rows: T[],
  columns: ExportColumn<T>[],
  filename = 'export.csv'
) => {
  // The BOM (\uFEFF) makes Excel read the file as UTF-8
  const blob = new Blob(['\uFEFF' + toCsv(rows, columns)], {
    type: 'text/csv;charset=utf-8;',
  })
  downloadBlob(blob, filename)
}
