const Product = require('../domain/product');
const db = require('../infra/db');
const { evaluateDiscounts } = require('../utils/evaluateDiscounts');

async function createProduct(data) {
  const product = new Product(data);
  const {finalPrice, applied} = evaluateDiscounts(data?.originalPrice, data?.discounts)
  product.finalPrice = finalPrice;
  return new Promise((resolve, reject) => {
    db.run(
      `INSERT INTO products (name, description, originalPrice, finalPrice) VALUES (?, ?, ?, ?)`,
      [product.name, product.description, product.originalPrice, product.finalPrice],
      function (err) {
        if (err) return reject(err);
        resolve({ product, applied});
      }
    );
  });
}


module.exports = createProduct;