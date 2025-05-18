import { describe, it, beforeEach, expect } from 'vitest';
import request from 'supertest';
import express from 'express';
import productRoutes from '../src/app/productRoutes.js';
import db from '../src/infra/db.js';

const app = express();
app.use(express.json());
app.use('/api', productRoutes);


beforeEach(async () => {
  await new Promise((resolve, reject) => {
    db.serialize(() => {
      db.run(`DELETE FROM products`, [], (err) => {
        if (err) return reject(err);
        db.run(`DELETE FROM sqlite_sequence WHERE name='products'`, [], (err2) => {
          if (err2) return reject(err2);
          resolve();
        });
      });
    });
  });
});


describe('Product API', () => {
  it('should create a new product', async () => {
    const payload = {
      name: "Macbook Air M3",
      description: "Laptop ringan dan cepat",
      originalPrice: 250,
      discounts: [
        { type: "fixed", value: 20 },
        { type: "percentage", value: 10 },
        { type: "conditional", condition: 200, value: 15 },
        {
          type: "tiered",
          tiers: [
            { min: 0, max: 99, value: 5 },
            { min: 100, max: 199, value: 10 },
            { min: 200, max: 9999, value: 25 }
          ]
        },
        { type: "cap", maxDiscount: 60 }
      ]
    }
    const res = await request(app)
      .post('/api/products')
      .send(payload);

    expect(res.statusCode).toBe(201);
    expect(res.body.product.name).toBe(payload.name);
    expect(res.body.product.finalPrice).toBeLessThan(payload.originalPrice);
    expect(res.body.applied.length).toBe(5);
  });

  it('should get all products', async () => {
    await request(app).post('/api/products').send({
      name: "Macbook Air M3",
      description: "Laptop ringan dan cepat",
      originalPrice: 250,
      discounts: [
        { type: "fixed", value: 20 },
        { type: "percentage", value: 10 },
        { type: "conditional", condition: 200, value: 15 },
        {
          type: "tiered",
          tiers: [
            { min: 0, max: 99, value: 5 },
            { min: 100, max: 199, value: 10 },
            { min: 200, max: 9999, value: 25 }
          ]
        },
        { type: "cap", maxDiscount: 60 }
      ]
    });

    const res = await request(app).get('/api/products');

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBe(1);
    expect(res.body[0].name).toBe('Macbook Air M3');
  });

  it('should reject product with invalid price', async () => {
    const res = await request(app)
      .post('/api/products')
      .send({
        name: 'Invalid',
        description: 'Negative price',
        originalPrice: -50,
      });

    expect(res.statusCode).toBe(400);
    expect(res.body.error).toMatch('Invalid product data');
  });
});
