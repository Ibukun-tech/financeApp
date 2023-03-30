const mongoose = require("mongoose");

const { loadType } = require("mongoose-currency");
const schema = mongoose.Schema;
loadType(mongoose);
const productSchema = new schema(
  {
    price: {
      type: mongoose.Types.Currency,
      currency: "USD",
      get: (v) => v / 100,
    },
    expense: {
      type: mongoose.Types.Currency,
      currency: "USD",
      get: (v) => v / 100,
    },
    transactions: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "TransactionModel",
      },
    ],
  },
  { timestamps: true, toJSON: { getters: true } }
);

const ProductModel = mongoose.model("ProductModel", productSchema);

module.exports = ProductModel;
