var express = require('express');
var fbclass = require('../fb.class');
var router = express.Router();

/* GET home page. */
router.post('/', fbclass.ensureAuthenticated, function(req, res, next) {
	global.sequelize.models.answers
	.findOrCreate({where: {userUserid: req.user.id,eventId: req.body.event}, defaults: {will: 0, comment: "not implemented"}})
  .spread((obj, created) => {
  	obj.will=req.body.value;
    obj.save();
    res.json({"res":"ok"});		
  })
});

module.exports = router;