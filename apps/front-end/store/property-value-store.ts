import { PropertyType } from '@/types/property'
import { create } from 'zustand'

export type PropertyStoreState = {
  properties: PropertyType[]
  addProperty: (newProperty: PropertyType) => void
}

/**
 * Property Value Store for Caching
 */
export const usePropertyValueStore = create<PropertyStoreState>()((set) => ({
  properties: [] as PropertyType[],
  addProperty: (newProperty: PropertyType) =>
    set(({ properties }: PropertyStoreState) => ({
      properties: [...properties, newProperty],
    })),
}))
