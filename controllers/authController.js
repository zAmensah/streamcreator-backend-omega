const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const random = require("random");

const User = require("../models/user");

const { sendEmail } = require("../helpers/nodemailer");
const {
  registerValidation,
  loginValidate,
} = require("../helpers/authValidate");

exports.register = async (req, res) => {
  const { error } = registerValidation(req.body);
  if (error)
    return res
      .status(400)
      .json({ success: false, message: error.details[0].message });

  try {
    const userExist = await User.findOne({ email: req.body.email });
    if (userExist)
      return res.status(401).json({
        success: false,
        message: `User with email ${req.body.email} already exist. Please try again`,
      });

    const dateString = new Date().toISOString().split("T")[0].replace(/-/g, "");
    const randomString = random.int((min = 100), (max = 999));

    const user = new User(req.body);
    user.uuid = dateString + randomString;
    await user.save();

    const token = await jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "2d",
    });
    res.json({
      success: true,
      message: "Registration Successful",
      token,
      user,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send(`Server error`);
  }
};

exports.login = async (req, res) => {
  const { error } = loginValidate(req.body);
  if (error)
    return res
      .status(400)
      .json({ success: false, message: error.details[0].message });

  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user)
      return res
        .status(400)
        .json({ success: false, message: "No user found. Please try again" });

    if (!user.comparePassword(password))
      return res
        .status(400)
        .json({ success: false, message: "No user found. Please try again" });

    const token = await jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "2d",
    });
    res.json({ success: true, message: "Login Successful", token, user });
  } catch (error) {
    console.error(error);
    return res.status(500).send(`Server error`);
  }
};

exports.forgotPassword = async (req, res) => {
  const { email } = req.body;
  if (!email)
    return res
      .status(400)
      .json({ success: false, message: "Valid email address is required" });

  try {
    const user = await User.findOne({ email });
    if (!user)
      return res
        .status(400)
        .json({ success: false, message: `User with ${email} does not exist` });

    const token = crypto.randomBytes(32).toString("hex");
    user.resetToken = token;
    user.expireToken = Date.now() + 3600000;

    await user.save();

    const href = `${process.env.CLIENT_URL}/${token}`;

    const mailOptions = {
      to: user.email,
      from: "Creators Stream",
      subject: "Hi there! Password reset request",
      html: `<p>Hello ${user.name.split(" ")[0].toString()},  </p>
        <p>There was a request for password reset.Click on link below to reset the password</p>
        <a href=${href}>${href}</a>
      <p>This token is valid for only 1 hour.</p>`,
    };

    sendEmail(mailOptions);

    return res.json({ success: true, message: "Email sent successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).send("Server Error");
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const { token, password } = req.body;

    if (!token)
      return res.status(401).json({ success: false, message: "Unauthorized" });

    const user = await User.findOneAndUpdate({ resetToken: token });

    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "User not found" });

    if (Date.now() > user.expireToken)
      return res
        .status(401)
        .json({ success: false, message: "Token expired. Request new one" });

    user.password = password;
    user.resetToken = "";
    user.expireToken = undefined;

    await user.save();
    return res.json({ success: true, message: "Password update successfull" });
  } catch (error) {
    console.error(error);
    return res.status(500).send("Server Error");
  }
};
