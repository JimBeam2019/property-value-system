import { Suspense } from 'react'
import MarketProvider from './context/MarketProvider'
import MarketDashboard from './components/MarketDashboard'
import MarketTableAnalysis from './components/MarketTableAnalysis'

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
