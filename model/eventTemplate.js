const Sequelize = require('sequelize');
const sequelize = require('../database.js');

const EventTemplate = sequelize.define('eventtemplate', {
ideventTemplate: {
type: Sequelize.INTEGER,
autoIncrement: true,
allowNull: false,
primaryKey: true
},
Name: { type: Sequelize.STRING, allowNull: false },
fk_iduser: { type: Sequelize.STRING, allowNull: false, references: { model: 'user', key: 'iduser' } },
ProposedWeight:{ type: Sequelize.INTEGER, allowNull:false},
fk_idcategory:{ type: Sequelize.INTEGER, allowNull:false, references: { model: 'category', key: 'idcategory' } },
})
module.exports = Event;