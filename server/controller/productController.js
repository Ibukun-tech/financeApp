const productModel = require("../model/productModel");
exports.productGetController = async (req, res) => {
  try {
    const products = await productModel.find();
    res.status(200).json(products);
  } catch (err) {
    console.log(err);
    res.status(404).json({ mssage: err.message });
  }
};
