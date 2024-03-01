const mysql = require('mysql2/promise');
const config = require('../config/db.config');

async function getAllProduct() {
    const item = `SELECT
                p.product_id,
                p.product_name,
                t.transaction_id,
                t.quantity,
                t.price,
                t.transaction_date
            FROM
                products p
            JOIN
                transactions t ON p.product_id = t.product_id
            WHERE
                t.transaction_type = 'purchase'
            ORDER BY
                t.transaction_date DESC;

    `;
    try {
      const connection = await mysql.createConnection(config.database);
      const [results, fields] = await connection.execute(item);
      await connection.end();
  
      console.log('Kết quả truy vấn:', results);
      return results;
    } catch (error) {
      console.error('Lỗi truy vấn SQL:', error);
      throw error;
    }
  }

  module.exports = {
    getAllProduct,

  }