const mongoose = require("mongoose");
const slug = require("slug");
const { ObjectId } = mongoose.Schema;

const videoSchema = new mongoose.Schema({
  user: { type: ObjectId, ref: "User" },
  channel: { type: ObjectId, ref: "Channel" },
  title: { type: String, required: true },
  slug: String,
  description: String,
  link: String,
  cover: String,
  likes: { type: Number, default: 0 },
  views: { type: Number, default: 0 },
});

videoSchema.pre("save", function (next) {
  this.slug = slug(this.title, {
    replacement: "-",
    lower: true,
    charmap: slug.charmap,
  });
  next();
});

module.exports = mongoose.model("Video", videoSchema);
