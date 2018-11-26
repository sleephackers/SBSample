const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const studentRoutes = require("./api/routes/students");
//const orderRoutes = require('./api/routes/orders');

mongoose.connect(
  "mongodb://webtask:" +
    process.env.MONGO_ATLAS_PW +
    "@sbcluster-shard-00-00-zwph9.mongodb.net:27017,sbcluster-shard-00-01-zwph9.mongodb.net:27017,sbcluster-shard-00-02-zwph9.mongodb.net:27017/test?ssl=true&replicaSet=sbcluster-shard-0&authSource=admin&retryWrites=true",
  {
    useMongoClient: true
  }
);

//app.use('/orders', orderRoutes);

app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});
app.use("/students", studentRoutes);

app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});

module.exports = app;
