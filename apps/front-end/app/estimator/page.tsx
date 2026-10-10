import { Suspense } from 'react'

import dynamic from 'next/dynamic'
import { Metadata } from 'next'

import PropertyForm from './component/PropertyForm'
import Tabs from './component/Tabs'
import EstimateProvider from './context/EstimateProvider'
import PropertyDetails from './component/PropertyDetails'

const PredictionHistory = dynamic(() => import('./component/PredictionHistory'))
const PropertyComparison = dynamic(
  () => import('./component/PropertyComparison')
)

export const metadata: Metadata = {
  title: 'Property Value Estimator',
  description: 'Property Value Estimator',
}

/**
 * Property Value Estimator Page
 *
 * @return {*}
 */
const ValueEstimatorPage = () => {
  return (
    <main>
      <EstimateProvider>
        <Suspense fallback={<p>🌀 Loading Property Form...</p>}>
          <PropertyForm />
        </Suspense>

        <Suspense fallback={<p>🌀 Loading Prediction Result...</p>}>
          <PropertyDetails />
        </Suspense>

        <Suspense fallback={<p>🌀 Loading Property...</p>}>
          <div className="m-6">
            <Tabs
              tabs={[
                {
                  label: 'History',
                  content: (
                    <Suspense
                      fallback={<p>🌀 Loading Prediction History...</p>}
                    >
                      <PredictionHistory />
                    </Suspense>
                  ),
                },
                {
                  label: 'Comparison',
                  content: (
                    <Suspense
                      fallback={<p>🌀 Loading Property Comparison...</p>}
                    >
                      <PropertyComparison />
                    </Suspense>
                  ),
                },
              ]}
            />
          </div>
        </Suspense>
      </EstimateProvider>
    </main>
  )
}

export default ValueEstimatorPage
