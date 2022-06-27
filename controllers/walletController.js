const Wallet = require("../models/wallet");
const User = require("../models/user");

// exports.addMomo = async (req, res) => {
//   try {
//     const user = await User.findByIdAndUpdate(req.user);
//     const txtId = uuid();
//     let network = (await getNetwork(user.phone)).toString();
//     console.log(user.email);
//     // let phoneNumber = user.phone.toString();

//     // phoneNumber = phoneNumber.substring(1);
//     // phonNumber = "+233" + phoneNumber;

//     // console.log(phonNumber);

//     let wallet = new Wallet({
//       txt_id: txtId,
//       user: user._id,
//       amount: req.body.amount,
//       txt_type: "deposit",
//       txt_status: "pending",
//       txt_payment: "mobile",
//       network: network,
//     });

//     await user.wallet.push(wallet._id);

//     await user.save();
//     await wallet.save();

//     // const payload = {
//     //   key: process.env.PAY_PUB_KEY,
//     //   email: user.email,
//     //   amount: req.body.amount * 100,
//     //   ref: txtId,
//     //   currency: "GHS",
//     // };

//     // console.log(payload.voucher);

//     return res.json({ success: true, message: "Payment Init" });
//   } catch (error) {
//     return res.status(500).json({ success: false, message: error });
//   }
// };

// exports.confirmTransact = async (req, res) => {
//   try {
//   } catch (error) {
//     return res.status(500).json({ success: false, message: error });
//   }
// };

// getNetwork((phone) => {
//   let number = phone.substring(2, 3);
//   var network = "";
//   if (getNetwork === "0") {
//     network = "VODAFONE";
//     return network;
//   }

//   if (getNetwork === "4" || getNetwork === "5" || getNetwork === "9") {
//     network = "MTN";
//     return network;
//   }

//   if (getNetwork === "6" || getNetwork === "7") {
//     network = "AIRTELTIGO";
//     return network;
//   }
// });
