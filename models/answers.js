var Sequelize = require('sequelize');
var sequelize = global.sequelize;

answers = sequelize.define('answers', {
    will: Sequelize.INTEGER
});

module.exports = answers;