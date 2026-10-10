export type MarketFilterRanges = {
  minPrice: number
  maxPrice: number
  minSquareFootage: number
  maxSquareFootage: number
  minBedrooms: number
  maxBedrooms: number
  minYearBuilt: number
  maxYearBuilt: number
  minSchoolRating: number
  maxSchoolRating: number
}

export type MarketStatisticsResponse = {
  count: number
  averagePrice: number
  minPrice: number
  maxPrice: number
  medianPrice: number
  averageSquareFootage: number
  averagePricePerSquareFootage: number
}

export type MarketPropertyType = {
  id: number
  squareFootage: number
  bedrooms: number
  bathrooms: number
  yearBuilt: number
  lotSize: number
  schoolRating: number
  distanceToCityCenter: number
  price: number
}

export type MarketPropertiesResponse = {
  page: number
  size: number
  totalElements: number
  totalPages: number
  properties: MarketPropertyResponse[]
}

export type MarketPropertyResponse = {
  property: {
    squareFootage: number
    bedrooms: number
    bathrooms: number
    yearBuilt: number
    lotSize: number
    distanceToCityCenter: number
    schoolRating: number
  }
  predictedPrice: number
}
