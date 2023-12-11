const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const path = require('path');

// Routes
const categoriaRoutes = require('./routes/categoriaRoutes');
const cidadeRoutes = require('./routes/cidadeRoutes');
const clienteRoutes = require('./routes/clienteRoutes');
const pedidoRoutes = require('./routes/pedidoRoutes');
const pacoteRoutes = require('./routes/pacoteRoutes');
const ped_pacRoutes = require('./routes/ped_pacRoutes');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.set('view engine', 'ejs');

app.use(session({
  resave: false,
  saveUninitialized: true,
  secret: 'SECRET' 
}));

app.get('/', (req, res) => {
  res.send('API FUNCIONANDO!')
});

app.get('/oauth', function(req, res) {
  res.render('pages/auth');
});

app.get('/oauth', function(req, res){
  res.render('pages/success', {user: userProfile});
});

/*  PASSPORT SETUP  */
var userProfile;

app.use(passport.initialize());
app.use(passport.session());

app.set('view engine', 'ejs');

app.get('/success', (req, res) => res.send(userProfile));
app.get('/error', (req, res) => res.send("error logging in"));

passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});


/*  Google AUTH  */
 
const GOOGLE_CLIENT_ID = '346637207694-8980ehioe0uhhujvgpgl4kuimgarlus6.apps.googleusercontent.com';
const GOOGLE_CLIENT_SECRET = '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';
passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, done) {
      userProfile=profile;
      return done(null, userProfile);
  }
));
 
app.get('/auth/google', 
  passport.authenticate('google', { scope : ['profile', 'email'] }));
 
app.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/error' }),
  function(req, res) {
    // Successful authentication, redirect success.
    res.redirect('/success');
  });

// Add your routes
app.use('/categoria', categoriaRoutes);
app.use('/cidade', cidadeRoutes);
app.use('/cliente', clienteRoutes);
app.use('/pacote', pacoteRoutes);
app.use('/pedido', pedidoRoutes);
app.use('/ped_pac', ped_pacRoutes);

app.listen(port, () => {
  console.log(`Servidor executando em http://localhost:${port}`);
});
