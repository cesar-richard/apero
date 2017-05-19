var Sequelize = require('sequelize');
var sequelize = global.sequelize;

var Event = sequelize.define('event', {
  title: {
    type: Sequelize.STRING
  },
  description: {
    type: Sequelize.STRING
  },
  date: {
    type: Sequelize.DATE
  }
}, {
  timestamps: true,
  freezeTableName: true
});

module.exports = Event;