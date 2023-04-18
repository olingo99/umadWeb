const Sequelize = require('sequelize');
const db = require('../database.js');

const User = db.define('user', {
    iduser: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    Name: { type: Sequelize.STRING, allowNull: false },
    passWord: { type: Sequelize.STRING, allowNull: false },
    Mood: { type: Sequelize.INTEGER, allowNull: false },
    Admin:{type : Sequelize.BOOLEAN, allowNull: false, defaultValue: false}
}, {
    timestamps: false
})


module.exports = User;
