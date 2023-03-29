const Sequelize = require('sequelize');
const db = require('../database.js');

const Event = db.define('event', {
    idevent: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    Name: { type: Sequelize.STRING, allowNull: false },
    // iduser: { type: Sequelize.STRING, allowNull: false, references: { model: 'user', key: 'iduser' } },
    iduser: { type: Sequelize.INTEGER, allowNull: false },
    Weight: { type: Sequelize.INTEGER, allowNull: false },
    Date: { type: Sequelize.DATE, allowNull: false },
    // idcategory: { type: Sequelize.INTEGER, allowNull: false, references: { model: 'category', key: 'idcategory' } },
    idcategory: { type: Sequelize.INTEGER, allowNull: false },
}, {
    timestamps: false
})

// Event.hasOne(User);
// Event.hasOne(Category)

module.exports = Event;