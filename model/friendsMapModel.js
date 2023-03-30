const Sequelize = require('sequelize');
const db = require('../database.js');

const FriendsMap = db.define('friendsmap', {
    idfriendsmap: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    // iduser: { type: Sequelize.STRING, allowNull: false, references: { model: 'user', key: 'iduser' } },
    iduser: { type: Sequelize.INTEGER, allowNull: false },
    date: { type: Sequelize.DATE, allowNull: false },
    // idfriend: { type: Sequelize.INTEGER, allowNull: false, references: { model: 'user', key: 'iduser' } },
    idfriend: { type: Sequelize.INTEGER, allowNull: false },
}, {
    timestamps: false
})

// FriendsMap.hasOne(User);

module.exports = FriendsMap;