package com.property.market.application.dto;

/**
 * 
 * ## Market Filter
 * @param minBedrooms Integer
 * @param maxBedrooms Integer
 * @param minYearBuilt Integer
 * @param maxYearBuilt Integer
 * @param minSquareFootage Double
 * @param maxSquareFootage Double
 * @param minSchoolRating Double
 * @param maxSchoolRating Double
 */
public record MarketFilter(
    Integer minBedrooms,
    Integer maxBedrooms,
    Integer minYearBuilt,
    Integer maxYearBuilt,
    Double minSquareFootage,
    Double maxSquareFootage,
    Double minSchoolRating,
    Double maxSchoolRating
) {
    public static MarketFilter empty() {
        return new MarketFilter(null, null, null, null, null, null,null,null);
    }
}
