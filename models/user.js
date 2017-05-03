var Sequelize = require('sequelize');
var User = global.sequelize.define('user', {
  userid: {
    type: Sequelize.STRING
  },
  raw_infos: {
    type: Sequelize.STRING
  },
  admin: {
  	type: Sequelize.BOOLEAN,
  	defaultValue : false
  }
}, {
  timestamps: true,
  freezeTableName: true // Model tableName will be the same as the model name
});

User.sync({force: false});

module.exports = User;