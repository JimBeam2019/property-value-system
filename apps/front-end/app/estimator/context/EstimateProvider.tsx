'use client'

import { PropertyType } from '@/types/property'
import { createContext, ReactNode, useContext, useState } from 'react'

export interface EstimateContextType {
  curPropertyEstimate: PropertyType | null
  setCurPropertyEstimate: (property: PropertyType) => void
}

const EstimateContext = createContext<EstimateContextType | null>(null)

export const useEstimate = (): EstimateContextType => {
  const context = useContext(EstimateContext)

  if (context === null) {
    throw new Error('useEstimate must be used within a EstimateProvider')
  }

  return context
}

/**
 * Estimate Provider
 * - Sets current property
 *
 * @param {{ children: ReactNode }} { children }
 * @return {*}
 */
const EstimateProvider = ({ children }: { children: ReactNode }) => {
  const [curProperty, setCurProperty] = useState<PropertyType | null>(null)

  const setCurPropertyEstimate = (property: PropertyType) =>
    setCurProperty(property)

  return (
    <EstimateContext.Provider
      value={{ curPropertyEstimate: curProperty, setCurPropertyEstimate }}
    >
      {children}
    </EstimateContext.Provider>
  )
}

export default EstimateProvider
