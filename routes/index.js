var express = require('express');
var fbclass = require('../fb.class');
var router = express.Router();

/* GET home page. */
router.get('/', fbclass.ensureAuthenticated, function(req, res, next) {
	console.log(req.user);
	res.render('index', { user: req.user });
});

module.exports = router;
