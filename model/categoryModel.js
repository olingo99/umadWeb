const Sequelize = require('sequelize');
const db = require('../database.js');

const Category = db.define('category', {
    idcategory: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    Name: { type: Sequelize.STRING, allowNull: false },
}, {
    timestamps: false
})



module.exports = Category;