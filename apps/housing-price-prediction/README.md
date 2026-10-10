# Housing Price Prediction

## Initialize Python Environment

```bash
uv venv

.venv\Scripts\activate

uv sync
```

## API Endpoints

### Health Check Endpoint

- CLI Command:

```bash
curl http://localhost:8000/health
```

- Output JSON:

```json
{
  "status": "ok",
  "service": "housing-price-service"
}
```

### Model Info Endpoint

- CLI Command:

```bash
curl http://localhost:8000/model/metrics
```

- Output JSON:

```json
{
  "model": {
    "type": "Ridge",
    "alpha": 0.1,
    "features": [
      "square_footage",
      "bedrooms",
      "bathrooms",
      "property_age",
      "lot_size",
      "distance_to_city_center",
      "school_rating"
    ],
    "intercept": -48365.53321069607,
    "coefficients": {
      "square_footage": -81.02546308233569,
      "bedrooms": -918.8148387544409,
      "bathrooms": 9384.327788002447,
      "property_age": -530.9372988776561,
      "lot_size": 28.691331656162237,
      "distance_to_city_center": 16685.898244103282,
      "school_rating": 21370.44434896604
    }
  },
  "performance": {
    "test": {
      "mae": 7000.712592340246,
      "rmse": 8056.58526901707,
      "r2": 0.9883993447661958
    },
    "cross_validation": {
      "folds": 5,
      "mae_mean": 9026.610157092213,
      "mae_std": 3213.790617793189,
      "rmse_mean": 12587.687120978719,
      "rmse_std": 6195.889441672849,
      "r2_mean": 0.9560812296443704,
      "r2_std": 0.05520155994281308
    }
  }
}
```

### Prediction Endpoint

#### For Single Property

- CLI Command:

```bash
curl -X POST http://localhost:8000/model/predict -H "Content-Type: application/json" -d '{"square_footage":1550,"bedrooms":3,"bathrooms":2,"year_built":1997,"lot_size":6800,"distance_to_city_center":4.1,"school_rating":7.6}'
```

- Output JSON:

```json
{
  "square_footage": 1550,
  "bedrooms": 3,
  "bathrooms": 2,
  "year_built": 1997,
  "lot_size": 6800,
  "distance_to_city_center": 4.1,
  "school_rating": 7.6,
  "price": 252588.64351884168
}
```

#### For Multiple Properties

- CLI Command:

```bash
curl -X POST http://localhost:8000/model/predict -H "Content-Type: application/json" -d '[{"square_footage":1550,"bedrooms":3,"bathrooms":2,"year_built":1997,"lot_size":6800,"distance_to_city_center":4.1,"school_rating":7.6},{"square_footage":2200,"bedrooms":4,"bathrooms":2.5,"year_built":2008,"lot_size":9600,"distance_to_city_center":7,"school_rating":8.8},{"square_footage":1350,"bedrooms":3,"bathrooms":1,"year_built":1988,"lot_size":5700,"distance_to_city_center":3.1,"school_rating":7}]'
```

- Output JSON:

```json
[
  {
    "square_footage": 1550,
    "bedrooms": 3,
    "bathrooms": 2,
    "year_built": 1997,
    "lot_size": 6800,
    "distance_to_city_center": 4.1,
    "school_rating": 7.6,
    "price": 252588.64351884168
  },
  {
    "square_footage": 2200,
    "bedrooms": 4,
    "bathrooms": 2.5,
    "year_built": 2008,
    "lot_size": 9600,
    "distance_to_city_center": 7,
    "school_rating": 8.8,
    "price": 363905.1186221375
  },
  {
    "square_footage": 1350,
    "bedrooms": 3,
    "bathrooms": 1,
    "year_built": 1988,
    "lot_size": 5700,
    "distance_to_city_center": 3.1,
    "school_rating": 7,
    "price": 193562.3429821461
  }
]
```

### Swagger

```
http://localhost:8000/docs
```
