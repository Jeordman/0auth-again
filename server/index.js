require("dotenv").config();

const express = require("express");
const { json } = require("body-parser");
const session = require("express-session");
const massive = require("massive");

//passport stuff/auth0
const passport = require("passport");
const Auth0Strategy = require("passport-auth0");

let returnStr = "/";

const port = 4000;

const app = express();

massive(process.env.CONNECTION_STRING)
  .then(db => {
    app.set("db", db);
  })
  .catch(err => console.log("massive-err", err));

app.use(json());

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 10000000
    }
  })
);


app.use(passport.initialize());
app.use(passport.session());

passport.use(
  new Auth0Strategy(
    {
      domain: process.env.DOMAIN,
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: "/api/login"
    },
    function(accessToken, refreshToken, extraParams, profile, done) {
  
      app
        .get("db")
        .getUserByAuthId([profile.id])
        .then(response => {
          if (!response[0]) {
            app
              .get("db")
              .createUserByAuthId([
                profile.id,
                profile.emails[0].value,
                profile.name.givenName,
                profile.picture
              ])
              .then(created => {              
                return done(null, created[0]);
              });
          } else {
            return done(null, response[0]);
          }
        });
    }
  )
);

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

app.get('/api/getUser', (req, res, next) => {
  if(req.user) {
    console.log('is a user')
    res.status(200).json(req.user)
    // call steven so he can have a look
  }
  else res.sendStatus(500)
})

app.get(
  "/api/login",
  passport.authenticate("auth0", {
    failureRedirect: `http://localhost:3001/login`
  }),
  (req, res) => {
    res.redirect(`http://localhost:3000${returnStr}`);
  }
);

app.post("/api/redirect", (req, res, next) => {
  returnStr = req.body.place;
  res.status(200).send(returnStr);
});

app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});
