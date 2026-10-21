package com.property.market.application.service;

import java.util.Comparator;
import java.util.List;
import java.util.Map;
import java.util.TreeMap;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import com.property.market.application.dto.BedroomsPriceAnalysis;
import com.property.market.application.dto.MarketFilter;
import com.property.market.application.dto.MarketFilterRange;
import com.property.market.application.dto.MarketPropertyList;
import com.property.market.application.dto.PriceBySizeAnalysis;
import com.property.market.application.dto.YearlyPriceAnalysis;
import com.property.market.application.port.HousingDataRepository;
import com.property.market.domain.MarketStatistics;
import com.property.market.domain.Property;

/**
 * 
 * Market Analysis Service
 */
@Service
public class MarketAnalysisService {
        private final HousingDataRepository repository;

        public MarketAnalysisService(
                        @Qualifier("csvHousingDataRepository") HousingDataRepository repository) {
                this.repository = repository;
        }

        /**
         * Gets Market Filter Ranges (Minimum and Maxmum)
         * 
         * @return
         */
        @Cacheable(value = "marketFilterRanges", key = "#filter")
        public MarketFilterRange filterRanges() {
                List<Property> properties = repository.findAll();

                List<Double> prices = IntStream.range(0, properties.size())
                                .mapToObj(i -> properties.get(i).price())
                                .toList();

                Double minPrice = prices.stream()
                                .mapToDouble(response -> response.doubleValue())
                                .min().orElse(0.0);

                Double maxPrice = prices.stream()
                                .mapToDouble(response -> response.doubleValue())
                                .max().orElse(0.0);

                Double minSquareFootage = properties.stream()
                                .mapToDouble(response -> response.squareFootage())
                                .min().orElse(0.0);

                Double maxSquareFootage = properties.stream()
                                .mapToDouble(response -> response.squareFootage())
                                .max().orElse(0.0);

                Integer minBedrooms = properties.stream()
                                .mapToInt(response -> response.bedrooms())
                                .min().orElse(0);

                Integer maxBedrooms = properties.stream()
                                .mapToInt(response -> response.bedrooms())
                                .max().orElse(0);

                Integer minYearBuilt = properties.stream()
                                .mapToInt(response -> response.yearBuilt())
                                .min().orElse(0);

                Integer maxYearBuilt = properties.stream()
                                .mapToInt(response -> response.yearBuilt())
                                .max().orElse(0);

                Double minSchoolRating = properties.stream()
                                .mapToDouble(response -> response.schoolRating())
                                .min().orElse(0.0);

                Double maxSchoolRating = properties.stream()
                                .mapToDouble(response -> response.schoolRating())
                                .max().orElse(0.0);

                return new MarketFilterRange(
                                minPrice,
                                maxPrice,
                                minSquareFootage,
                                maxSquareFootage,
                                minBedrooms,
                                maxBedrooms,
                                minYearBuilt,
                                maxYearBuilt,
                                minSchoolRating,
                                maxSchoolRating);
        }

        /**
         * Returns Market Statistics
         * 
         * @param filter
         * @return
         */
        @Cacheable(value = "marketStatistics", key = "#filter")
        public MarketStatistics statistics(MarketFilter filter) {
                List<Property> properties = filtered(filter);

                if (properties.isEmpty()) {
                        throw new IllegalArgumentException("No properties match the supplied filters");
                }

                return analyse(properties);
        }

        /**
         * 
         * @param filter
         * @return
         */
        @Cacheable(value = "priceByYearBuilt", key = "#filter")
        public List<YearlyPriceAnalysis> priceByYearBuilt(MarketFilter filter) {
                List<Property> properties = filtered(filter);

                return properties.stream()
                                .collect(Collectors.groupingBy(
                                                a -> (a.yearBuilt() / 10) * 10,
                                                Collectors.toList()))
                                .entrySet()
                                .stream()
                                .sorted(java.util.Map.Entry.comparingByKey())
                                .map(entry -> new YearlyPriceAnalysis(
                                                entry.getKey(),
                                                entry.getValue().size(),
                                                entry.getValue().stream()
                                                                .mapToDouble(res -> res.price())
                                                                .average()
                                                                .orElse(0.0)))
                                .toList();

        }

        /**
         * 
         * @param filter
         * @return
         */
        @Cacheable(value = "priceByBedrooms", key = "#filter")
        public List<BedroomsPriceAnalysis> priceByBedrooms(MarketFilter filter) {
                List<Property> properties = filtered(filter);

                return properties.stream()
                                .collect(Collectors.groupingBy(a -> a.bedrooms(), TreeMap::new, Collectors.toList()))
                                .entrySet()
                                .stream()
                                .map(entry -> new BedroomsPriceAnalysis(
                                                entry.getKey(),
                                                entry.getValue().size(),
                                                entry.getValue().stream()
                                                                .mapToDouble(Property::price)
                                                                .average()
                                                                .orElse(0.0)))
                                .toList();
        }

        /**
         * 
         * @param filter
         * @return
         */
        @Cacheable(value = "priceBySize", key = "#filter")
        public List<PriceBySizeAnalysis> priceBySize(MarketFilter filter) {

                List<Property> properties = filtered(filter);

                return properties.stream()
                                .filter(p -> p.squareFootage() > 0 && p.lotSize() > 0)
                                .collect(Collectors.groupingBy(
                                                p -> new SizeGroup(
                                                                ((int) p.squareFootage() / 500) * 500,
                                                                ((int) p.lotSize() / 1000) * 1000)))
                                .entrySet()
                                .stream()
                                .sorted(Comparator
                                                .comparingInt((Map.Entry<SizeGroup, List<Property>> e) -> e.getKey()
                                                                .squareFootageRange())
                                                .thenComparingInt(e -> e.getKey().lotSizeRange()))
                                .map(entry -> new PriceBySizeAnalysis(
                                                entry.getKey().squareFootageRange() + 250.0,
                                                entry.getKey().lotSizeRange() + 500.0,
                                                entry.getValue().stream()
                                                                .mapToDouble(Property::price)
                                                                .average()
                                                                .orElse(0.0),
                                                entry.getValue().size()))
                                .toList();
        }

        /**
         * Returns properties with estimated prices
         * 
         * @param filter
         * @param page
         * @param size
         * @param sort
         * @param descending
         * @return
         */
        @Cacheable(value = "marketProperties", key = "#filter + ':' + #page + ':' + #size + ':' + #sort + ':' + #descending")
        public MarketPropertyList properties(
                        MarketFilter filter,
                        int page,
                        int size,
                        String sort,
                        boolean descending) {
                List<Property> filtered = filtered(filter);
                Comparator<Property> comparator = comparator(sort);
                if (descending) {
                        comparator = comparator.reversed();
                }

                List<Property> sorted = filtered.stream().sorted(comparator).toList();
                int from = Math.min(page * size, sorted.size());
                int to = Math.min(from + size, sorted.size());
                List<Property> pageItems = sorted.subList(from, to);

                int totalPages = size == 0 ? 0 : (int) Math.ceil((double) sorted.size() / size);

                return new MarketPropertyList(
                                pageItems,
                                page,
                                size,
                                sorted.size(),
                                totalPages);
        }

        /**
         * Analyses property market
         * 
         * @param properties
         * @return
         */
        private MarketStatistics analyse(List<Property> properties) {

                List<Double> prices = IntStream.range(0, properties.size())
                                .mapToObj(i -> properties.get(i).price())
                                .toList();

                double averagePrice = prices.stream()
                                .mapToDouble(response -> response.doubleValue())
                                .average().orElse(0.0);

                double minPrice = prices.stream()
                                .mapToDouble(response -> response.doubleValue())
                                .min().orElse(0.0);

                double maxPrice = prices.stream()
                                .mapToDouble(response -> response.doubleValue())
                                .max().orElse(0.0);

                double medianPrice = median(prices);

                double averageSquareFootage = properties.stream()
                                .mapToDouble(response -> response.squareFootage())
                                .average().orElse(0.0);

                double averagePricePerSquareFootage = properties.stream()
                                .mapToDouble(a -> a.price() / a.squareFootage()).average().orElse(0.0);

                return new MarketStatistics(
                                properties.size(),
                                averagePrice,
                                minPrice,
                                maxPrice,
                                medianPrice,
                                averageSquareFootage,
                                averagePricePerSquareFootage);
        }

        /**
         * Filter properties
         * 
         * @param filter
         * @return
         */
        private List<Property> filtered(MarketFilter filter) {
                if (filter == null) {
                        return repository.findAll();
                }

                return repository.findAll().stream()
                                .filter(p -> filter.minPrice() == null || p.price() >= filter.minPrice())
                                .filter(p -> filter.maxPrice() == null || p.price() <= filter.maxPrice())
                                .filter(p -> filter.minBedrooms() == null || p.bedrooms() >= filter.minBedrooms())
                                .filter(p -> filter.maxBedrooms() == null || p.bedrooms() <= filter.maxBedrooms())
                                .filter(p -> filter.minYearBuilt() == null || p.yearBuilt() >= filter.minYearBuilt())
                                .filter(p -> filter.maxYearBuilt() == null || p.yearBuilt() <= filter.maxYearBuilt())
                                .filter(p -> filter.minSquareFootage() == null
                                                || p.squareFootage() >= filter.minSquareFootage())
                                .filter(p -> filter.maxSquareFootage() == null
                                                || p.squareFootage() <= filter.maxSquareFootage())
                                .filter(p -> filter.minSchoolRating() == null
                                                || p.schoolRating() >= filter.minSchoolRating())
                                .filter(p -> filter.maxSchoolRating() == null
                                                || p.schoolRating() <= filter.maxSchoolRating())
                                .toList();
        }

        /**
         * Sets a sorting indicator.
         * 
         * @param sort
         * @return
         */
        private Comparator<Property> comparator(String sort) {
                return switch (sort == null ? "squareFootage" : sort) {
                        case "bedrooms" -> Comparator.comparingInt(property -> property.bedrooms());
                        case "bathrooms" -> Comparator.comparingDouble(property -> property.bathrooms());
                        case "yearBuilt" -> Comparator.comparingInt(property -> property.yearBuilt());
                        case "lotSize" -> Comparator.comparingDouble(property -> property.lotSize());
                        case "distanceToCityCenter" ->
                                Comparator.comparingDouble(property -> property.distanceToCityCenter());
                        case "schoolRating" -> Comparator.comparingDouble(property -> property.schoolRating());
                        default -> Comparator.comparingDouble(property -> property.squareFootage());
                };
        }

        /**
         * Calculates median
         * 
         * @param values
         * @return
         */
        private double median(List<Double> values) {
                if (values.isEmpty()) {
                        return 0.0;
                }

                int size = values.size();
                if (size % 2 == 1) {
                        return values.get(size / 2);
                }

                return (values.get(size / 2 - 1) + values.get(size / 2)) / 2.0;
        }

        private record SizeGroup(int squareFootageRange, int lotSizeRange) {
        }
}
