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
import { PriceByYearBuilt } from '@/types/market'
import { currencyFormatter } from '@/libs/utils'

/**
 *
 *
 * @return {*}
 */
const PricesByYearBuiltBarChart = () => {
  const { marketPricesByYearBuilt } = useMarket()

  return (
    <div style={{ width: '100%', height: 350, minWidth: 0 }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={marketPricesByYearBuilt}
          margin={{
            top: 10,
            right: 20,
            left: 20,
            bottom: 10,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="yearBuilt"
            tick={{ fontSize: 12 }}
            tickFormatter={(value: number) => `${value}s`}
          />
          <YAxis
            width={90}
            tick={{ fontSize: 12 }}
            tickFormatter={(value: number) => value.toLocaleString()}
          />
          <Tooltip
            content={({ active, payload, label }) => {
              if (!active || !payload?.length) return null

              const { propertyCount, averagePredictedPrice } = payload[0]
                .payload as PriceByYearBuilt

              return (
                <div className="rounded border bg-white p-3 shadow-md">
                  <p className="font-semibold">Year Built: {label}s</p>
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
            name="Average predicted price"
            radius={[6, 6, 0, 0]}
            fill="#8884d8"
          />
          <RechartsDevtools />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default PricesByYearBuiltBarChart
