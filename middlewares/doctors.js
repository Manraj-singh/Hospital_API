const { Doctor } = require("../models");

module.exports.userRegisterPreChecks = async function (req, res, next) {
  const { name, email, username, password } = req.body;

  //checks if any details are missing if yes return message to fill all details
  if (!(name && email && username && password)) {
    return res.status(417).json({
      data: null,
      message: "please fill all the required details",
      success: false,
    });
  }

  //check if doctor is already registered
  const doctorAlreadyRegistered = await Doctor.findOne({
    $or: [{ email: email }, { username: username }],
  });

  if (doctorAlreadyRegistered) {
    //if the username already exists
    if (doctorAlreadyRegistered.username === username) {
      return res.status(417).json({
        data: null,
        message: `User with username: ${username} already exists`,
        success: false,
      });
    }
    //if the doctor is already present in db ask to login instead
    return res.status(409).json({
      data: { doctor: { name, username, email } },
      message: "doctor is already registered,kindly login",
      success: false,
    });
  }

  next();
};

module.exports.userLoginPreChecks = async function (req, res, next) {
  const { username, password } = req.body;
  //checks if any details are missing if yes return message to fill all details

  if (!(username && password)) {
    return res.status(417).json({
      data: null,
      message: "please fill all the required details",
      success: false,
    });
  }

  const doctorDetails = await Doctor.findOne({ username: username });
  //if there is no doctor with given username or if passord entered doesnot match the password
  if (!doctorDetails || password !== doctorDetails.password) {
    return res.status(401).json({
      data: null,
      message: "please enter correct username/password",
      success: false,
    });
  }

  //adding doctorDetails to req for further use in controller
  req.doctorDetails = doctorDetails;
  next();
};
