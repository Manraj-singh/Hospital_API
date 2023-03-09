//defining passport strategy to be used as middleware for authentication

const passport = require("passport");
const JWTStrategy = require("passport-jwt").Strategy;
const ExtractJWT = require("passport-jwt").ExtractJwt;
const { Doctor } = require("../models");
const { JWT_SECRET_KEY } = require("../secretkeys");

//  JWT Strategy Options
let options = {
  // extract bearer JWT token from header
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: JWT_SECRET_KEY,
};

// will run after JWT token extraction and fetch the user details
passport.use(
  new JWTStrategy(options, async function (jwtPayLoad, done) {
    try {
      const user = await Doctor.findById(jwtPayLoad._id);
      if (user) {
        return done(null, user);
      } else {
        return res.status(417).json({
          data: null,
          message: "Please login to continue",
          success: false,
        });
      }
    } catch (err) {
      return res.status(500).json({
        data: null,
        message: `error:${err}`,
        success: false,
      });
    }
  })
);

module.exports = passport;
