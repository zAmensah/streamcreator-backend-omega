const mongoose = require("mongoose");
const slug = require("slug");

const { ObjectId } = mongoose.Schema;

const channelSchema = new mongoose.Schema(
  {
    user: { type: ObjectId, ref: "User" },
    name: { type: String, required: true },
    slug: String,
    logo: String,
    cover: String,
    about: String,
    videos: [{ type: ObjectId, ref: "Video" }],
    subscribers: [{ type: ObjectId, ref: "Users" }],
  },
  {
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
    timestamps: true,
  }
);

channelSchema.virtual("totalViews").get(function () {
  var views = 0;
  if (this.videos.length == 0) {
    views = 0;
  } else {
    this.videos.map((view) => {
      views += view.views;
    });
  }
  return views;
});

channelSchema.virtual("totalLikes").get(function () {
  var likes = 0;
  if (this.videos.length == 0) {
    likes = 0;
  } else {
    this.videos.map((view) => {
      likes += view.likes;
    });
  }
  return likes;
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
