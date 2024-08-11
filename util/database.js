const Sequelize = require('sequelize');

const sequelize = new Sequelize('node-complete','root','vini0520',{
    dialect : 'mysql',
    host:'localhost'
});

module.exports = sequelize;