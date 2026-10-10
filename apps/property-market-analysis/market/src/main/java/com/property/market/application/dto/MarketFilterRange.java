package com.property.market.application.dto;

/**
 * 
 * Market Filter Range
 * @param minPrice Double
 * @param maxPrice Double
 * @param minSquareFootage Double
 * @param maxSquareFootage Double
 * @param minBedrooms Integer
 * @param maxBedrooms Integer
 * @param minYearBuilt Integer
 * @param maxYearBuilt Integer
 * @param minSchoolRating Double
 * @param maxSchoolRating Double
 */
public record MarketFilterRange(
    Double minPrice,
    Double maxPrice,
    Double minSquareFootage,
    Double maxSquareFootage,
    Integer minBedrooms,
    Integer maxBedrooms,
    Integer minYearBuilt,
    Integer maxYearBuilt,
    Double minSchoolRating,
    Double maxSchoolRating
) {
    
}
