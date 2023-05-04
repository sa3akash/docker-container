const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const app = express();
const session = require("express-session");
const redis = require("redis");
const RedisStore = require("connect-redis").default;

const {
  MONGO_USER,
  MONGO_PASSWORD,
  MONGO_IP,
  MONGO_PORT,
  MONGO_DB_NAME,
  REDIS_SEC,
  REDIS_IP,
  REDIS_PORT,
} = require("./config");
const router = require("./routes");

// session store
// 1. configure redis client
const redisClient = redis.createClient({
  url: `redis://${REDIS_IP}:${REDIS_PORT}`,
});

redisClient.connect().then(async (res) => {
    console.log("Redis DB connected");
  }).catch((err) => {
    console.log("err happened" + err);
});


// middleware
app.use(cors());
app.use(express.json());
// 2. configure session middleware
app.enable('trust proxy')
app.use(session({
    store: new RedisStore({ client: redisClient }),
    secret: REDIS_SEC,
    saveUninitialized: false,
    resave: false,
    cookie: {
      secure: false, // if true: only transmit cookie over https
      httpOnly: true, // if true: prevents client side JS from reading the cookie
      maxAge: 1000 * 60, // session max age in milliseconds
      sameSite: "lax", // make sure sameSite is not none
    },
  }));

// routes
app.use("/api/v1", router);

// error handlers

// mongoDB connection and server start code here
const port = process.env.PORT || 5000;
const mongoUrl = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/${MONGO_DB_NAME}?authSource=admin`;
mongoose.connect(mongoUrl);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("MongoDB connected...");
  app.listen(port, () => console.log(`server started on port ${port}`));
});
