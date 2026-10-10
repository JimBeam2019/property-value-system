package com.property.market.application.port;

import java.util.List;

import com.property.market.domain.Property;

/**
 * 
 * Housing Data Repository Interface
 */
public interface HousingDataRepository {
    List<Property> findAll();
}
