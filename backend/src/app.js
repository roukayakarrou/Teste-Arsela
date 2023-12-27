const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const formRouter = require("./routes/forms.route");
const config = require("./config/config");

const app = express();

mongoose.connect(config.mongoUri)
  .then(() => console.log("[+] Successfully connected to the database"))
  .catch(err => console.log(err));

app.use(express.urlencoded({ extended: true}));
app.use(express.json());

app.use(cors());
app.options("*", cors());

// custom middleware to handle empty json bodies
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError) {
    return res.status(400).json({
      success: false,
      message: "Malformed body"
    });
  }
  next(err);
});

app.use("/api/v1", formRouter);

module.exports = app;