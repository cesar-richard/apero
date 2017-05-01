var express = require('express');
var fbclass = require('../fb.class');
var router = express.Router();

/* GET home page. */
router.get('/', fbclass.ensureAuthenticated, function(req, res, next) {
  res.render('index', { title: req.user.name.givenName });
});

module.exports = router;
