package com.property.market.infrastructure.dataset;

import java.io.IOException;
import java.io.InputStream;
import java.io.PushbackInputStream;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.IntStream;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Repository;

import com.fasterxml.jackson.databind.MappingIterator;
import com.fasterxml.jackson.dataformat.csv.CsvMapper;
import com.fasterxml.jackson.dataformat.csv.CsvSchema;
import com.property.market.application.dto.PredictionRequest;
import com.property.market.application.port.HousingDataRepository;
import com.property.market.application.port.ModelClient;
import com.property.market.domain.Property;

/**
 * 
 * ## CSV Housing Data Repository
 */
@Repository
public class CsvHousingDataRepository implements HousingDataRepository {

    private final List<Property> properties;

    public CsvHousingDataRepository(
            @Qualifier("httpModelClient") ModelClient modelClient,
            @Value("${housing.dataset-path:classpath:/data/Test Data For Prediction.csv}") String datasetPath) {

        List<Property> srcProperties = load(datasetPath);

        List<Double> prices = modelClient.predictBatch(
                srcProperties.stream().map(PredictionRequest::from).toList()).join();

        if (prices.size() != srcProperties.size()) {
            throw new IllegalStateException(
                    "ML service returned "
                            + prices.size()
                            + " predictions for "
                            + srcProperties.size()
                            + " properties");
        }

        this.properties = IntStream.range(0, srcProperties.size())
                .mapToObj(i -> srcProperties.get(i).withPrice(prices.get(i))).toList();
    }

    /**
     * (non-Javadoc)
     * Returns all properties
     * 
     * @see com.property.market.application.port.HousingDataRepository#findAll()
     */
    @Override
    public List<Property> findAll() {
        return properties;
    }

    /**
     * Load property data set from CSV
     * 
     * @param datasetPath
     * @return
     */
    private List<Property> load(String datasetPath) {
        try (InputStream input = open(datasetPath)) {
            CsvMapper mapper = new CsvMapper();
            CsvSchema schema = CsvSchema.emptySchema().withHeader();

            MappingIterator<Row> rows = mapper.readerFor(Row.class)
                    .with(schema)
                    .readValues(input);

            List<Property> properties = new ArrayList<>();

            while (rows.hasNext()) {
                properties.add(rows.next().toProperty());
            }

            return properties;
        } catch (Exception e) {
            throw new IllegalStateException("Unable to load housing dataset: " + datasetPath, e);
        }
    }

    /**
     * Open CSV file from path
     * 
     * @param datasetPath
     * @return
     */
    private InputStream open(String datasetPath) {
        try {
            InputStream input;

            if (datasetPath.startsWith("classpath:")) {
                String location = datasetPath.substring("classpath:".length());
                input = getClass().getResourceAsStream(location);

                if (input == null) {
                    throw new IllegalStateException("Classpath resource not found: " + location);
                }

                return input;
            } else {
                input = java.nio.file.Files.newInputStream(
                        java.nio.file.Path.of(datasetPath));
            }

            return removeUtf8Bom(input);
        } catch (Exception e) {
            throw new IllegalStateException("Unable to open housing dataset: " + datasetPath, e);
        }
    }

    /**
     * Remove UTF-8 BOM from CSV
     * 
     * @param input
     * @return
     * @throws IOException
     */
    private InputStream removeUtf8Bom(InputStream input) throws IOException {
        PushbackInputStream pushback = new PushbackInputStream(input, 3);

        byte[] bom = new byte[3];
        int read = pushback.read(bom);

        if (read == 3 && (bom[0] & 0xFF) == 0xFF
                && (bom[1] & 0xFF) == 0xBB
                && (bom[2] & 0xFF) == 0xBF) {
            return pushback;
        }

        if (read > 0) {
            pushback.unread(bom, 0, read);
        }

        return pushback;
    }

    /**
     * 
     * CSV Row
     * 
     * @param square_footage
     * @param bedrooms
     * @param bathrooms
     * @param year_built
     * @param lot_size
     * @param distance_to_city_center
     * @param school_rating
     */
    private record Row(
            double square_footage,
            int bedrooms,
            double bathrooms,
            int year_built,
            double lot_size,
            double distance_to_city_center,
            double school_rating) {
        Property toProperty() {
            return new Property(
                    square_footage,
                    bedrooms,
                    bathrooms,
                    year_built,
                    lot_size,
                    distance_to_city_center,
                    school_rating);
        }
    }
}
