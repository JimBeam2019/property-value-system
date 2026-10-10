package com.property.market.presentation;

import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

/**
 * 
 * API Exception Handler
 */
@RestControllerAdvice 
public class ApiExceptionHandler {
    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<Map<String, String>> handleBadRequest(IllegalArgumentException es) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(Map.of("error", es.getMessage()));
    }

    @ExceptionHandler (Exception.class)
    public ResponseEntity<Map<String, String>> handleUnexpected(Exception ex) {
        return ResponseEntity.status(HttpStatus.BAD_GATEWAY)
                .body(Map.of("error", "Unable to complete the market analysis request"));
    }
}
