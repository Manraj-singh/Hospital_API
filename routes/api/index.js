const router = require("express").Router();
//using version 1 of api
router.use("/v1", require("./v1"));

module.exports = router;
