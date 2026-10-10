import { ExportColumn } from './columns'

export const exportPdf = async <T>(
  rows: T[],
  columns: ExportColumn<T>[],
  { title, filename = 'export.pdf' }: { title: string; filename?: string }
) => {
  const [{ default: jsPDF }, { default: autoTable }] = await Promise.all([
    import('jspdf'),
    import('jspdf-autotable'),
  ])

  const doc = new jsPDF({ orientation: 'landscape', unit: 'pt', format: 'a4' })
  const pageWidth = doc.internal.pageSize.getWidth()

  doc.setFontSize(16)
  doc.setTextColor(0)
  doc.text(title, 40, 60)

  doc.setFontSize(10)
  doc.setTextColor(120)
  doc.text(`Generated ${new Date().toLocaleString()}`, pageWidth - 40, 40, {
    align: 'right',
  })
  doc.setTextColor(0)

  autoTable(doc, {
    startY: 72,
    head: [columns.map((c) => c.header)],
    body: rows.map((row) => columns.map((c) => c.value(row) ?? '')),
    styles: { fontSize: 9, cellPadding: 5 },
    headStyles: { fillColor: [37, 99, 235] }, // blue-600
    alternateRowStyles: { fillColor: [249, 250, 251] },
    didDrawPage: () => {
      const pageCount = doc.getNumberOfPages()
      doc.setFontSize(9)
      doc.text(
        `Page ${doc.getCurrentPageInfo().pageNumber} of ${pageCount}`,
        doc.internal.pageSize.getWidth() - 40,
        doc.internal.pageSize.getHeight() - 20,
        { align: 'right' }
      )
    },
  })

  doc.save(filename)
}
