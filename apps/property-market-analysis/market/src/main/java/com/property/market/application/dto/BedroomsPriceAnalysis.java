package com.property.market.application.dto;

/**
 * 
 * BedroomsPriceAnalysis
 * 
 * @param bedrooms
 * @param propertyCount
 * @param averagePredictedPrice
 */
public record BedroomsPriceAnalysis(
                int bedrooms,
                long propertyCount,
                double averagePredictedPrice) {

}
