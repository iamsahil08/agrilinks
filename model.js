const mongoose = require("mongoose");

const cmdtySchema = new mongoose.Schema({
  userID: {
    type: String,
    required: true,
  },
  marketID: {
    type: String,
    required: true,
  },
  marketName: {
    type: String,
    default: "",
  },
  cmdtyID: {
    type: String,
    required: true,
  },
  marketType: {
    type: String,
    default: "Mandi",
  },
  cmdtyName: {
    type: String,
    default: "",
  },
  priceUnit: {
    type: String,
    default: "Kg",
  },
  convFctr: {
    type: Number,
    default: 1,
  },
  price: {
    type: Number,
    required: true,
  },
});

const cmdtyModel = mongoose.model("Cmdty", cmdtySchema);

const reportSchema = new mongoose.Schema({
  cmdtyID: {
    type: String,
    required: true,
  },
  cmdtyName: {
    type: String,
    default: "",
  },
  marketID: {
    type: String,
    required: true,
  },
  marketName: {
    type: String,
    default: "",
  },
  users: {
    type: Array,
    required: true,
  },
  priceUnit: {
    type: String,
    default: "Kg",
  },
  price: {
    type: Number,
    required: true,
  },
});

const reportModel = mongoose.model("Report", reportSchema);

module.exports = { cmdtyModel, reportModel };
