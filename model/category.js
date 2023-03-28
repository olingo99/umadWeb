const Sequelize = require('sequelize');
const sequelize = require('../database.js');

const Category = sequelize.define('category', {
idcategory: {
type: Sequelize.INTEGER,
autoIncrement: true,
allowNull: false,
primaryKey: true
},
Name: { type: Sequelize.STRING, allowNull: false },
})
module.exports = Category;