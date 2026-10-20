package com.property.market.application.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.property.market.domain.Property;

/**
 * 
 * Prediction Request
 * 
 * @param squareFootage
 * @param bedrooms
 * @param bathrooms
 * @param yearBuilt
 * @param lotSize
 * @param distanceToCityConter
 * @param schoolRating
 */
public record PredictionRequest(
        @JsonProperty("square_footage") double squareFootage,
        @JsonProperty("bedrooms") int bedrooms,
        @JsonProperty("bathrooms") double bathrooms,
        @JsonProperty("year_built") int yearBuilt,
        @JsonProperty("lot_size") double lotSize,
        @JsonProperty("distance_to_city_center") double distanceToCityConter,
        @JsonProperty("school_rating") double schoolRating) {

    public static PredictionRequest from(Property property) {
        return new PredictionRequest(
                property.squareFootage(),
                property.bedrooms(),
                property.bathrooms(),
                property.yearBuilt(),
                property.lotSize(),
                property.distanceToCityCenter(),
                property.schoolRating());
    }
}