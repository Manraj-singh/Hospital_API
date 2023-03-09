const { Doctor } = require("../../../models");
const jwt = require("jsonwebtoken");
const { JWT_SECRET_KEY } = require("../../../secretkeys");

module.exports.register = async function (req, res) {
  //!NOTE:prechecks done in MIDDLEWARE before proceeding to register

  //CREATING USER IN DB
  try {
    const newUser = await Doctor.create(req.body);
    if (newUser) {
      let { name, email, username } = newUser;

      return res.status(200).json({
        data: {
          doctor: { name, username, email },
        },
        message: "Successfully registered, Proceed for LogIn",
        success: true,
      });
    } else {
      return res.status(500).json({
        data: null,
        message: "Something went wrong ,please try again",
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
};

//*prechecks done in MIDDLEWARE before proceeding to login
module.exports.login = function (req, res) {
  try {
    return res.status(200).json({
      data: {
        //  creating a jwt token with doctorDetails passed from middleware
        token: jwt.sign(req.doctorDetails.toJSON(), JWT_SECRET_KEY, {
          expiresIn: 500000,
        }),
      },
      message: "login success",
      success: true,
    });
  } catch (err) {
    return res.status(500).json({
      data: null,
      message: `error:${err}`,
      success: false,
    });
  }
};
