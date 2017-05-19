var Sequelize = require('sequelize');
var sequelize = global.sequelize;

answers = sequelize.define('answers', {
    will: Sequelize.INTEGER,
    comment: Sequelize.STRING
});

module.exports = answers;