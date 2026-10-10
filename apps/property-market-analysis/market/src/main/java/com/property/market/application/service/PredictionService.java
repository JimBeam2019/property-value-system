package com.property.market.application.service;

import java.util.List;
import java.util.concurrent.CompletableFuture;

import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import com.property.market.application.dto.PredictionRequest;
import com.property.market.application.port.ModelClient;

/**
 * 
 * Prediction Service Use Case
 */
@Service 
public class PredictionService {
    private final ModelClient modelClient;

    public PredictionService(ModelClient modelClient) {
        this.modelClient = modelClient;
    }

    /**
     * Proceeds a single-property value prediction 
     * @param request
     * @return
     */
    @Cacheable(value = "predictions", key = "#request")
    public CompletableFuture<Double> predict(PredictionRequest request) {
        return modelClient.predict(request);
    }

    /**
     * Proceeds a multiple-properties value prediction 
     * @param requests
     * @return
     */
    public CompletableFuture<List<Double>> predictBatch(
        List<PredictionRequest> requests
    ) {
        if (requests.isEmpty()) {
            return CompletableFuture.completedFuture(List.of());
        }

        return modelClient.predictBatch(requests);
    }
}
