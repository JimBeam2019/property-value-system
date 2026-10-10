package com.property.market.infrastructure.config;

import java.time.Duration;

import org.springframework.cache.CacheManager;
import org.springframework.cache.caffeine.CaffeineCacheManager;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.github.benmanes.caffeine.cache.Caffeine;

/**
 * 
 * Cache Config
 */
@Configuration 
public class CacheConfig {

    @Bean 
    public CacheManager cacheManager() {
        CaffeineCacheManager manager = new CaffeineCacheManager(
            "predictions",
                "marketStatistics",
                "priceByYearBuilt",
                "marketProperties"
        );

        manager.setCaffeine(
            Caffeine.newBuilder().maximumSize(1_000).expireAfterWrite(
                Duration.ofMinutes(10)
            )
        );

        return manager;
    }
}
