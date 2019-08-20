const express = require('express');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const router  = require('./Routes/Router')
const app = express();

// Middleware
app.use(bodyParser.json());
app.use(methodOverride('_method'));
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With')
  
  next()
})
app.use('/',router)


const port = 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));