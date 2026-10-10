package com.property.market.domain;

/**
 * 
 * Market Statistics
 * @param count
 * @param averagePrice
 * @param minPrice
 * @param maxPrice
 * @param medianPrice
 * @param averageSquareFootage
 * @param averagePricePerSquareFootage
 */
public record MarketStatistics(
        long count,
        double averagePrice,
        double minPrice,
        double maxPrice,
        double medianPrice,
        double averageSquareFootage,
        double averagePricePerSquareFootage
) {
}