const express = require("express");
const bodyParser = require('body-parser');
const configViewEngine = require('./config/view.egine');
const app = express();
configViewEngine(app);
 
//const demo = require('./controller/users');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.render('index', { title: 'Trang Quản Lý' });
});


const route = require('./routes/index.routes');

// Use the routes
app.use('/', route);
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});



