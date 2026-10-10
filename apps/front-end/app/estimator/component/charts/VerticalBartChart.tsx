'use client'

import { useMemo } from 'react'
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
import { PropertyType } from '@/types/property'

const BAR_SIZE = 24 // was 50
const BAR_GAP = 16 // vertical space between bars
const CHART_CHROME = 90 // x-axis, legend, and margins
const MIN_HEIGHT = 160

/**
 * Vertical Bar Chart
 *
 * @param {{ properties: PropertyType[] }} { properties }
 * @return {*}
 */
const VerticalBarChart = ({ properties }: { properties: PropertyType[] }) => {
  const data = useMemo(
    () =>
      properties.map(({ id, price }) => ({
        name: `Property ${id ? id : 0}`,
        price: price ? Math.floor(price) : 0,
      })),
    [properties]
  )

  const height = Math.max(
    MIN_HEIGHT,
    data.length * (BAR_SIZE + BAR_GAP) + CHART_CHROME
  )

  return (
    <BarChart
      layout="vertical"
      style={{ width: '100%', height }}
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
      <XAxis type="number" unit="USD" niceTicks="snap125" />
      <YAxis dataKey="name" type="category" scale="band" width="auto" />
      <Tooltip />
      <Legend />
      <Bar
        dataKey="price"
        name="Estimated Value"
        radius={[0, 5, 5, 0]}
        barSize={BAR_SIZE}
        fill="#8884d8"
      />
      <RechartsDevtools />
    </BarChart>
  )
}

export default VerticalBarChart
