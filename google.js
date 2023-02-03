/* const GoogleSrtategy = require('passport-google-oauth20').Strategy */
import GoogleStrategy from 'passport-google-oauth20'
import dotenv from 'dotenv'

dotenv.config()

const gStrategy = GoogleStrategy.Strategy;

const strategy = new gStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "http://localhost:8080/auth"
      },
      function(accessToken, refreshToken, profile, cb) {
        console.log(`Info recibida`)
        console.log(profile)
       /*  User.findOrCreate({ googleId: profile.id }, function (err, user) { */
          return cb(null, profile);
    /*     }); */
      }
    );

    export default strategy;