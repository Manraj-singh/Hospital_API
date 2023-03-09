const { Patient } = require("../models");

module.exports.patientRegisterPreChecks = async function (req, res, next) {
  const { name, phone } = req.body;

  //checks if any details are missing if yes return message to fill all details
  if (!(name && phone)) {
    return res.status(417).json({
      data: null,
      message: "please fill all the required details",
      success: false,
    });
  }

  //check if patient is already registered
  const patientAlreadyRegistered = await Patient.findOne({
    phone: phone,
  });
  if (patientAlreadyRegistered) {
    //if the patient is already present
    return res.status(409).json({
      data: {
        patient: {
          id: patientAlreadyRegistered._id,
          name: patientAlreadyRegistered.name,
          phone,
        },
      },
      message: "patient is already registered",
      success: false,
    });
  }

  next();
};

module.exports.createReportPrechecks = function (req, res, next) {
  //if any required details are missing
  if (!(req.params.patientID && req.body.status)) {
    return res.status(417).json({
      data: null,
      message: "please fill all the required details",
      success: false,
    });
  }

  //checking if status entered is valid
  const status = [
    "negative",
    "travelled-quarantine",
    "symptoms-quarantine",
    "positive-admit",
  ];
  //if status is not as per valid statuses
  if (!status.includes(req.body.status.toLowerCase())) {
    return res.status(417).json({
      data: null,
      message: "invalid status entered, please crosscheck status and enter",
      success: false,
    });
  }
  next();
};
