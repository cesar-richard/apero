var Sequelize = require('sequelize');
var sequelize = global.sequelize;

require("./models/user");
require("./models/event");
require("./models/EventUsers");

// RELATIONS

global.sequelize.models.user.belongsToMany(global.sequelize.models.event,{through: 'eventUsers'});
global.sequelize.models.event.belongsToMany(global.sequelize.models.user,{through: 'eventUsers'});
global.sequelize.models.event.belongsTo(global.sequelize.models.user,{as: 'author'});
// CREATE TABLES
global.sequelize.models.user.sync({force: false}).then(function(){
	global.sequelize.models.event.sync({force: false}).then(function(){
		global.sequelize.models.eventUsers.sync({force: false}).then(function(){
			global.sequelize.models.user.create({
				userid: "4",
				displayName: "Mark Zuckerberg",
				admin: 0
			}).then(function(user){
				global.sequelize.models.event.create({
					author: user,
					title: "Mark's orgy'",
					description: "We'll all get drunk <3",
					date: new Date()
				}).then(function(event){
				})
			});
		});
	});
});

module.exports = global.sequelize;