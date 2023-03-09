const router = require("express").Router();
const passport = require("passport");

//for doctor register and login
router.use("/doctors", require("./doctors"));

//for patient routes authentication is required as only doctors can register, create report and see confidential patient reports
router.use(
  "/patients",
  passport.authenticate("jwt", { session: false }),
  require("./patients")
);

//this is unprotected route
router.use("/reports", require("./reports"));

module.exports = router;
