const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
const routes = require("./routes/index.js");
const dotenv = require("dotenv");
dotenv.config();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    origin: "https://code-live-eta.vercel.app",
    // methods: ["GET", "POST", "DELETE", "PUT", "OPTIONS"],
  })
);
app.options("*", cors()); // Enable preflight for all routes

mongoose
  .connect(process.env.URI)
  .then(() => {
    app.listen(process.env.PORT, (err) => {
      if (err) {
        console.error(err);
      }
    });
  })
  .catch((err) => {
    console.log(err);
  });

app.use("/", routes);
