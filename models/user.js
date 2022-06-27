const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const { ObjectId } = mongoose.Schema;

const saltRound = 10;

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: "Name is required" },
    email: { type: String, required: true },
    password: { type: String, required: true },
    phone: String,
    username: String,
    resetToken: String,
    expireToken: Date,
    uuid: { type: String, unique: true },
    subscriptions: [{ type: ObjectId, ref: "Channel" }],
    balance: { type: Number, default: 0 },
    wallet: [{ type: ObjectId, ref: "Wallet" }],
  },
  { timestamps: true }
);

userSchema.pre("save", function (next) {
  var user = this;

  if (!user.isModified("password")) return next();
  bcrypt.hash(user.password, saltRound, function (err, hash) {
    if (err) return next(err);
    user.password = hash;
    next();
  });
});

userSchema.methods.comparePassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model("User", userSchema);
