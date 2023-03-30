const TransactionModel = require("../model/transactionModel");
exports.transactionGetController = async (req, res) => {
  try {
    const transactions = await TransactionModel.find()
      .limit(50)
      .sort({ createdOn: -1 });
    res.status(200).json(transactions);
  } catch (err) {
    console.log(err);
    res.status(404).json({ mssage: err.message });
  }
};
