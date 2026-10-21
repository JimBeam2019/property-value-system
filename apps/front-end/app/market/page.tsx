import { Suspense } from 'react'

import MarketProvider from './context/MarketProvider'
import MarketDashboard from './components/market-dashboard'
import MarketTableAnalysis from './components/market-table-analysis'

export const metadata = {
  title: 'Property Market Analysis',
  description: 'Property Market Analysis',
}

/**
 * Market Analysis Page
 *
 * @return {*}
 */
const MarketAnalysisPage = async () => {
  return (
    <main>
      <MarketProvider>
        <Suspense fallback={<p>🌀 Loading Market Dashboard...</p>}>
          <MarketDashboard />
        </Suspense>

        <Suspense fallback={<p>🌀 Loading Market Analysis...</p>}>
          <MarketTableAnalysis />
        </Suspense>
      </MarketProvider>
    </main>
  )
}

export default MarketAnalysisPage
