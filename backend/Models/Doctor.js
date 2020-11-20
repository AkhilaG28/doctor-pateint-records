const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const doctorSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: 6,
    },
    patients: {
      type: Array,
      default: [],
    },
  },
  {
    versionKey: false,
  }
);

module.exports = mongoose.model("Doctors", doctorSchema);
