'use client'

import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts'
import { RechartsDevtools } from '@recharts/devtools'
import { useMemo } from 'react'
import { useMarket } from '../../context/MarketProvider'

// // #region Sample data
// const data01 = [
//   { x: 100, y: 200 },
//   { x: 120, y: 100 },
//   { x: 170, y: 300 },
//   { x: 140, y: 250 },
//   { x: 150, y: 400 },
//   { x: 110, y: 280 },
// ]

// const data02 = [
//   { x: 200, y: 260 },
//   { x: 240, y: 290 },
//   { x: 190, y: 290 },
//   { x: 198, y: 250 },
//   { x: 180, y: 280 },
//   { x: 210, y: 220 },
// ]

// #endregion
const SquareFootageScatterChart = ({
  isAnimationActive = true,
}: {
  isAnimationActive?: boolean
}) => {
  const { marketProperties } = useMarket()

  const data = useMemo(() => {
    if (!marketProperties || marketProperties.properties.length === 0) return []

    return marketProperties.properties.map(({ property, predictedPrice }) => ({
      square_footage: property.squareFootage,
      price: predictedPrice ? Math.floor(predictedPrice * 0.001) : 0,
    }))
  }, [marketProperties])

  return (
    <ScatterChart
      style={{
        width: '100%',
        maxWidth: '600px',
        maxHeight: '70vh',
        aspectRatio: 1.618,
      }}
      responsive
      margin={{
        top: 5,
        right: 0,
        left: 0,
        bottom: 5,
      }}
    >
      <CartesianGrid />
      <XAxis
        dataKey="square_footage"
        type="number"
        name="Square Footage"
        unit="sq ft"
      />
      <YAxis
        dataKey="price"
        type="number"
        name="Price"
        unit="K USD"
        width="auto"
      />
      <Tooltip />
      <Legend />
      <Scatter
        name="Square Footage"
        data={data}
        dataKey="square_footage"
        isAnimationActive={isAnimationActive}
        fill="#8884d8"
      />
      <RechartsDevtools />
    </ScatterChart>
  )
}

export default SquareFootageScatterChart
