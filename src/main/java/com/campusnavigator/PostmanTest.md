### 1. **Create a Building (POST)**

```json
POST /api/buildings
Content-Type: application/json

{
    "name": "Engineering Building",
    "description": "Building for engineering departments.",
    "locationLatitude": 37.774929,
    "locationLongitude": -122.419416,
    "pointsOfInterest": [
        {
            "name": "Lecture Hall",
            "description": "Main lecture hall for engineering courses.",
            "type": "Classroom"
        },
        {
            "name": "Computer Lab",
            "description": "Lab for computer science students.",
            "type": "Lab"
        }
    ]
}
```

### 2. **Get All Buildings (GET)**

```json
GET /api/buildings
```

### 3. **Get a Building by ID (GET)**

```json
GET /api/buildings/{id}
```

### 4. **Update a Building (PUT)**

```json
PUT /api/buildings/{id}
Content-Type: application/json

{
    "name": "Updated Engineering Building",
    "description": "Recently renovated engineering building with new facilities.",
    "locationLatitude": 37.774929,
    "locationLongitude": -122.419416,
    "pointsOfInterest": [
        {
            "name": "Lecture Hall",
            "description": "Updated lecture hall for engineering courses.",
            "type": "Classroom"
        },
        {
            "name": "Robotics Lab",
            "description": "Newly added robotics lab.",
            "type": "Lab"
        }
    ]
}
```

### 5. **Delete a Building (DELETE)**

```json
DELETE /api/buildings/{id}
```

---

## **MapData CRUD Operations**

### 6. **Create MapData for a Building (POST)**

```json
POST /api/maps
Content-Type: application/json

{
    "buildingId": 9,
    "mapImageURL": "https://maps.example.com/new-building-map"
}
```

### 7. **Get All MapData (GET)**

```json
GET /api/maps
```

### 8. **Get MapData by ID (GET)**

```json
GET /api/maps/{id}
```

### 9. **Update MapData for a Building (PUT)**

```json
PUT /api/maps/{id}
Content-Type: application/json

{
    "buildingId": 9,
    "mapImageURL": "https://maps.example.com/updated-building-map"
}
```

### 10. **Delete MapData (DELETE)**

```json
DELETE /api/maps/{id}
```

---

## **PointOfInterest CRUD Operations**

### 11. **Create a Point of Interest (POST)**

```json
POST /api/pois
Content-Type: application/json

{
    "buildingId": 9,
    "name": "New Lecture Hall",
    "description": "Main lecture hall for the engineering building.",
    "type": "Classroom"
}
```

### 12. **Get All Points of Interest (GET)**

```json
GET /api/pois
```

### 13. **Get a Point of Interest by ID (GET)**

```json
GET /api/pois/{id}
```

### 14. **Update a Point of Interest (PUT)**

```json
PUT /api/pois/{id}
Content-Type: application/json

{
    "buildingId": 9,
    "name": "Updated Lecture Hall",
    "description": "Updated description of the lecture hall.",
    "type": "Classroom"
}
```

### 15. **Delete a Point of Interest (DELETE)**

```json
DELETE /api/pois/{id}
```

---