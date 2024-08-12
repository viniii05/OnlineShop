const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/errorController')
const sequelize = require('./util/database')
const Product = require('./models/product');
const User = require('./models/user')
const Cart = require('./models/cart');
const CartItem = require('./models/cart-items');

const path = require('path')
const app = express();


const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(express.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname,'public')));

app.use((req, res, next) => {
    User.findByPk(1)
      .then(user => {
        req.user = user;
        next();
      })
      .catch(err => console.log(err));
  });

app.use(shopRoutes);
app.use(adminRoutes);

app.use(errorController.get404);

Product.belongsTo(User, { constraints: true, onDelete: 'CASCADE' });
User.hasMany(Product);
User.hasOne(Cart);
Cart.belongsTo(User);
Cart.belongsToMany(Product, { through: CartItem });
Product.belongsToMany(Cart, { through: CartItem });

sequelize.sync()
  .then(result => {
    console.log("Database synced");
    return User.findByPk(1); // Use findByPk instead of findById
  })
  .then(user => {
    if (!user) {
      console.log("No user found, creating a new user");
      return User.create({ name: 'Max', email: 'test@test.com' });
    }
    console.log("User found:", user);
    return user;
  })
  .then(user => {
    return user.createCart();
  })
  .then(cart => {
    console.log("Cart created, starting the server");
    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  })
  .catch(err => {
    console.error("Error starting the server:", err);
  });


