'use client'

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'
import { RechartsDevtools } from '@recharts/devtools'
import { useMarket } from '../../context/MarketProvider'
import { PriceByBedrooms } from '@/types/market'
import { currencyFormatter } from '@/libs/utils'

/**
 *
 *
 * @return {*}
 */
const PriceByBedroomsChart = () => {
  const { marketPricesByBedrooms } = useMarket()

  return (
    <div style={{ width: '100%', height: 400 }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={marketPricesByBedrooms}
          margin={{
            top: 10,
            right: 20,
            left: 25,
            bottom: 10,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="bedrooms"
            label={{
              value: 'Number of Bedrooms',
              position: 'insideBottom',
              offset: -5,
            }}
          />
          <YAxis
            width={100}
            tickFormatter={(value: number) => currencyFormatter.format(value)}
          />
          <Tooltip
            labelFormatter={(label) => `${label} Bedrooms`}
            formatter={(value, name) => {
              if (name === 'Average Predicted Price') {
                return [
                  typeof value === 'number'
                    ? currencyFormatter.format(value)
                    : value,
                  name,
                ]
              }

              return [
                typeof value === 'number' ? value.toLocaleString() : value,
                name,
              ]
            }}
            content={({ active, payload }) => {
              if (!active || !payload?.length) {
                return null
              }

              const { bedrooms, propertyCount, averagePredictedPrice } =
                payload[0].payload as PriceByBedrooms

              return (
                <div className="rounded border bg-white p-3 shadow-md">
                  <p className="font-semibold">{bedrooms} Bedrooms</p>
                  <p>Property Count: {propertyCount.toLocaleString()}</p>
                  <p>
                    {`Average Predicted Price: ${currencyFormatter.format(averagePredictedPrice)}`}
                  </p>
                </div>
              )
            }}
          />
          <Legend />
          <Bar
            dataKey="averagePredictedPrice"
            name="Average Predicted Price"
            fill="#8884d8"
            radius={[8, 8, 0, 0]}
          />
          <RechartsDevtools />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default PriceByBedroomsChart
