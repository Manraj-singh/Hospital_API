//*NOTE:config folder contains all the configurations made like mongoose ,passport

const db = require("./mongoose");
const passport = require("./passport-jwt-strategy");
module.exports = {
  db,
  passport,
};
