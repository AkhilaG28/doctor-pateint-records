const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const patientsSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    avatar: {
      type: String,
      required: true,
    },
    docId: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    prescription: {
      type: Array,
      default: [],
    },
  },
  {
    versionKey: false,
  }
);

module.exports = mongoose.model("Patients", patientsSchema);
