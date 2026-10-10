package com.property.market.infrastructure.ml;

import java.util.List;
import java.util.concurrent.CompletableFuture;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.WebClient;

import com.property.market.application.dto.PredictionRequest;
import com.property.market.application.port.ModelClient;

/**
 * 
 * ## Http Model Client for Property Value Prodition
 */
@Component 
public class HttpModelClient implements ModelClient{

    private final WebClient webClient;

    public HttpModelClient(
        WebClient.Builder builder,
        @Value("${ml-service.url:http://localhost:8000}") String mlServiceUrl
    ) {
        this.webClient = builder.baseUrl(mlServiceUrl).build();
    }

    /**    (non-Javadoc)
     * Proceeds a single-property value prediction
     * @see com.property.market.application.port.ModelClient#predict(com.property.market.application.dto.PredictionRequest)
     */
    @Override 
    public CompletableFuture<Double> predict(
        PredictionRequest request
    ) {
        return webClient.post()
            .uri("/model/predict")
            .contentType(MediaType.APPLICATION_JSON)
            .bodyValue(request)
            .retrieve()
            .bodyToMono(PredictionResponse.class)
            .map(response -> response.price())
            .toFuture();
    }

    /**    (non-Javadoc)
     * Proceeds a batch-properties value prediction
     * @see com.property.market.application.port.ModelClient#predictBatch(java.util.List)
     */
    @Override 
    public CompletableFuture<List<Double>> predictBatch(
        List<PredictionRequest> requests
    ) {
        return webClient.post()
            .uri("/model/predict")
            .contentType(MediaType.APPLICATION_JSON)
            .bodyValue(requests)
            .retrieve()
            .bodyToFlux(PredictionResponse.class)
            .map(response -> response.price())
            .collectList()
            .toFuture();
    }

    /**
     * 
     * Prediction Response
     * @param square_footage
     * @param bedrooms
     * @param bathrooms
     * @param year_built
     * @param lot_size
     * @param distance_to_city_center
     * @param school_rating
     * @param price
     */
    private record PredictionResponse(
        double square_footage,
        int bedrooms,
        double bathrooms,
        int year_built,
        double lot_size,
        double distance_to_city_center,
        double school_rating,
        double price
    ) {
    }
}
