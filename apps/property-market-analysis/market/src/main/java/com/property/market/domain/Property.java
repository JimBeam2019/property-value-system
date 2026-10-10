package com.property.market.domain;

/**
 * 
 * Property
 * @param squareFootage
 * @param bedrooms
 * @param bathrooms
 * @param yearBuilt
 * @param lotSize
 * @param distanceToCityCenter
 * @param schoolRating
 */
public record Property(
        double squareFootage,
        int bedrooms,
        double bathrooms,
        int yearBuilt,
        double lotSize,
        double distanceToCityCenter,
        double schoolRating
) {
}
