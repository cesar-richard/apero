var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var config = require('./config');
var Sequelize = require('sequelize');
var session = require('express-session');

global.sequelize = new Sequelize(config.database.database, config.database.username, config.database.password, {
  host: config.database.host,
  dialect: 'mysql',
  pool: {
    max: 30,
    min: 0,
    idle: 10000
  },
  logging: false
});

var User = require('./models/user');

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

/*******************************
  * FACEBOOK CONFIGURATION
  */

  var passport          =     require('passport');
  var FacebookStrategy  =     require('passport-facebook').Strategy;
  var FB          =   require('fb');
  global.FB = FB;

// Passport session setup.
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

// Use the FacebookStrategy within Passport.

passport.use(new FacebookStrategy({
  clientID: config.facebook.api_key,
  clientSecret:config.facebook.api_secret ,
  callbackURL: config.facebook.callback_url,
  profileFields: ['id', 'displayName','photos','email','first_name','last_name',]
},
function(accessToken, refreshToken, profile, done) {
  process.nextTick(function () {
    User
    .findOrCreate({where: {userid: profile.id, raw_infos: JSON.stringify(profile)}})
    .spread(function(user, created) {
      if(created)
        console.log("User "+profile.displayName+" created");
      console.log(profile.displayName+" logged in");
      return done(null, profile);
    });
  });
}
));

app.use(session({
  secret            : 'cEstLeMarketPutainMaggle!',
  resave            : false,
  saveUninitialized : true
}));

FB.api('oauth/access_token', {
  client_id: config.facebook.api_key,
  client_secret: config.facebook.api_secret,
  grant_type: 'client_credentials'
}, function (res) {
  if(!res || res.error) {
    console.error(!res ? 'error occurred' : res.error);
    return;
  }
  console.log("Access token FB : ", res.access_token)
  FB.setAccessToken = res.access_token;
});

app.use(passport.initialize());
app.use(passport.session());

app.get('/auth/facebook', passport.authenticate('facebook',{scope:'email'}));

app.get('/auth/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/' }),
  function(req, res) {
    var dest=req.session.destAfterAuth?req.session.destAfterAuth:'/';
    delete req.session.destAfterAuth;
    res.redirect(dest);//+"?key="+Math.random());
  });

app.get('/logout', function(req, res){
  console.log("User " + req.user.displayName + " logged out.");
  req.logout();
  res.redirect('/');
});


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req,res,next){
  res.locals.title = "Apéro !";
  res.locals.user = req.user;
  return next();
});

app.use('/', routes);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;
