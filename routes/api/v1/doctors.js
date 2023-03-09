const router = require("express").Router();
//these are middlewares created for prechecks before going to controller
const {
  userRegisterPreChecks,
  userLoginPreChecks,
} = require("../../../middlewares");

const { doctorController } = require("../../../controllers");

// Doctor Registration route , first prechecks are done then controller gets called
router.post("/register", userRegisterPreChecks, doctorController.register);

// Doctor Login route , after prechecks controller will be called
router.post("/login", userLoginPreChecks, doctorController.login);

module.exports = router;
