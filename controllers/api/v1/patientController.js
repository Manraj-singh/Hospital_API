const { Patient, Report } = require("../../../models");

module.exports.register = async function (req, res) {
  try {
    let newPatient = await Patient.create(req.body);

    if (newPatient) {
      let { _id, name, phone } = newPatient;

      // sending the success response
      return res.status(200).json({
        data: {
          patient: { id: _id, name, phone },
        },
        message: "Patient registration successfull",
        success: true,
      });
    } else {
      return res.status(500).json({
        data: null,
        message: "Something went wrong",
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

module.exports.createReport = async function (req, res) {
  //get patientid from params and current logged in doctor from req.user which we get from passport auth
  const { patientID } = req.params;
  const currDoctor = req.user;
  try {
    //check if patient is present in db
    const patient = await Patient.findById({ _id: patientID });

    if (!patient) {
      return res.status(500).json({
        data: null,
        message: "cannot find patient details ,please enter correct patient id",
        success: false,
      });
    }
    //move on to create report with doctor and patient details

    const report = {
      doctor: currDoctor._id,
      patient: patient._id,
      status: req.body.status,
    };

    const createdReport = await Report.create(report);
    //if report is created , add it to patients report array and save
    if (createdReport) {
      await patient.reports.push(createdReport);
      await patient.save();
    } else {
      res.status(500).json({
        data: null,
        message: "something went wrong while creating report ,please try again",
        success: false,
      });
    }

    //now return success response
    res.status(200).json({
      data: {
        report: {
          doctor: { name: currDoctor.name, id: currDoctor._id },
          patient: { name: patient.name, id: patient._id },
          status: createdReport.status,
        },
      },
      message: "Report created successfully",
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

module.exports.showAllReports = async function (req, res) {
  try {
    const { patientID } = req.params;

    //check if patient exists with given patientID
    const patient = await Patient.findById(patientID);
    // if patient does not exists proceed to return reports of patient
    if (!patient) {
      return res.status(500).json({
        data: null,
        message: "cannot find patient ,please crosscheck entered details ",
        success: false,
      });
    }

    const patientReports = await patient.populate("reports");

    if (patientReports) {
      res.status(200).json({
        data: {
          reports: patientReports.reports,
        },
        message: "reports of user found",
        success: true,
      });
    } else {
      return res.status(500).json({
        data: null,
        message: "no record found ",
        success: false,
      });
    }
    res.status(200).json({ message: "test" });
  } catch (err) {
    return res.status(500).json({
      data: null,
      message: `error:${err}`,
      success: false,
    });
  }
};
