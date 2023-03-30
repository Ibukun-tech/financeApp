const express = require("express");
const kpiController = require("../controller/kpiController");
const router = express.Router();
router.get("/kpis", kpiController.kpiGetController);

module.exports = router;
