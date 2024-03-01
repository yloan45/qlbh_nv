const items = require('../model/product.model');

async function getAllProductRoute(req, res) {
    try {
      const results = await items.getAllProduct();
      console.log(`san pham: `,results);
      res.render('index', { items: results }); // Use 'items' instead of 'item'
    } catch (error) {
      console.error('Lỗi khi truy vấn người dùng:', error);
      res.status(500).json({ error: 'Lỗi khi truy vấn người dùng.' });
    }
  }
  
  module.exports = {
    getAllProductRoute,

  }