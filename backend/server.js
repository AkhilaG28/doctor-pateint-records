const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const userRoutes = require("./Routes/routes");

dotenv.config();

const app = express();

mongoose.connect(
  process.env.ATLAS_URI,
  {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) console.log("Connection to database failed", err);
    else console.log("Database is successfully connected");
  }
);

app.use(cors());
app.use(express.json());

app.use("/uploads", express.static("uploads"));

app.use("/", userRoutes);

app.listen(8000, () => {
  console.log("The server is up and running");
});
