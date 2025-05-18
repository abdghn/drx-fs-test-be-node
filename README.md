
# 🧮 DRX Fullstack Test - Backend - NodeJS
---

## 📁 Struktur Direktori

```
.
├── src/
│   ├── app/
│   │   └── productController.js    
│   │   └── productRoutes.js    
│   ├── data/
│   │   └── products.sqlite       
│   ├── domain/
│   │   └── product.js       
│   ├── infra/
│   │   └── db.js        
│   ├── usecases/
│   │   └── createProduct.js  
│   │   └── getProducts.js   
│   ├── utils/
│   │   └── evaluateDiscounts.js             
│   └── server.js                     
├── tests/
│   └── product.test.js         
│   └── evaluateDiscounts.test.js             
├── package.json                     
├── package-lock.json                
└── .gitignore                       
```

---

## 🛠️ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/abdghn/drx-fs-test-be-node.git
cd drx-fs-test-be-node
```

### 2. Instalasi Dependensi

```bash
npm install
```

### 3. Menjalankan Aplikasi

```bash
npm start
```

Server akan berjalan di `http://localhost:3000`.

---

## ✅ Menjalankan Pengujian

```bash
npm test
```

Secara default, server akan berjalan di:  
👉 `http://localhost:8080`

---

## 📬 Contoh Endpoint API

### GET /products

#### Contoh Response:

```json
[
  {
    "id": 1,
    "name": "Macbook Air M3",
    "description": "Laptop ringan dan cepat",
    "originalPrice": 250,
    "finalPrice": 190
  }
]
```

### POST /products

#### Contoh Request

```json
{
  "name": "Macbook Air M3",
  "description": "Laptop ringan dan cepat",
  "originalPrice": 250,
  "discounts": [
    { "type": "fixed", "value": 20 },
    { "type": "percentage", "value": 10 },
    { "type": "conditional", "condition": 200, "value": 15 },
    {
      "type": "tiered",
      "tiers": [
        { "min": 0, "max": 99, "value": 5 },
        { "min": 100, "max": 199, "value": 10 },
        { "min": 200, "max": 9999, "value": 25 }
      ]
    },
    { "type": "cap", "maxDiscount": 60 }
  ]
}
```

#### Contoh Response:

```json
{
  "appliedDiscounts": [
    {
      "amount": 20,
      "type": "fixed"
    },
    {
      "amount": 23,
      "type": "percentage"
    },
    {
      "amount": 15,
      "type": "conditional"
    },
    {
      "amount": 25,
      "type": "tiered"
    },
    {
      "cappedAt": 60,
      "originalDiscountTotal": 83,
      "type": "cap"
    }
  ],
  "product": {
    "id": 1,
    "name": "Macbook Air M3",
    "description": "Laptop ringan dan cepat",
    "originalPrice": 250,
    "finalPrice": 190
  }
}
```

---

## 📄 License

MIT License
