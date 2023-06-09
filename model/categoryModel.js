const Sequelize = require('sequelize');
const db = require('../database.js');

/* 
Sequelize model for the category table in the database.
*/


const Category = db.define('category', {
    idcategory: {                                        //primary key, id of the category
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    iduser: { type: Sequelize.INTEGER, allowNull: false },  //foreign key, id of the user to whom the category belongs
    Name: { type: Sequelize.STRING, allowNull: false },     //name of the category

}, {
    timestamps: false
})



module.exports = Category;