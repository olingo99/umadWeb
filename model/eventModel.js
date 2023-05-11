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


Event.addHook('afterCreate', async (event, options) => {
    try {

      const user = await event.getUser();
      const newMood = user.dataValues.Mood + event.Weight;

      if (newMood > 100) {
        newMood = 100;
      } else if (newMood < -100) {
        newMood = -100;
      }

      await user.update({ Mood: newMood });

    } catch (error) {
      console.error('Failed to update user\'s mood:', error);
    }
  });

// Event.hasOne(User);
// Event.hasOne(Category)

module.exports = Event;