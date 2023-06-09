const Sequelize = require('sequelize');
const db = require('../database.js');

/*
Sequelize model for the eventTemplate table in the database.
*/


const EventTemplate = db.define('eventtemplate', {
    ideventTemplate: {                                      //primary key, id of the eventTemplate
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    Name: { type: Sequelize.STRING, allowNull: false },   //name of the eventTemplate
    iduser: { type: Sequelize.INTEGER, allowNull: false },  //foreign key, id of the user to whom the eventTemplate belongs
    ProposedWeight: { type: Sequelize.INTEGER, allowNull: false },  //proposed weight of the eventTemplate
    idcategory: { type: Sequelize.INTEGER, allowNull: false },  //foreign key, id of the category to which the eventTemplate belongs
}, {
    timestamps: false
})


module.exports = EventTemplate;