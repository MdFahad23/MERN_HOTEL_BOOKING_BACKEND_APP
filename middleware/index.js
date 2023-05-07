const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");

module.exports = (app) => {
  app.use(express.json());
  app.use(cookieParser());
  if (process.env.NODE_ENV === "development") {
    app.use(morgan());
  }
};
