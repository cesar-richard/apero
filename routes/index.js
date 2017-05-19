var express = require('express');
var fbclass = require('../fb.class');
var router = express.Router();

/* GET home page. */
router.get('/', fbclass.ensureAuthenticated, function(req, res, next) {
	global.sequelize.models.event.findAll({
		include: [{ all: true }]
	}).then(function(events) {
		res.render('index', {events: events});
	});
});

module.exports = router;
