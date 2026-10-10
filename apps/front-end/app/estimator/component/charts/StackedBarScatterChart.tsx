'use client'

import {
  ComposedChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Scatter,
  createHorizontalChart,
} from 'recharts'
import { RechartsDevtools } from '@recharts/devtools'

type HorDataType = {
  name: string
  uv: number
  pv: number
  amt: number
  cnt: number
}

const Typed = createHorizontalChart<HorDataType, string, number>()({
  ComposedChart,
  Bar,
  Scatter,
  XAxis,
  YAxis,
  Tooltip,
})

// #region Sample data
const data = [
  {
    name: 'Page A',
    uv: 590,
    pv: 800,
    amt: 1400,
    cnt: 490,
  },
  {
    name: 'Page B',
    uv: 868,
    pv: 967,
    amt: 1506,
    cnt: 590,
  },
  {
    name: 'Page C',
    uv: 1397,
    pv: 1098,
    amt: 989,
    cnt: 350,
  },
  {
    name: 'Page D',
    uv: 1480,
    pv: 1200,
    amt: 1228,
    cnt: 480,
  },
  {
    name: 'Page E',
    uv: 1520,
    pv: 1108,
    amt: 1100,
    cnt: 460,
  },
  {
    name: 'Page F',
    uv: 1400,
    pv: 680,
    amt: 1700,
    cnt: 380,
  },
]

// #endregion
const StackedBarScatterChart = () => {
  return (
    <Typed.ComposedChart
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
        bottom: 5,
        left: 0,
      }}
    >
      <CartesianGrid />
      <Typed.XAxis dataKey="name" scale="band" />
      <Typed.YAxis
        yAxisId="left"
        type="number"
        dataKey="amt"
        name="weight"
        unit="kg"
        width="auto"
        niceTicks="snap125"
      />
      <Typed.YAxis
        yAxisId="right"
        type="number"
        dataKey="uv"
        name="weight"
        unit="USD"
        orientation="right"
        width="auto"
        niceTicks="snap125"
      />
      <Typed.Tooltip />
      <Legend />
      <Typed.Bar dataKey="amt" stackId="a" fill="#8884d8" background />
      <Typed.Bar dataKey="pv" stackId="a" fill="#413ea0" background />
      <Typed.Scatter dataKey="uv" fill="#ff7300" />
      <RechartsDevtools />
    </Typed.ComposedChart>
  )
}

export default StackedBarScatterChart
