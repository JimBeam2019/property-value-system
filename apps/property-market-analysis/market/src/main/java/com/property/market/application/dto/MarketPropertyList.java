package com.property.market.application.dto;

import java.util.List;

import com.property.market.domain.Property;

/**
 * 
 * Market Property List
 * 
 * @param properties
 * @param page
 * @param size
 * @param totalElements
 * @param totalPages
 */
public record MarketPropertyList(
        List<Property> properties,
        int page,
        int size,
        long totalElements,
        int totalPages) {

}
