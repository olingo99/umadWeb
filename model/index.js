const Sequelize = require('sequelize')
const sequelize = require('../database.js');

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

//import models
db.User = require('./userModel.js');
db.Event = require('./eventModel.js');
db.Category = require('./categoryModel.js');
db.FriendsMap = require('./friendsMapModel.js');
db.EventTemplate = require('./eventTemplateModel.js');



//set relationships and foreign keys
db.Event.belongsTo(db.Category, { foreignKey: 'idcategory' });
db.Category.hasMany(db.Event, { foreignKey: 'idcategory' });

db.EventTemplate.belongsTo(db.Category, { foreignKey: 'idcategory' });
db.Category.hasMany(db.EventTemplate, { foreignKey: 'idcategory' });

db.Event.belongsTo(db.User, { foreignKey: 'iduser' });
db.User.hasMany(db.Event, { foreignKey: 'iduser' });

db.EventTemplate.belongsTo(db.User, { foreignKey: 'iduser' });
db.User.hasMany(db.EventTemplate, { foreignKey: 'iduser' });

db.FriendsMap.belongsTo(db.User, { foreignKey: 'iduser' });
db.User.hasMany(db.FriendsMap, { foreignKey: 'iduser' });

db.Category.belongsTo(db.User, { foreignKey: 'iduser' });
db.User.hasMany(db.Category, { foreignKey: 'iduser' });



module.exports = db;