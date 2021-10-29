const express = require("express");
const cors = require("cors");
require("dotenv").config();

const port = 3035;

const MIN_PROD_RESULT = 2;

const app = express();

app.use(
  cors({
    origin: ["http://localhost:3030"],
    methods: "GET",
  })
);
const searchRoute = require("./routes");
app.use(searchRoute);

const server = app.listen(process.env.PORT || port, function () {
  console.log(`[Server running on ${process.env.HOST}:${process.env.PORT}]`);
});
