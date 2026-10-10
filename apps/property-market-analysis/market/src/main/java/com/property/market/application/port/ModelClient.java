package com.property.market.application.port;

import java.util.List;
import java.util.concurrent.CompletableFuture;

import com.property.market.application.dto.PredictionRequest;

/**
 * 
 * Model Client Interface
 */
public interface ModelClient {
    CompletableFuture<Double> predict(
        PredictionRequest request
    );

    CompletableFuture<List<Double>> predictBatch(
        List<PredictionRequest> requests
    );
}
