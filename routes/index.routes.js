const express = require('express');
const router = express.Router();
const user = require('../controller/user.controller');


// list users
router.get('/users', user.getUserRoute);
router.get('/list-introducer', user.getIntroducerRoute);
router.get('/list-manager', user.getManagerRoute);
router.get('/detail-user/:id', user.getDetailUserRoute);
router.get('/detail-manager/:id', user.getUserManagerRoute);

// create user
router.post('/create-user', user.createUserRoute);



module.exports = router;
