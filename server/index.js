const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const productRoute = require("./Route/productRoutes");
const kpiRoute = require("./Route/kpiRoutes");
const transactionRoute = require("./Route/transactionRoutes");
const TransactionModel = require("./model/transactionModel");
const KpiModel = require("./model/kpiModel");
const ProductModel = require("./model/productModel");
const { kpis, products, transactions } = require("./data/data");
dotenv.config();

const app = express();
app.use(cors());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// console.log(app);

app.use("/kpi", kpiRoute);
app.use("/product", productRoute);
app.use("/transaction", transactionRoute);
const PORT = process.env.PORT || 9000;
console.log(process.env.MONGO_DB);
mongoose
  .connect(process.env.MONGO_DB)
  .then(async () => {
    console.log(" successfully connected to the database");
    // await mongoose.connection.db.dropDatabase();
    // // await KpiModel.insertMany(kpis);
    // ProductModel.insertMany(products);
    // console.log("sent to the daatabase");
    await TransactionModel.deleteMany();
    await TransactionModel.insertMany(transactions);
    // console.log(await TransactionModel.find());
    console.log("sent to the daatabase");
  })
  .catch((err) => {
    console.log("error somewhere", err);
  });

app.listen(PORT, () => {
  console.log(`connected on port ${PORT} `);
});
