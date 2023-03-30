const kpiModel = require("../model/kpiModel");
exports.kpiGetController = async (req, res) => {
  try {
    const kpis = await kpiModel.find();
    res.status(200).json(kpis);
  } catch (err) {
    console.log(err);
    res.status(404).json({ mssage: err.message });
  }
};
