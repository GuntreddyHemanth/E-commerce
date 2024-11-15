# eCommerce Store API

This repository contains the backend functionality for an eCommerce store where clients can add items to their cart, checkout, and apply discount codes. The discount code is issued on every nth order. The store also includes admin APIs for generating discount codes and viewing order statistics.

## Table of Contents

- [Technologies Used](#technologies-used)
- [Setup Instructions](#setup-instructions)
- [API Endpoints](#api-endpoints)
  - [Public Endpoints](#public-endpoints)
  - [Admin Endpoints](#admin-endpoints)
- [Unit Tests](#unit-tests)
- [UI (Stretch Goal)](#ui-stretch-goal)
- [Code Quality](#code-quality)
- [Contributions](#contributions)
- [License](#license)

## Technologies Used

- **Node.js**: Runtime environment
- **Express.js**: Web framework
- **MongoDB**: Database (used for cart and order management)
- **Mongoose**: ORM for MongoDB
- **Postman** or equivalent for testing the API

## Setup Instructions

1. Clone the repository:
    ```bash
    git clone https://github.com/your-username/ecommerce-store.git
    ```

2. Navigate to the project directory:
    ```bash
    cd ecommerce-store
    ```

3. Install dependencies:
    ```bash
    npm install
    ```

5. Run the server:
    ```bash
    npm start
    ```

6. The API will be available at `http://localhost:5000`.

## API Endpoints

### Public Endpoints

1. **Add Item to Cart**
   - **Endpoint**: `POST /api/v1/cart/add`
   - **Request body**:
     ```json
     {
       "name": "Product Name",
       "price": 29.99,
       "quantity": 2
     }
     ```
   - **Response**: 
     ```json
     {
       "message": "Item added to cart",
       "cart": { /* Cart details */ }
     }
     ```

2. **Checkout**
   - **Endpoint**: `POST /api/v1/cart/checkout`
   - **Request body**:
     ```json
     {
       "code": "DISCOUNT-12345"  // Optional, can be left empty
     }
     ```
   - **Response**:
     ```json
     {
       "message": "Order placed successfully",
       "finalAmount": 50.00,
       "discount": 5.00,
       "newDiscountCode": "DISCOUNT-67890"
     }
     ```

### Admin Endpoints

1. **Generate Discount Code**
   - **Endpoint**: `POST /api/v1/admin/generate-discount`
   - **Response**:
     ```json
     {
       "discountCode": "DISCOUNT-123456789"
     }
     ```

2. **View Order Statistics**
   - **Endpoint**: `GET /api/v1/admin/statistics`
   - **Response**:
     ```json
     {
       "totalOrders": 10,
       "totalAmount": 500.00,
       "discountCodes": ["DISCOUNT-123456789", "DISCOUNT-987654321"],
       "totalDiscountAmount": 50.00
     }
     ```

## Unit Tests

Unit tests are included for each major function, including adding items to the cart, checking out, and validating the discount codes. The tests can be run using `jest` or `mocha`.

To run the tests, use the following command:

```bash
npm test
