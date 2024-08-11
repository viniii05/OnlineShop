const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/errorController')

const path = require('path')
const app = express();

const sequelize = require('./util/database')
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(express.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname,'public')));

app.use(shopRoutes);

app.use(adminRoutes);

app.use(errorController.get404);

sequelize.sync()
    .then(result => {
        // console.log(result);
        app.listen(3000);
    })
    .catch(err => {
        console.log(err);
    })

