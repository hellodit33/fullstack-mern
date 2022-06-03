/**
 * import framework express
 */
const express = require("express");

/**
 * import cookieParser for login
 */
const cookieParser = require("cookie-parser");

/**
 * import user, post and hint routes which are different endpoints
 */
const userRoutes = require("./routes/user.routes");
const postRoutes = require("./routes/post.routes");
const hintRoutes = require("./routes/hint.routes");

/**
 * import dotenv to load environment variables from env file into process.env
 */
require("dotenv").config({ path: "./config/.env" });

/**
 * import db connect settings to connect to mongodb
 */
require("./config/db");

/**
 * import middleware for user's authentification
 */
const { checkUser, requireAuth } = require("./middleware/auth.middleware");

/**
 * import cors for secure cross-origin requests and data transfers between servers and browsers
 */
const cors = require("cors");

/**
 * for heroku deployment
 */
const path = require("path");

/**
 * init express
 */
const app = express();

/**
 * allowing our client URL (on heroku) to get data from our server, thanks to CORS
 */
const corsOptions = {
  origin: process.env.CLIENT_URL,
  credentials: true,
  allowedHeaders: ["sessionId", "Content-Type"],
  exposedHeaders: ["sessionId"],
  methods: "GET, HEAD, PUT, PATCH, POST, DELETE",
  preflightContinue: false,
};
app.use(cors(corsOptions));

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//jwt
app.get("*", checkUser);
app.get("/jwtid", requireAuth, (req, res) => {
  res.status(200).send(res.locals.user._id);
});

//routes
app.use("/api/user", userRoutes);
app.use("/api/post", postRoutes);
app.use("/api/hint", hintRoutes);

//heroku deployment
app.use(express.static(path.join(__dirname, "/client/build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/client/build", "index.html"));
});

//listening to server on available port from heroku or 5000 for localhost
app.listen(process.env.PORT || 5000, () => {
  console.log(`listening on port ${process.env.PORT}`);
});
