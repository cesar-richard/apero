var Sequelize = require('sequelize');
var sequelize = global.sequelize;

require("./models/user");
require("./models/event");
require("./models/answers");

// RELATIONS

global.sequelize.models.user.belongsToMany(global.sequelize.models.event,{through: 'answers'});
global.sequelize.models.event.belongsToMany(global.sequelize.models.user,{through: 'answers'});
global.sequelize.models.event.belongsTo(global.sequelize.models.user,{as: 'author', allowNull: false});
// CREATE TABLES
global.sequelize.sync({force: true}).then(function(){
	global.sequelize.models.user.create({
		userid: "4",
		displayName: "Mark Zuckerberg",
		admin: 0
	}).then(function(user){
		global.sequelize.models.event.create({
			authorUserid: user.userid,
			title: "Mark's orgy'",
			description: "We'll all get drunk <3",
			date: new Date()
		}).then(function(event){
		});
	});
	global.sequelize.models.user.create({
		userid: "101522653758700",
		displayName: "Barbara Alagjbhifcbeg Putnamwitz",
		admin: 0
	}).then(function(user){
		global.sequelize.models.event.create({
			authorUserid: user.userid,
			title: "Barbie's party",
			description: "That's gonna be naughty ...",
			date: new Date()
		})
	});
	global.sequelize.models.user.create({
		userid: "112088616033146",
		displayName: "Donna Alafifjbdfehi Riceson",
		admin: 0
	}).then(function(user){
		global.sequelize.models.event.create({
			authorUserid: user.userid,
			title: "Just wanna some booze",
			description: "Come and get some ! It'll be at my place this time.",
			date: new Date()
		})
	});
	global.sequelize.models.user.create({
		userid: "113101629264186",
		displayName: "Mike Alaficjdhhdfb Wisemanwitz",
		admin: 0
	});
	global.sequelize.models.user.create({
		userid: "113564472551074",
		displayName: "David Alafibefehfji McDonaldberg",
		admin: 0
	});
	global.sequelize.models.user.create({
		userid: "120695488498054",
		displayName: "Open Graph Test User",
		admin: 0
	});


});
module.exports = global.sequelize;