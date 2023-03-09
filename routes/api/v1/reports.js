const router = require("express").Router();
const { reportController } = require("../../../controllers");

router.get("/:status", reportController.showAllReportsByStatus);

module.exports = router;
