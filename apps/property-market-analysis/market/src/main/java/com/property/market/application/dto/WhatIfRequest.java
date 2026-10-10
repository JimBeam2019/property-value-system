package com.property.market.application.dto;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Min;

/**
 * 
 * What-If Request
 * @param squareFootage
 * @param bedrooms
 * @param bathrooms
 * @param yearBuilt
 * @param lotSize
 * @param distanceToCityCenter
 * @param schoolRating
 */
public record WhatIfRequest(
    @DecimalMin(value = "0.01") double squareFootage,
    @Min(0) int bedrooms,
    @DecimalMin(value = "0.0") double bathrooms,
    @Min(1800) int yearBuilt,
    @DecimalMin(value = "0.01") double lotSize,
    @DecimalMin(value = "0.0") double distanceToCityCenter,
    @DecimalMin(value = "0.0") double schoolRating
) {
    public PredictionRequest toPredictionRequest() {
        return new PredictionRequest(
            squareFootage,
            bedrooms,
            bathrooms,
            yearBuilt,
            lotSize,
            distanceToCityCenter,
            schoolRating
        );
    }
} 