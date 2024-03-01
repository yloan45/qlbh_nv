const user = require('../model/user.model');

async function getUserRoute(req, res) {
  try {
    const results = await user.getUsers();
    res.json({ users: results });
  } catch (error) {
    console.error('Lỗi khi truy vấn người dùng:', error);
    res.status(500).json({ error: 'Lỗi khi truy vấn người dùng.' });
  }
}

module.exports = {
  getUserRoute,
};
