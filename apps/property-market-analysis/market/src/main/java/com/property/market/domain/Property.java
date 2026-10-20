package com.property.market.domain;

/**
 * 
 * Property
 * 
 * @param squareFootage
 * @param bedrooms
 * @param bathrooms
 * @param yearBuilt
 * @param lotSize
 * @param distanceToCityCenter
 * @param schoolRating
 * @param price
 */
public record Property(
                double squareFootage,
                int bedrooms,
                double bathrooms,
                int yearBuilt,
                double lotSize,
                double distanceToCityCenter,
                double schoolRating,
                Double price) {

        public Property(
                        double squareFootage,
                        int bedrooms,
                        double bathrooms,
                        int yearBuilt,
                        double lotSize,
                        double distanceToCityCenter,
                        double schoolRating) {

                this(squareFootage,
                                bedrooms,
                                bathrooms,
                                yearBuilt,
                                lotSize,
                                distanceToCityCenter,
                                schoolRating,
                                null);
        }

        public Property withPrice(Double price) {

                return new Property(
                                squareFootage,
                                bedrooms,
                                bathrooms,
                                yearBuilt,
                                lotSize,
                                distanceToCityCenter,
                                schoolRating,
                                price);
        }
}
