const mongoose = require("mongoose");

const HintSchema = new mongoose.Schema({
  filmTitle: {
    type: String,
    required: true,
  },
  mood: {
    type: String,
    required: true,
  },
  platforms: {
    type: [String],
    required: true,
  },
});

module.exports = mongoose.model("hint", HintSchema);
