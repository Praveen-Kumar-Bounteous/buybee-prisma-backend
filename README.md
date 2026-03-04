# BuyBee - E-Commerce Backend

BuyBee is a scalable and structured **E-Commerce Backend API** built using **Node.js, Express, TypeScript, Prisma, and PostgreSQL**.

It supports Seller & Buyer roles, product management, cart functionality, checkout flow, order history, featured products, and soft delete architecture with proper relational integrity.

---

## 🚀 Features

- 🔐 JWT Authentication (Access & Refresh Tokens)
- 👥 Role-Based Authorization (SELLER / BUYER)
- 🛍 Product Management (CRUD with Seller Ownership Validation)
- ⭐ Featured Products
- 🧺 Cart Management
- 📦 Checkout & Order History
- 🗑 Soft Delete for Products (Preserves Order History)

---

## 🛠 Tech Stack

- Node.js
- Express.js
- TypeScript
- Prisma ORM
- PostgreSQL
- JWT Authentication

---

## 📂 Architecture

```
Controller → Service → Prisma → PostgreSQL
```

- **Controller Layer** → Handles HTTP request & response
- **Service Layer** → Business logic
- **Prisma ORM** → Database operations
- **PostgreSQL** → Relational database

---

# ⚙️ Setup & Installation

## 1️⃣ Clone Repository

```bash
git clone <your-repo-url>
cd buybee-backend
```

---

## 2️⃣ Install Dependencies

```bash
npm install
```

---

## 3️⃣ Setup Environment Variables

Create a `.env` file in the root directory:

```env
DATABASE_URL="postgresql://username:password@localhost:5432/buybee"
JWT_SECRET="your_secret_key"
REFRESH_SECRET="your_refresh_secret"
PORT=5000
```

---

## 4️⃣ Prisma Setup

Run Migration:

```bash
npx prisma migrate dev --name <migration_name>
```

(Replace `<migration_name>` with your migration name)

Generate Prisma Client:

```bash
npx prisma generate
```


---

## 5️⃣ Run Server

```bash
npm run dev
```

Server will run at:

```
http://localhost:5000
```

---

# 🧪 API Testing Guide

---

# 👨‍💼 SELLER FLOW

## Register Seller

**POST** `/api/v1/auth/register`

```json
{
  "name": "John the Seller",
  "email": "seller@buybee.com",
  "password": "securepassword123",
  "role": "SELLER"
}
```

---

## Login Seller

**POST** `/api/v1/auth/login`

```json
{
  "email": "seller@buybee.com",
  "password": "securepassword123"
}
```

---

## Create Product

**POST** `/api/v1/products`

```json
{
  "title": "iPhone 5s",
  "description": "Classic compact smartphone.",
  "product_img": "https://cdn.dummyjson.com/product-images/smartphones/iphone-5s/3.webp",
  "price": 18391
}
```

---

## Mark Product as Featured

**POST** `/api/v1/featured/{PRODUCT_ID}`  
Auth: Bearer Token (Seller)

Body: *(Empty)*

---

# 🛒 BUYER FLOW

## Register Buyer

**POST** `/api/v1/auth/register`

```json
{
  "name": "Alice",
  "email": "alice@gmail.com",
  "password": "12345",
  "role": "BUYER"
}
```

---

## Login Buyer

**POST** `/api/v1/auth/login`

```json
{
  "email": "alice@gmail.com",
  "password": "12345"
}
```

---

## Add Address

**POST** `/api/v1/users/address`

```json
{
  "street": "123 Maple Avenue",
  "city": "New York",
  "state": "NY",
  "country": "USA",
  "pincode": "10001"
}
```

---

## Add Product to Cart

**POST** `/api/v1/cart/add`

```json
{
  "product_id": "PRODUCT_ID",
  "quantity": 2
}
```

---

## View Cart

**GET** `/api/v1/cart`

---

## Checkout

**POST** `/api/v1/orders/checkout`

```json
{
  "payment_method": "Credit Card",
  "shipping_address": "123 Maple Avenue, New York, NY, 10001"
}
```

Cart will be cleared after successful checkout.

---

## View Order History

**GET** `/api/v1/orders/history`

Displays previous orders with product details and total price.

---

## Logout

**POST** `/api/v1/auth/logout`

Refresh token will be removed from database.

---

# 🔥 Key Backend Highlights

- Soft delete for products (`is_deleted`)
- Seller ownership validation
- Cart validation prevents adding deleted products
- Order history preserved with relational integrity
- Secure token-based authentication
- Clean service-based architecture

---

# 📌 Future Improvements

- Inventory / Stock Management
- Payment Gateway Integration
- Global Error Middleware
- Swagger API Documentation
- Unit & Integration Testing
- Admin Dashboard

---

# 👨‍💻 Author

Built as a structured learning project implementing real-world backend architecture using Prisma and relational databases.

---

⭐ If you like this project, consider giving it a star!
