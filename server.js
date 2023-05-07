require("dotenv").config();
const mongoose = require("mongoose");

const app = require("./app");
const port = process.env.PORT || 5000;

mongoose
  .connect(process.env.DATABASE_URL)
  .then((res) => console.log("> SUCCESSFULLY TO CONNECTING DATABASE!"))
  .catch((err) => console.log("> DATABASE CONNECTING FAILED!"));

app.listen(port, () =>
  console.log("> Server is up and running on port : " + port)
);
