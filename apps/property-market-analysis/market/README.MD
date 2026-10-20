# Property Market Analysis

## API Endpoints

### Get Market Filter Ranges Endpoint

- CLI Command:

```bash
curl "http://localhost:8020/api/market/filter-ranges"
```

- Output JSON:

```json
{
  "minPrice": 150102.68355216488,
  "maxPrice": 408467.4308452967,
  "minSquareFootage": 1020.0,
  "maxSquareFootage": 2300.0,
  "minBedrooms": 2,
  "maxBedrooms": 4,
  "minYearBuilt": 1979,
  "maxYearBuilt": 2013,
  "minSchoolRating": 6.5,
  "maxSchoolRating": 9.2
}
```

### Get Property Market Statistics Endpoint

- CLI Command:

```bash
curl "http://localhost:8020/api/market/statistics?minBedrooms=3&maxBedrooms=4"
```

- Output JSON:

```json
{
  "count": 8,
  "averagePrice": 293512.04480303917,
  "minPrice": 193562.3429821461,
  "maxPrice": 408467.4308452967,
  "medianPrice": 281727.2459146105,
  "averageSquareFootage": 1806.25,
  "averagePricePerSquareFootage": 160.83825584417133
}
```

### Get Properties Endpoint

- CLI Command:

```bash
curl "http://localhost:8020/api/market/properties?page=0&size=10&minBedrooms=3&sort=squareFootage"
```

- Output JSON:

```json
{
  "properties": [
    {
      "squareFootage": 1350.0,
      "bedrooms": 3,
      "bathrooms": 1.0,
      "yearBuilt": 1988,
      "lotSize": 5700.0,
      "distanceToCityCenter": 3.1,
      "schoolRating": 7.0,
      "price": 193562.3429821461
    },
    {
      "squareFootage": 1430.0,
      "bedrooms": 3,
      "bathrooms": 1.5,
      "yearBuilt": 1990,
      "lotSize": 6200.0,
      "distanceToCityCenter": 3.3,
      "schoolRating": 7.2,
      "price": 214791.27877401077
    },
    {
      "squareFootage": 1550.0,
      "bedrooms": 3,
      "bathrooms": 2.0,
      "yearBuilt": 1997,
      "lotSize": 6800.0,
      "distanceToCityCenter": 4.1,
      "schoolRating": 7.6,
      "price": 252588.64351884168
    },
    {
      "squareFootage": 1650.0,
      "bedrooms": 3,
      "bathrooms": 2.0,
      "yearBuilt": 1999,
      "lotSize": 7100.0,
      "distanceToCityCenter": 4.2,
      "schoolRating": 7.8,
      "price": 260098.04999941564
    },
    {
      "squareFootage": 1870.0,
      "bedrooms": 3,
      "bathrooms": 2.5,
      "yearBuilt": 2001,
      "lotSize": 7900.0,
      "distanceToCityCenter": 5.5,
      "schoolRating": 8.3,
      "price": 303356.4418298054
    },
    {
      "squareFootage": 2100.0,
      "bedrooms": 4,
      "bathrooms": 2.5,
      "yearBuilt": 2005,
      "lotSize": 9200.0,
      "distanceToCityCenter": 6.8,
      "schoolRating": 8.6,
      "price": 351327.0518526593
    },
    {
      "squareFootage": 2200.0,
      "bedrooms": 4,
      "bathrooms": 2.5,
      "yearBuilt": 2008,
      "lotSize": 9600.0,
      "distanceToCityCenter": 7.0,
      "schoolRating": 8.8,
      "price": 363905.1186221375
    },
    {
      "squareFootage": 2300.0,
      "bedrooms": 4,
      "bathrooms": 3.0,
      "yearBuilt": 2013,
      "lotSize": 10300.0,
      "distanceToCityCenter": 8.0,
      "schoolRating": 9.2,
      "price": 408467.4308452967
    }
  ],
  "page": 0,
  "size": 10,
  "totalElements": 8,
  "totalPages": 1
}
```

### Get Market What-If Analysis Endpoint (`a single-property value prediction`)

- CLI Command:

```bash
curl -X POST http://localhost:8020/api/market/what-if -H "Content-Type: application/json" -d '{"squareFootage":1550,"bedrooms":3,"bathrooms":2,"yearBuilt":1997,"lotSize":6800,"distanceToCityCenter":4.1,"schoolRating":7.6}'
```

- Output JSON:

```json
{
  "property": {
    "squareFootage": 1550.0,
    "bedrooms": 3,
    "bathrooms": 2.0,
    "yearBuilt": 1997,
    "lotSize": 6800.0,
    "distanceToCityCenter": 4.1,
    "schoolRating": 7.6
  },
  "predictedPrice": 252588.64351884168
}
```
