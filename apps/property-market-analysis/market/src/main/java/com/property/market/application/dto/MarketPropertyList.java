package com.property.market.application.dto;

import java.util.List;

/**
 * 
 * Market Property List
 * @param properties
 * @param page
 * @param size
 * @param totalElements
 * @param totalPages
 */
public record MarketPropertyList(
    List<PropertyAnalysis> properties,
    int page,
    int size,
    long totalElements,
    int totalPages
) {
    
}
