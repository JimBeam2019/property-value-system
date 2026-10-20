package com.property.market.application.dto;

/**
 * 
 * MarketFilter
 * 
 * @param minPrice
 * @param maxPrice
 * @param minBedrooms
 * @param maxBedrooms
 * @param minYearBuilt
 * @param maxYearBuilt
 * @param minSquareFootage
 * @param maxSquareFootage
 * @param minSchoolRating
 * @param maxSchoolRating
 */
public record MarketFilter(
        Double minPrice,
        Double maxPrice,
        Integer minBedrooms,
        Integer maxBedrooms,
        Integer minYearBuilt,
        Integer maxYearBuilt,
        Double minSquareFootage,
        Double maxSquareFootage,
        Double minSchoolRating,
        Double maxSchoolRating) {

    public static MarketFilter empty() {
        return new MarketFilter(null, null, null, null, null, null, null, null, null, null);
    }
}
