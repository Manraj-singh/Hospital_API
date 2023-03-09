//*NOTE: this middlewares are created for prechecks before going to contoller
//prechecks includes checking if all required details are filled or if deoctor /patient is already registered etc

const { userLoginPreChecks, userRegisterPreChecks } = require("./doctors");
const { patientRegisterPreChecks } = require("./patients");

module.exports = {
  userLoginPreChecks,
  userRegisterPreChecks,
  patientRegisterPreChecks,
};
