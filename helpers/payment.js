const paystack = require("paystack-api")(process.env.PAY_SEC_KEY);

exports.payment = async (payload) => {
  await paystack.customer
    .create()
    .then((payload) => console.log(payload))
    .catch((err) => console.log(err));
};

// const Flutterwave = require("flutterwave-node-v3");

// require("dotenv").config();

// const flw = new Flutterwave(
//   process.env.FLUTTER_PUB_KEY,
//   process.env.FLUTTER_SEC_KEY
// );

// exports.mobileGh = async (payload, res) => {
//   await flw.MobileMoney.ghana(payload)
//     .then((response) => {
//       console.log(response.meta.authorization.redirect);
//       return res.json({
//         success: true,
//         redirectLink: response.meta.authorization.redirect,
//       });
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// };

// exports.mobileGh = async (req, res) => {
//   try {
//     const response = await flw.MobileMoney.ghana(payload);
//     console.log(response);
//     return response;
//   } catch (error) {
//     return res.status(500).json({ success: false, message: error });
//   }
// };
