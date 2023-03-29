const Sequelize = require('sequelize');
const db = require('../database.js');

const EventTemplate = db.define('eventtemplate', {
    ideventTemplate: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    Name: { type: Sequelize.STRING, allowNull: false },
    // iduser: { type: Sequelize.STRING, allowNull: false, references: { model: 'user', key: 'iduser' } },
    iduser: { type: Sequelize.INTEGER, allowNull: false },
    ProposedWeight: { type: Sequelize.INTEGER, allowNull: false },
    // idcategory: { type: Sequelize.INTEGER, allowNull: false, references: { model: 'category', key: 'idcategory' } },
    idcategory: { type: Sequelize.INTEGER, allowNull: false },
}, {
    timestamps: false
})

// EventTemplate.hasOne(User);
// EventTemplate.hasOne(Category);

module.exports = EventTemplate;