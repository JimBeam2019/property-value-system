'use client'

import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ZAxis,
} from 'recharts'
import { useMarket } from '../../context/MarketProvider'

const PriceScatterChart = () => {
  const { marketPricesBySize } = useMarket()

  return (
    <div style={{ width: '100%', height: 350, minWidth: 0 }}>
      <ResponsiveContainer width="100%" height="100%">
        <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 30 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            type="number"
            dataKey="squareFootage"
            name="Square Footage"
            label={{
              value: 'Square Footage',
              position: 'insideBottom',
              offset: -10,
            }}
          />
          <YAxis
            type="number"
            dataKey="predictedPrice"
            name="Average Predicted Price"
            tickFormatter={(value) => `$${Number(value).toLocaleString()}`}
          />
          <ZAxis
            type="number"
            dataKey="propertyCount"
            range={[60, 300]}
            name="Property Count"
          />
          <Tooltip
            cursor={{ strokeDasharray: '3 3' }}
            content={({ active, payload }) => {
              if (!active || !payload?.length) return null

              const point = payload[0].payload

              return (
                <div className="rounded border bg-white p-3 shadow-md">
                  <p>Square Footage: {point.squareFootage.toLocaleString()}</p>
                  <p>Lot Size: {point.lotSize.toLocaleString()}</p>
                  <p>
                    Average Predicted Price: $
                    {point.predictedPrice.toLocaleString(undefined, {
                      maximumFractionDigits: 0,
                    })}
                  </p>
                  <p>Property Count: {point.propertyCount}</p>
                </div>
              )
            }}
          />
          <Scatter
            name="Property Size Groups"
            data={marketPricesBySize}
            fill="#8884d8"
          />
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  )
}

export default PriceScatterChart
