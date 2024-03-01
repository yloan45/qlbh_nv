const express = require('express');
const router = express.Router();
const user = require('../controller/user.controller');
const { getAllProductRoute } = require('../controller/product.controller');
const { getUserRevenue, getTeamRevenue, getTotalRevenue } = require('../model/revenue.model');



// USERS
router.get('/users', user.getUserRoute);
router.get('/list-introducer', user.getIntroducerRoute);
router.get('/list-manager', user.getManagerRoute);
router.get('/detail-user/:id', user.getDetailUserRoute);
router.get('/detail-manager/:id', user.getUserManagerRoute);
//router.get('/create-user', user.getManagerRoute, user.getIntroducerRoute);
router.post('/create-user', user.createUserRoute);



// PRODUCTS
router.get('/list-product', getAllProductRoute);


router.get('/user/:userId', async (req, res) => {
    const userId = req.params.userId;
    try {
      const individualRevenue = await getUserRevenue(req.db, userId);
      const teamRevenue = await getTeamRevenue(req.db, userId);
      const totalRevenue = await getTotalRevenue(req.db, userId);
      res.render('user-revenue', {
        userId,
        individualRevenue,
        teamRevenue,
        totalRevenue,
      });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).send('Internal Server Error');
    } finally {
      if (req.db) {
        req.db.end();
      }
    }
  });
module.exports = router;
