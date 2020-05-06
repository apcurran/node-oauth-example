const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth2");

passport.use(new GoogleStrategy(
    {
        // Options for the Google Strat
    }),
    () => {
        // passport callback func
    }
);