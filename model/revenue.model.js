const mysql = require('mysql2/promise');
const config = require('../config/db.config');

async function getUserRevenue(connection, userId) {
    const [rows] = await connection.query(
      'SELECT personal_revenue FROM relationships WHERE user_id = ?',
      [userId]
    );
  
    return rows.length > 0 ? rows[0].personal_revenue : 0;
  }
  
  async function getTeamRevenue(connection, userId) {
    const [rows] = await connection.query(
      'SELECT m.team_revenue FROM managers m JOIN users u ON m.user_id = u.user_id WHERE u.manager_id = ?',
      [userId]
    );
  
    return rows.length > 0 ? rows[0].team_revenue : 0;
  }
  
  async function getTotalRevenue(connection, userId) {
    const [rows] = await connection.query(
      'SELECT SUM(total_price) as total_revenue FROM sales WHERE user_id = ?',
      [userId]
    );
  
    return rows.length > 0 ? rows[0].total_revenue : 0;
  }

  module.exports = {
    getTeamRevenue, getTotalRevenue, getUserRevenue
  }