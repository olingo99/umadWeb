const Sequelize = require('sequelize');
const db = require('../database.js');

/*
Sequelize model for the user table in the database.
*/


const User = db.define('user', {
    iduser: {                                  //primary key, id of the user
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    Name: { type: Sequelize.STRING, allowNull: false },  //name of the user
    passWord: { type: Sequelize.STRING, allowNull: false }, //password of the user
    Mood: { type: Sequelize.INTEGER, allowNull: false },    //mood of the user
    Admin:{type : Sequelize.BOOLEAN, allowNull: false, defaultValue: false} //admin status of the user
}, {
    timestamps: false
})


module.exports = User;
