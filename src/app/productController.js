const createProduct = require('../usecases/createProduct');
const getProducts = require('../usecases/getProducts');

const create = async (req, res) => {
  try {
    const product = await createProduct(req.body);
    res.status(201).json(product);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

const getAll = async (_req, res) => {
  try {
    const products = await getProducts();
    res.status(200).json(products);
  } catch (e) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
};

module.exports = { create, getAll };