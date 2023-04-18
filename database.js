const { Sequelize } = require('sequelize');

// Option 2: Passing parameters separately (sqlite)
// const sequelize = new Sequelize('umad', 'olingo', 'olingoolingo', {
//   dialect: 'mysql',
//   dialectOptions: {
//     host: 'pat.infolab.ecam.be', port:63340
//   }
// })

const sequelize = new Sequelize('umad2', 'olingo', 'olingoolingo', {
  dialect: 'mysql',
  dialectOptions: {
    host: 'localhost'
  }
})

module.exports = sequelize;

// async function test(){
//   try {
//     await sequelize.authenticate();
//     console.log('Connection has been established successfully.');
//   } catch (error) {
//     console.error('Unable to connect to the database:', error);
//   }
// }

// test();