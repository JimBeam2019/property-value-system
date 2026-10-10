import { getMarketFilterRanges } from '@/libs/market'
import MarketFilterForm from './MarketFilterForm'
import MarketAnalysisDetails from './MarketAnaylsisDetails'
// import SquareFootageScatterChart from './charts/SquareFootageScatterChart'
// import SimpleBarChart from './charts/LineChart'

/**
 * Market Dashboard
 *
 * @return {*}
 */
const MarketDashboard = async () => {
  const marketFilterRanges = await getMarketFilterRanges()

  return (
    <div className="m-4">
      <div className="w-full overflow-x-auto rounded-lg border border-gray-200 bg-white shadow-sm">
        <div className="grid grid-cols-12 gap-2">
          <div className="col-span-12 sm:col-span-12 lg:col-span-3 p-6">
            <MarketFilterForm marketFilterRanges={marketFilterRanges} />
          </div>

          <div className="col-span-12 sm:col-span-12 lg:col-span-9 p-6">
            <MarketAnalysisDetails />

            {/* <SquareFootageScatterChart />

            <SimpleBarChart /> */}
          </div>
        </div>
      </div>
    </div>
  )
}

export default MarketDashboard
