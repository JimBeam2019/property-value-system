package com.property.market.infrastructure.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.reactive.function.client.WebClient;

/**
 * 
 * Web Client Config
 */
@Configuration 
public class WebClientConfig {
    @Bean 
    public WebClient.Builder webClientBuilder() {
        return WebClient.builder();
    }
}
