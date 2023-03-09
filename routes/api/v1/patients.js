const router = require("express").Router();
const { patientController } = require("../../../controllers");
//requiring prechecks middlewares before going to controller
const {
  patientRegisterPreChecks,
  createReportPrechecks,
} = require("../../../middlewares/patients");

router.post("/register", patientRegisterPreChecks, patientController.register);

router.post(
  "/:patientID/create_report",
  createReportPrechecks,
  patientController.createReport
);
router.get("/:patientID/all_reports", patientController.showAllReports);

module.exports = router;
