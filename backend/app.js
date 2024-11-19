const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
const routes = require("./routes/index.js");
const dotenv = require("dotenv");
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    origin: ["https://code-live-eta.vercel.app"],
    methods: ["GET", "POST", "DELETE", "PUT"],
    credentials: true,
  })
);

dotenv.config();

mongoose
  .connect(process.env.URI)
  .then(() => {
    app.listen(process.env.PORT || 3000, (err) => {
      if (err) {
        console.error(err);
      }
    });
  })
  .catch((err) => {
    console.log(err);
  });

app.use("/", routes);
