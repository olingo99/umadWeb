const Sequelize = require('sequelize');
const db = require('../database.js');

/*
Sequelize model for the friendsmap table in the database.
*/



const FriendsMap = db.define('friendsmap', {
    idfriendsmap: {                                     //primary key, id of the friendsmap
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    iduser: { type: Sequelize.INTEGER, allowNull: false },  //foreign key, id of the user to whom the friendsmap belongs
    date: { type: Sequelize.DATE, allowNull: false },       //date of the friendsmap
    idfriend: { type: Sequelize.INTEGER, allowNull: false },    //foreign key, id of the friend
    status: { type: Sequelize.STRING, allowNull: false }    //status of the friendsmap can either be 'pending' or 'accepted' or 'declined'
}, {
    timestamps: false
})


module.exports = FriendsMap;