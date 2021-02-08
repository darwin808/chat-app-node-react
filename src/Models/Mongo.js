const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Mongo1Schema = new Schema({
  name: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
});

const Mongo1 = mongoose.model("Gnote", Mongo1Schema);

module.exports = Mongo1;
