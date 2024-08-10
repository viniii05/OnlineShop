const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/errorController')

const path = require('path')
const app = express();

const db = require('./util/database')
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(express.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname,'public')));

app.use(shopRoutes);

app.use(adminRoutes);

app.use(errorController.get404);

app.listen(3000);