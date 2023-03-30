const express = require("express");
const transactionController = require("../controller/transactionController");
const router = express.Router();
router.get("/transactions", transactionController.transactionGetController);

module.exports = router;
