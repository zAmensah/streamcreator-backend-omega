const mongoose = require("mongoose");
const slug = require("slug");
const { ObjectId } = mongoose.Schema;

const channelSchema = new mongoose.Schema({
  user: { type: ObjectId, ref: "User" },
  name: { type: String, required: true },
  slug: String,
  logo: String,
  cover: String,
  about: String,
  videos: [{ type: ObjectId, ref: "Video" }],
});

channelSchema.pre("save", function (next) {
  this.slug = slug(this.name, {
    replacement: "-",
    lower: true,
    charmap: slug.charmap,
  });
  next();
});

module.exports = mongoose.model("Channel", channelSchema);
