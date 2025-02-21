

const mongoose = require("mongoose");
let Schema = mongoose.Schema;

const placeSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
    set: (v) =>
      v === "  "
        ? "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Odisha_districts_map.svg/1200px-Odisha_districts_map.svg.png"
        : v,

    default:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Odisha_districts_map.svg/1200px-Odisha_districts_map.svg.png",
  },
  imagebn: {
    type: String,
    required: true,
    set: (v) =>
      v === "  "
        ? "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Odisha_districts_map.svg/1200px-Odisha_districts_map.svg.png"
        : v,

    default:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Odisha_districts_map.svg/1200px-Odisha_districts_map.svg.png",
  },
  dist: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  overview: {
    type: String,
    required: true,
  },
  historyAndSignificance: { type: String, required: true },
  tourismActivities: { type: String, required: true },
  howToReach: { type: String, required: true },
  bestTimeToVisit: { type: String, required: true },
  interestingFact: { type: String, required: true },
  nearbyattraction: { type: String, required: true },
});

const Place = mongoose.model("Place", placeSchema);

module.exports = Place;