var Sequelize = require('sequelize');
var sequelize = global.sequelize;

var User = sequelize.define('user', {
  userid: {
    type: Sequelize.STRING,
    primaryKey: true
  },
  displayName: {
    type: Sequelize.STRING
  },
  admin: {
    type: Sequelize.BOOLEAN,
    defaultValue : false
  }
}, {
  timestamps: true,
  freezeTableName: true
});

module.exports = User;