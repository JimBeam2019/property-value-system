'use client'

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts'
import { RechartsDevtools } from '@recharts/devtools'

/**
 *
 *
 * @param {{
 *   square_footage: number
 *   lot_size: number
 * }} {
 *   square_footage,
 *   lot_size,
 * }
 * @return {*}
 */
const DoubleBarChart = ({
  square_footage,
  lot_size,
}: {
  square_footage: number
  lot_size: number
}) => {
  const data = [{ label: 'Current Property', x: square_footage, y: lot_size }]

  return (
    <BarChart
      style={{
        width: '100%',
        maxWidth: '700px',
        maxHeight: '70vh',
        aspectRatio: 1.618,
      }}
      responsive
      data={data}
      margin={{
        top: 5,
        right: 0,
        left: 0,
        bottom: 5,
      }}
    >
      <CartesianGrid />
      <XAxis dataKey="label" />
      <YAxis width="auto" />
      <Tooltip />
      <Legend />
      <Bar
        dataKey="x"
        name="Square Footage"
        radius={[10, 10, 0, 0]}
        fill="#8884d8"
      />
      <Bar dataKey="y" name="Lot Size" radius={[10, 10, 0, 0]} fill="#413ea0" />
      <RechartsDevtools />
    </BarChart>
  )
}

export default DoubleBarChart
