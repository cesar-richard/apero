exports.ensureAuthenticated = function(req, res, next){
  if (req.isAuthenticated()) { return next(); }
  req.session.destAfterAuth = req.originalUrl;
  res.redirect('/auth/facebook')
}