const express = require('express');
const bodyParser = require('body-parser');
const productRoutes = require('./app/productRoutes');

const app = express();
app.use(bodyParser.json());
app.use('/', productRoutes);

app.get('/', (_, res) => res.send('Product API is running 🚀'));

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
