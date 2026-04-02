const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

const clientID = "810213586810-i9bo4fjiik13f1bt7rou7v6cpavrn7np.apps.googleusercontent.com";
const clientSecret = "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";

passport.use(new GoogleStrategy({
    clientID: clientID,
    clientSecret: clientSecret,
    callbackURL: "/auth/google/callback"
},
(accessToken, refreshToken, profile, done) => {
    console.log(profile); // Google se user ka data milta
    return done(null, profile); // session me save
}));

passport.serializeUser((user, done) => {
    done(null, user); // session me store
});

passport.deserializeUser((user, done) => {
    done(null, user); // session se read
});

module.exports = passport;