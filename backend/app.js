// Load environment config in dev
if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({ path: "config/.env" });
}

const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require("cors");
const ErrorHandler = require("./middleware/error");
const app = express();

// Middleware
//app.use("/uploads", express.static("uploads"));
//app.use(express.json());
app.use(cookieParser());
//app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json({ limit: "20mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "20mb" }));

// Enable CORS for frontend
app.use(
  cors({
    // origin: "http://localhost:3000",
    origin: [
      'https://eshop-eyuz.vercel.app',
    ],
    credentials:true,
})
);
// Health check
app.get("/test", (req, res) => {
  res.send("✅ Backend server is running");
});

// Import routes
const user = require("./controller/user");
const shop = require("./controller/shop");
const product = require("./controller/product");
const event = require("./controller/event");
const coupon = require("./controller/coupounCode");
const payment = require("./controller/payment");
const order = require("./controller/order");
const withdraw = require("./controller/withdraw");
const conversation = require("./controller/conversation");
const message = require("./controller/message");

// Mount routes
app.use("/api/v2/user", user);
app.use("/api/v2/shop", shop);
app.use("/api/v2/product", product);
app.use("/api/v2/event", event);
app.use("/api/v2/coupon", coupon);
app.use("/api/v2/payment", payment);
app.use("/api/v2/order", order);
app.use("/api/v2/withdraw", withdraw);
app.use("/api/v2/conversation", conversation);
app.use("/api/v2/message", message);

// Error Handler (must come last)
app.use(ErrorHandler);

module.exports = app;
