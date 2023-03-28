const Sequelize = require('sequelize');
const sequelize = require('../database.js');

const User = sequelize.define('user', {
iduser: {
type: Sequelize.INTEGER,
autoIncrement: true,
allowNull: false,
primaryKey: true
},
Name: { type: Sequelize.STRING, allowNull: false },
passWord: { type: Sequelize.STRING, allowNull: false },
Mood:{ type: Sequelize.INTEGER, allowNull:false}
})
module.exports = User;