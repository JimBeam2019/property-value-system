package com.property.market.application.dto;

/**
 * 
 * Yearly Price Analysis
 * 
 * @param yearBuilt
 * @param propertyCount
 * @param averagePredictedPrice
 */
public record YearlyPriceAnalysis(
        int yearBuilt,
        long propertyCount,
        double averagePredictedPrice) {
}
