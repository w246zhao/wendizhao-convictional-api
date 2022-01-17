const { inventory, product, error } = require('./schemes.js');
// for api
const express = require('express');
const app = express();
const port = 3000;

// for fetching data
const axios = require('axios');
let data = [];


axios.get('https://my-json-server.typicode.com/convictional/engineering-interview-api/products')
  .then(res => {
    data = res.data;
  })
  .catch(err => {
    console.log('Error fetching data: ', err.message);
  })
  .then(function() {
    app.listen(port, () => {
      console.log(`Listening at http://localhost:${port}`);
    })
  });

// In contract.yaml, /products 404 is documented to find product by ID and return
// 404 when product is not found. Assume typo in document and return empty array
app.get('/products', (req, res) => {
  let products = [];
  data.forEach(product_data => {
    products.push(product(product_data));
  });
  return res.status(200).json(products);
})

app.get('/products/:id', (req, res) => {
  const ID = Number(req.params.id);
  if (!Number.isInteger(ID)) {
    return res.status(400).json(error('Invalid ID supplied'));
  }
  for (let i = 0; i < data.length; i++) {
    if (Number(data[i].id) === ID) {
      return res.status(200).json(product(data[i]));
    }
  }
  // product not found
  return res.status(404).json(error('Product not found'));
})

app.get('/store/inventory', (req, res) => {
  let inventory_data = [];
  data.forEach(product_data => {
    product_data.variants.forEach(variant_data => {
      inventory_data.push(inventory(variant_data));
    });
  });
  return res.status(200).json(inventory_data);
})