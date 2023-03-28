const Sequelize = require('sequelize');
const sequelize = require('../database.js');

const FriendsMap = sequelize.define('friendsmap', {
idfriendsmap: {
type: Sequelize.INTEGER,
autoIncrement: true,
allowNull: false,
primaryKey: true
},
fk_iduser: { type: Sequelize.STRING, allowNull: false, references: { model: 'user', key: 'iduser' } },
Date:{ type: Sequelize.DATE, allowNull:false},
fk_idfriend:{ type: Sequelize.INTEGER, allowNull:false, references: { model: 'user', key: 'iduser' } },
})
module.exports = FriendsMap;