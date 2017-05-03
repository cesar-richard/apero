var Sequelize = require('sequelize');
var sequelize = global.sequelize;

EventUsers = sequelize.define('eventUsers', {
    will: Sequelize.INTEGER
});

module.exports = EventUsers;