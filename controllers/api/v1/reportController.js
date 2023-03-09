const { Report } = require("../../../models");

module.exports.showAllReportsByStatus = async function (req, res) {
  const enteredStatus = req.params.status.toLowerCase();
  //status can be only among below
  const status = [
    "negative",
    "travelled-quarantine",
    "symptoms-quarantine",
    "positive-admit",
  ];
  //check if status is not passed
  if (!enteredStatus) {
    return req.status(417).json({
      data: null,
      message: "status cannot be empty",
      success: false,
    });
  }
  //   check if entered status is valid
  if (!status.includes(enteredStatus)) {
    return req.status(417).json({
      data: null,
      message: "invalid status, please enter a valid status",
      success: false,
    });
  }

  //proceed to get all reports
  try {
    const allReports = await Report.find({ status: enteredStatus });
    // .populate(
    //   "doctor patient"
    // );
    if (allReports.length <= 0) {
      return res.status(404).json({
        data: null,
        message: "No reports found for entered status",
        success: false,
      });
    }

    return res.status(200).json({
      data: allReports,
      message: "reports found for entered status",
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
