var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var config = require('./config');
var mysql = require('mysql');
var session = require('express-session');
global.pool  = mysql.createPool({
  connectionLimit : 30,
  host            : config.database.host,
  user            : config.database.username,
  password        : config.database.password,
  database        : config.database.database
});

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

var app = express();
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
      //Check whether the User exists or not using profile.id
      global.pool.query("SELECT COUNT(*) as count FROM `user` WHERE userid=?;",[profile.id],function(err,rows){
        if (rows[0].count==0) {
          console.log("There is no such user, adding now ", profile.displayName);
          global.pool.query("INSERT into user VALUES(?,0,NULL,?);",[profile.id,JSON.stringify(profile)]);
        } else {
          console.log("User " + profile.displayName + " logged in.");
        }
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
    res.redirect(dest+"?key="+Math.random());
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
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

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
