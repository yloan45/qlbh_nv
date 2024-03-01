const user = require('../model/user.model');

// list all users
async function getUserRoute(req, res) {
  try {
    const results = await user.getUsers();
    res.json({ users: results });
  } catch (error) {
    console.error('Lỗi khi truy vấn người dùng:', error);
    res.status(500).json({ error: 'Lỗi khi truy vấn người dùng.' });
  }
}

// list all introducer
async function getIntroducerRoute(req, res) {
  try {
    const results = await user.getIntroducer();
    res.json({ users: results });
  } catch (error) {
    console.error('Lỗi khi truy vấn người dùng:', error);
    res.status(500).json({ error: 'Lỗi khi truy vấn người dùng.' });
  }
}

// list all manager
async function getManagerRoute(req, res) {
  try {
    const results = await user.getManager();
    res.json({ users: results });
  } catch (error) {
    console.error('Lỗi khi truy vấn người dùng:', error);
    res.status(500).json({ error: 'Lỗi khi truy vấn người dùng.' });
  }
}


async function getDetailUserRoute(req, res) {
  try {
    const id = req.params.id;
    const results = await user.getDetailUser(id);
    res.json({ users: results });
  } catch (error) {
    console.error('Lỗi khi truy vấn người dùng:', error);
    res.status(500).json({ error: 'Lỗi khi truy vấn người dùng.' });
  }
}

async function getUserManagerRoute(req, res) {
  try {
    const id = req.params.id;
    const results = await user.getUserManager(id);
    res.json({ users: results });
  } catch (error) {
    console.error('Lỗi khi truy vấn người dùng:', error);
    res.status(500).json({ error: 'Lỗi khi truy vấn người dùng.' });
  }
}


async function createUserRoute(req, res) {
  try {
    const userData = req.body;
    await user.createUser(userData);
    res.status(200).json({ message: 'User created successfully' });
  } catch (error) {
    console.error('Lỗi khi thêm mới người dùng', error);
    res.status(500).json({ error: 'Lỗi khi thêm mới người dùng.' });
  }
}

module.exports = {
  getUserRoute, getIntroducerRoute, getManagerRoute, getDetailUserRoute,
  createUserRoute, getUserManagerRoute
};
