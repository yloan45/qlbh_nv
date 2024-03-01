const express = require('express');
const router = express.Router();
const yourController = require('../controller/user.controller');

router.get('/users', yourController.getUserRoute);


module.exports = router;
