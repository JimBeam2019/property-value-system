'use client'

import { useState } from 'react'

import { propertyColumns } from '@/libs/export/columns'
import { exportCsv } from '@/libs/export/csv'
import { exportPdf } from '@/libs/export/pdf'
import { MarketPropertyType } from '@/types/market'

/**
 * Export Buttons
 *
 * @param {{ rows: MarketPropertyType[] }} { rows }
 * @return {*}
 */
const ExportButtons = ({ rows }: { rows: MarketPropertyType[] }) => {
  const [isExportingPdf, setIsExportingPdf] = useState(false)
  const disabled = rows.length === 0

  const handlePdf = async () => {
    setIsExportingPdf(true)

    try {
      await exportPdf(rows, propertyColumns, {
        title: 'Property Market Report',
        filename: 'properties.pdf',
      })
    } finally {
      setIsExportingPdf(false)
    }
  }

  const buttonClass =
    'rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-sm transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50'

  return (
    <div className="flex gap-2">
      <button
        type="button"
        disabled={disabled}
        onClick={() => exportCsv(rows, propertyColumns, 'properties.csv')}
        className={buttonClass}
      >
        Export CSV
      </button>
      <button
        type="button"
        disabled={disabled || isExportingPdf}
        onClick={handlePdf}
        className={buttonClass}
      >
        {isExportingPdf ? 'Generating' : 'Export PDF'}
      </button>
    </div>
  )
}

export default ExportButtons
