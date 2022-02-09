const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

// routes
const authRoutes = require("./routes/authRoute");
const userRoutes = require("./routes/userRoute");
const videoRoutes = require("./routes/videoRoutes");
const channelRoutes = require("./routes/channelRoute");

// initialize
const app = express();
require("./database");

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use("/api", videoRoutes);
app.use("/api", channelRoutes);

// server
app.listen(process.env.PORT, () => {
  console.log(`Server live on port: ${process.env.PORT}`);
});
