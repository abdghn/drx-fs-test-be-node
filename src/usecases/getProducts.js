const db = require('../infra/db');

async function getProducts() {
  return new Promise((resolve, reject) => {
    db.all(`SELECT * FROM products`, [], (err, rows) => {
      if (err) return reject(err);
      resolve(rows);
    });
  });
}

module.exports = getProducts;