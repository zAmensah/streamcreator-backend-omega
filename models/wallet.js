const mongoose = require("mongoose");

const { ObjectId } = mongoose.Schema;

const walletSchema = new mongoose.Schema(
  {
    txt_id: String,
    user: { type: ObjectId, ref: "User" },
    amount: Number,
    txt_type: { type: String, enum: ["deposit", "withdraw"] },
    txt_status: { String, enum: ["pending", "success", "failed"] },
    txt_payment: String, // mobile money or bank
    provider: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Wallet", walletSchema);
