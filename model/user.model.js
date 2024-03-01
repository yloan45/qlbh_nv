const mysql = require('mysql2/promise');
const config = require('../config/db.config');

async function getUsers() {
  const query = 'SELECT * FROM users';

  try {
    const connection = await mysql.createConnection(config.database);
    const [results, fields] = await connection.execute(query);
    await connection.end();

    console.log('Kết quả truy vấn:', results);
    return results;
  } catch (error) {
    console.error('Lỗi truy vấn SQL:', error);
    throw error;
  }
}

module.exports = {
  getUsers,
};
