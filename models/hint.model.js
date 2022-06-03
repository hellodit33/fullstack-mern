const mongoose = require("mongoose");

//Create schema and model for film hints
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
  synopsis: {
    type: String,
  },
  video: {
    type: String,
  },
});

module.exports = mongoose.model("hint", HintSchema);
