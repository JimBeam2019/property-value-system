package com.property.market.presentation;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.property.market.application.dto.MarketFilter;
import com.property.market.application.dto.MarketFilterRange;
import com.property.market.application.dto.MarketPropertyList;
import com.property.market.application.dto.WhatIfRequest;
import com.property.market.application.dto.YearlyPriceAnalysis;
import com.property.market.application.service.MarketAnalysisService;
import com.property.market.application.service.PredictionService;
import com.property.market.domain.MarketStatistics;

import jakarta.validation.Valid;

import java.util.List;
import java.util.concurrent.CompletableFuture;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

/**
 * 
 * Market API Router
 */
@RestController 
@RequestMapping("/api/market")
public class MarketAPIRouter {
    private final MarketAnalysisService marketAnalysisService;
    private final PredictionService predictionService;

    public MarketAPIRouter(
        MarketAnalysisService marketAnalysisService,
        PredictionService predictionService
    ) {
        this.marketAnalysisService = marketAnalysisService;
        this.predictionService = predictionService;
    }

    /**
     * Get Market Filter Ranges (Minimum and Maxmum)
     * @return
     */
    @GetMapping("/filter-ranges")
    public CompletableFuture<ResponseEntity<MarketFilterRange>> filterRanges() {
        return marketAnalysisService.filterRanges()
                .thenApply(ResponseEntity::ok);
    }
    

    /**
     * Get Market Statistics
     * @param minBedrooms
     * @param maxBedrooms
     * @param minYearBuilt
     * @param maxYearBuilt
     * @param minSquareFootage
     * @param maxSquareFootage
     * @param minSchoolRating
     * @param maxSchoolRating
     * @return
     */
    @GetMapping("/statistics")
    public CompletableFuture<ResponseEntity<MarketStatistics>> statistics(
        @RequestParam(name = "minBedrooms", required = false) Integer minBedrooms,
        @RequestParam(name = "maxBedrooms", required = false) Integer maxBedrooms,
        @RequestParam(name = "minYearBuilt", required = false) Integer minYearBuilt,
        @RequestParam(name = "maxYearBuilt", required = false) Integer maxYearBuilt,
        @RequestParam(name = "minSquareFootage", required = false) Double minSquareFootage,
        @RequestParam(name = "maxSquareFootage", required = false) Double maxSquareFootage,
        @RequestParam(name = "minSchoolRating", required = false) Double minSchoolRating,
        @RequestParam(name = "maxSchoolRating", required = false) Double maxSchoolRating
    ) {
        MarketFilter filter = new MarketFilter(
            minBedrooms,
            maxBedrooms,
            minYearBuilt,
            maxYearBuilt,
            minSquareFootage,   
            maxSquareFootage,
            minSchoolRating,
            maxSchoolRating
        );

        return marketAnalysisService.statistics(filter)
                .thenApply(ResponseEntity::ok);
    }

    /**
     * Get Price by Year Built
     * @param minBedrooms
     * @param maxBedrooms
     * @param minYearBuilt
     * @param maxYearBuilt
     * @param minSquareFootage
     * @param maxSquareFootage
     * @param minSchoolRating
     * @param maxSchoolRating
     * @return
     */
    @GetMapping("/price-by-year-built")
    public CompletableFuture<ResponseEntity<List<YearlyPriceAnalysis>>> priceByYearBuilt(
        @RequestParam(name = "minBedrooms", required = false) Integer minBedrooms,
        @RequestParam(name = "maxBedrooms", required = false) Integer maxBedrooms,
        @RequestParam(name = "minYearBuilt", required = false) Integer minYearBuilt,
        @RequestParam(name = "maxYearBuilt", required = false) Integer maxYearBuilt,
        @RequestParam(name = "minSquareFootage", required = false) Double minSquareFootage,
        @RequestParam(name = "maxSquareFootage", required = false) Double maxSquareFootage,
        @RequestParam(name = "minSchoolRating", required = false) Double minSchoolRating,
        @RequestParam(name = "maxSchoolRating", required = false) Double maxSchoolRating
    ) {
        MarketFilter filter = new MarketFilter(
            minBedrooms,
            maxBedrooms,
            minYearBuilt,
            maxYearBuilt,
            minSquareFootage,
            maxSquareFootage,
            minSchoolRating,
            maxSchoolRating
        );

        return marketAnalysisService.priceByYearBuilt(filter)
                .thenApply(ResponseEntity::ok);
    }
    
    /**
     * Get Properties
     * @param page
     * @param size
     * @param sort
     * @param descending
     * @param minBedrooms
     * @param maxBedrooms
     * @param minYearBuilt
     * @param maxYearBuilt
     * @param minSquareFootage
     * @param maxSquareFootage
     * @param minSchoolRating
     * @param maxSchoolRating
     * @return
     */
    @GetMapping("/properties")
    public CompletableFuture<ResponseEntity<MarketPropertyList>> properties(
        @RequestParam(name = "page", defaultValue = "0") int page,
        @RequestParam(name = "size", defaultValue = "20") int size,
        @RequestParam(name = "sort", defaultValue = "squareFootage") String sort,
        @RequestParam(name = "descending", defaultValue = "false") boolean descending,
        @RequestParam(name = "minBedrooms", required = false) Integer minBedrooms,
        @RequestParam(name = "maxBedrooms", required = false) Integer maxBedrooms,
        @RequestParam(name = "minYearBuilt", required = false) Integer minYearBuilt,
        @RequestParam(name = "maxYearBuilt", required = false) Integer maxYearBuilt,
        @RequestParam(name = "minSquareFootage", required = false) Double minSquareFootage,
        @RequestParam(name = "maxSquareFootage", required = false) Double maxSquareFootage,
        @RequestParam(name = "minSchoolRating", required = false) Double minSchoolRating,
        @RequestParam(name = "maxSchoolRating", required = false) Double maxSchoolRating
    ) {
        if (page < 0 || size < 1 || size > 100) {
            throw new IllegalArgumentException("page must be >= 0 and size must be between 1 and 100");
        }

        MarketFilter filter = new MarketFilter(
            minBedrooms,
                maxBedrooms,
                minYearBuilt,
                maxYearBuilt,
                minSquareFootage,
                maxSquareFootage,
                minSchoolRating,
                maxSchoolRating
        );
        return marketAnalysisService.properties(filter, page, size, sort, descending)
                .thenApply(ResponseEntity::ok);
    }
    
    /**
     * Post Property Value Estimation for What-If Analysis
     * @param request
     * @return
     */
    @PostMapping("/what-if")
    public CompletableFuture<ResponseEntity<WhatIfResponse>> whatIf(
        @Valid @RequestBody WhatIfRequest request
    ) {
        return predictionService.predict(request.toPredictionRequest())
                .thenApply(prediction -> ResponseEntity.ok(
                    new WhatIfResponse(request, prediction)
                ));
    }
    
    /**
     * 
     * What-If Response
     * @param property
     * @param predictedPrice
     */
    private record WhatIfResponse(
        WhatIfRequest property,
        double predictedPrice
    ) {
    }
}
