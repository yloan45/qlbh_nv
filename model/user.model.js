const mysql = require('mysql2/promise');
const config = require('../config/db.config');

// list all users
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

// list introducer

async function getIntroducer() {
  const query = `
                SELECT *
                FROM users
                WHERE introducer_id IS NOT NULL;
              `;

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

// list manager

async function getManager() {
  const query = `
                  SELECT *
                  FROM users
                  WHERE is_manager = TRUE;
                `;

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


async function getDetailUser(id) {
  const query = `
                    SELECT u.user_id, u.user_name, u.user_email, u.user_phone, u.hire_date,
                    u.introducer_id, i.user_name AS introducer_name,
                    u.manager_id, m.user_name AS manager_name
                    FROM users u
                    LEFT JOIN users i ON u.introducer_id = i.user_id
                    LEFT JOIN users m ON u.manager_id = m.user_id
                    WHERE u.user_id = ?;
                 `;
  try {
    const connection = await mysql.createConnection(config.database);
    const [results, fields] = await connection.execute(query, [id]);
    await connection.end();

    console.log('Kết quả truy vấn:', results);
    return results;
  } catch (error) {
    console.error('Lỗi truy vấn SQL:', error);
    throw error;
  }
}

async function getDetailUser(id) {
  const query = `
                    SELECT u.user_id, u.user_name, u.user_email, u.user_phone, u.hire_date,
                    u.introducer_id, i.user_name AS introducer_name,
                    u.manager_id, m.user_name AS manager_name
                    FROM users u
                    LEFT JOIN users i ON u.introducer_id = i.user_id
                    LEFT JOIN users m ON u.manager_id = m.user_id
                    WHERE u.user_id = ?;
                 `;
  try {
    const connection = await mysql.createConnection(config.database);
    const [results, fields] = await connection.execute(query, [id]);
    await connection.end();

    console.log('Kết quả truy vấn:', results);
    return results;
  } catch (error) {
    console.error('Lỗi truy vấn SQL:', error);
    throw error;
  }
}

async function getUserManager(id) {
  const query = `
                  SELECT u1.user_id AS subordinate_id, u1.user_name AS subordinate_name, u2.user_name AS manager_name
                  FROM users u1
                  JOIN users u2 ON u1.manager_id = u2.user_id
                  WHERE u1.manager_id = ?;
                `;
  try {
    const connection = await mysql.createConnection(config.database);
    const [results, fields] = await connection.execute(query, [id]);
    await connection.end();

    console.log('Kết quả truy vấn:', results);
    return results;
  } catch (error) {
    console.error('Lỗi truy vấn SQL:', error);
    throw error;
  }
}


// creatr user
async function createUser(user) {
  if (!user || typeof user !== 'object') {
    throw new Error('Invalid user object');
  }
  const connection = await mysql.createConnection(config.database);
  try {
    await connection.beginTransaction();

    const insertUserQuery = `
      INSERT INTO users (
        user_name,
        user_email,
        user_phone,
        hire_date,
        introducer_id,
        manager_id,
        is_manager
      ) VALUES (?, ?, ?, ?, ?, ?, ?);
    `;

    const values = [
      user.user_name,
      user.user_email,
      user.user_phone,
      user.hire_date,
      user.introducer_id,
      user.manager_id,
      user.is_manager || false,
    ];

    const [results, fields] = await connection.execute(insertUserQuery, values);
    const userId = results.insertId;
    await connection.commit();
    console.log(`User with ID ${userId} created successfully!`);

  } catch (error) {
    await connection.rollback();
    console.error('Error creating user:', error);
    throw error;
  } finally {
    await connection.end();
  }
}

module.exports = {
  getUsers, createUser, getIntroducer, getManager, getDetailUser,
  getUserManager
};
