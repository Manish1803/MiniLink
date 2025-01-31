const express = require("express");
const cors = require("cors");

// Routes
const authRoute = require("./routes/authRoutes");
const linkRoute = require("./routes/linkRoutes");
const redirectRoute = require("./routes/redirect");

const app = express();

app.use(express.json());
// Configure CORS
app.use(
  cors({
    origin: `${process.env.FRONTEND_URL}`,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);
app.options("*", cors());

app.use("/auth", authRoute);
app.use("/app", linkRoute);
app.use("/", redirectRoute);

module.exports = app;
