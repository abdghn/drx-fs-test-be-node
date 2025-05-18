class Product {
  constructor({ name, description, originalPrice, finalPrice }) {
    if (!name || !description || originalPrice <= 0) {
      throw new Error('Invalid product data');
    }
    this.name = name;
    this.description = description;
    this.originalPrice = originalPrice;
    this.finalPrice = finalPrice;
  }
}
module.exports = Product;