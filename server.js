const express = require("express");
const configViewEngine = require('./config/view.egine');
const app = express();
configViewEngine(app);
 
//const demo = require('./controller/users');
app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
  res.render('index', { title: 'Trang Quản Lý' });
});


const yourRoutes = require('./routes/index.routes');

// Use the routes
app.use('/', yourRoutes);
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});



