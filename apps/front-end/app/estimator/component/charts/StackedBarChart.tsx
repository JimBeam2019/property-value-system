'use client'

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  createHorizontalChart,
} from 'recharts'
import { MockDataType, RechartsDevtools } from '@recharts/devtools'

const Typed = createHorizontalChart<MockDataType, string, number>()({
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
})

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
const StackedBarChart = ({
  bedrooms,
  bathrooms,
}: {
  bedrooms: number
  bathrooms: number
}) => {
  const data = [{ label: 'Current Property', x: bedrooms, y: bathrooms }]

  return (
    <Typed.BarChart
      style={{
        width: '100%',
        maxWidth: '700px',
        maxHeight: '70vh',
        aspectRatio: 1.618,
      }}
      responsive
      data={data}
      margin={{
        top: 20,
        right: 0,
        left: 0,
        bottom: 5,
      }}
    >
      <CartesianGrid />
      <Typed.XAxis dataKey="label" niceTicks="snap125" />
      <Typed.YAxis width="auto" niceTicks="snap125" />
      <Typed.Tooltip />
      <Legend />
      <Typed.Bar
        dataKey="x"
        name="Bedrooms"
        stackId="a"
        fill="#8884d8"
        background
      />
      <Typed.Bar
        dataKey="y"
        name="Bathrooms"
        stackId="a"
        fill="#413ea0"
        background
      />
      <RechartsDevtools />
    </Typed.BarChart>
  )
}

export default StackedBarChart
