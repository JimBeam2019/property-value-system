import { MarketPropertyType } from '@/types/market'

export type ExportColumn<T> = {
  header: string
  value: (row: T) => string | number | null | undefined
}

export const propertyColumns: ExportColumn<MarketPropertyType>[] = [
  { header: 'Square Footage', value: ({ squareFootage }) => squareFootage },
  { header: 'Bedrooms', value: ({ bedrooms }) => bedrooms },
  { header: 'Bathrooms', value: ({ bathrooms }) => bathrooms },
  { header: 'Year Built', value: ({ yearBuilt }) => yearBuilt },
  { header: 'Lot Size', value: ({ lotSize }) => lotSize },
  { header: 'School Rating', value: ({ schoolRating }) => schoolRating },
  {
    header: 'Distance to City Center',
    value: ({ distanceToCityCenter }) => distanceToCityCenter,
  },
  { header: 'Price (USD)', value: ({ price }) => price },
]
