package com.property.market.application.dto;

/**
 * 
 * PriceBySizeAnalysis
 * 
 * @param squareFootage
 * @param lotSize
 * @param predictedPrice
 * @param propertyCount
 */
public record PriceBySizeAnalysis(
        double squareFootage,
        double lotSize,
        double predictedPrice,
        long propertyCount) {

}
