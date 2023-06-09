const { Sequelize } = require('sequelize');

//Create a connection to the database
const sequelize = new Sequelize('umad', 'olingo', 'olingoolingo', {
  dialect: 'mysql',
  dialectOptions: {
    host: 'localhost'
  }
})


module.exports = sequelize;
