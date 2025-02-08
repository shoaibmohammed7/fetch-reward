# Receipt Processor

A Node.js/TypeScript service that processes receipts and calculates points based on specific rules. This service provides two main endpoints for processing receipts and retrieving points for processed receipts.

## 🚀 Technologies Used

* Node.js
* TypeScript
* Express.js
* Docker
* UUID for generating unique identifiers

## 📋 Prerequisites

To run this application, you'll need either:

* Docker and Docker Compose installed on your system
  
OR
* Node.js (v20 or later) and npm installed on your system

## 🏃‍♂️ Installation and Running the Application

### Using Docker (Recommended)

1. Clone the repository:
    ```bash
    git clone <repository-url>
    ```

2. Build and start the container using Docker Compose:
    ```bash
    docker-compose up --build
    ```

The service will be available at `http://localhost:3000`

### Using Node.js Directly

1. Clone the repository:
    ```bash
    git clone <repository-url>
    
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Build and start the application:
    ```bash
    npm run start
    ```



## 📚 API Documentation

### Process Receipt

Processes a receipt and returns an ID for point retrieval.

* **Endpoint**: POST `/receipts/process`
* **Content-Type**: application/json

#### Request Body Example:
```json
{
  "retailer": "Target",
  "purchaseDate": "2022-01-01",
  "purchaseTime": "13:01",
  "items": [
    {
      "shortDescription": "Mountain Dew 12PK",
      "price": "6.49"
    }
  ],
  "total": "6.49"
}
```

#### Success Response:
```json
{
  "id": "7fb1377b-b223-49d9-a31a-5a02701dd310"
}
```

### Get Points

Retrieves the points awarded for a processed receipt.

* **Endpoint**: GET `/receipts/{id}/points`
* **Parameters**: id (string) - The ID returned from receipt processing

#### Success Response:
```json
{
  "points": 32
}
```


## 🎯 Points Calculation Rules

Points are awarded based on the following rules:

1. One point for every alphanumeric character in the retailer name
2. 50 points if the total is a round dollar amount with no cents
3. 25 points if the total is a multiple of 0.25
4. 5 points for every two items on the receipt
5. If the trimmed length of the item description is a multiple of 3, multiply the price by 0.2 and round up to the nearest integer
6. 6 points if the day in the purchase date is odd
7. 10 points if the time of purchase is after 2:00pm and before 4:00pm



## 💾 Data Persistence

The application stores receipt data in memory. Data will not persist when the application restarts.

