const Sequelize = require('sequelize');
const sequelize = require('../database.js');

const Event = sequelize.define('event', {
idevent: {
type: Sequelize.INTEGER,
autoIncrement: true,
allowNull: false,
primaryKey: true
},
Name: { type: Sequelize.STRING, allowNull: false },
fk_iduser: { type: Sequelize.STRING, allowNull: false, references: { model: 'user', key: 'iduser' } },
Weight:{ type: Sequelize.INTEGER, allowNull:false},
Date:{ type: Sequelize.DATE, allowNull:false},
fk_idcategory:{ type: Sequelize.INTEGER, allowNull:false, references: { model: 'category', key: 'idcategory' } },
})
module.exports = Event;