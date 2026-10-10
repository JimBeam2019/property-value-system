'use client'

import { useMarket } from '../context/MarketProvider'
import PropertyCard from './PropertyCard'
import PropertyNewCard from './PropertyNewCard'
import PropertyWhatIfForm from './PropertyWhatIfForm'

/**
 * Market What-If Analysis
 *
 * @return {*}
 */
const MarketWhatIfAnalysis = () => {
  const { currentProperty, newProperty } = useMarket()

  if (!currentProperty) {
    return <></>
  }

  return (
    <div className="mt-4">
      <div className="w-full overflow-x-auto rounded-lg border border-gray-200 bg-white shadow-sm">
        <div className="grid grid-cols-12 gap-2">
          <div className="col-span-12 sm:col-span-12 lg:col-span-3 p-6">
            <PropertyWhatIfForm property={currentProperty} />
          </div>
          <div className="col-span-12 sm:col-span-12 lg:col-span-4 p-6">
            <h1 className="flex mx-6 text-center items-center">Current</h1>
            <PropertyCard property={currentProperty} />
          </div>
          <div className="col-span-12 sm:col-span-12 lg:col-span-5 p-6">
            {newProperty && (
              <>
                <h1 className="flex mx-6 text-center items-center">New</h1>
                <PropertyNewCard newProperty={newProperty} />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default MarketWhatIfAnalysis
