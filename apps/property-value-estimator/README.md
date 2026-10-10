# Property Value Estimator

## Initialize Python Environment

```bash
uv venv

.venv\Scripts\activate

uv sync
```

## API Endpoints

### Prediction Endpoint

#### For Single Property

- CLI Command:

```bash
curl -X POST http://localhost:8010/estimates -H "Content-Type: application/json" -d '{"square_footage":2300,"bedrooms":4,"bathrooms":3,"year_built":2013,"lot_size":10300,"distance_to_city_center":8,"school_rating":9.2}'
```

- Output JSON:

```json
{
  "property": {
    "square_footage": 2300.0,
    "bedrooms": 4,
    "bathrooms": 3.0,
    "year_built": 2013,
    "lot_size": 10300.0,
    "distance_to_city_center": 8.0,
    "school_rating": 9.2
  },
  "predicted_price": 408467.4308452967
}
```
