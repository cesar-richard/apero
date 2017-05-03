var Sequelize = require('sequelize');
var sequelize = global.sequelize;

require("./models/EventUsers");
require("./models/user");
require("./models/event");

// RELATIONS
global.sequelize.models.user.belongsToMany(global.sequelize.models.event,{through: 'eventUsers'});
global.sequelize.models.event.belongsToMany(global.sequelize.models.user,{through: 'eventUsers'});
global.sequelize.models.event.belongsTo(global.sequelize.models.user,{as: 'author'});

// CREATE TABLES
global.sequelize.models.event.sync({force: false});
global.sequelize.models.user.sync({force: false});
global.sequelize.models.eventUsers.sync({force: false});

module.exports = global.sequelize;