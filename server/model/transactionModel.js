const mongoose = require("mongoose");

const { loadType } = require("mongoose-currency");
const schema = mongoose.Schema;
loadType(mongoose);
const transactionSchema = new schema(
  {
    buyer: {
      type: String,
      required: true,
    },
    amount: {
      type: mongoose.Types.Currency,
      currency: "USD",
      get: (v) => v / 100,
    },
    productIds: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ProductModel",
      },
    ],
  },
  { timestamps: true, toJSON: { getters: true } }
);

const TransactionModel = mongoose.model("TransactionModel", transactionSchema);

module.exports = TransactionModel;
