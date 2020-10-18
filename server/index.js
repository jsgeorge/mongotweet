const express = require("express");
const bodyParser = require("body-parser");
//const cookieParser = require("cookie-parser");
const cloudinary = require("cloudinary");
const mongoose = require("mongoose");
const path = require("path");

//Routes
const users = require("./routes/users");
const auth = require("./routes/auth");
const chats = require("./routes/chats");
const categories = require("./routes/categories");

const app = express();
//const async = require("async");

require("dotenv").config();

//Mongooose
mongoose.Promise = global.Promise;
// mongoose
//   .connect(
//     process.env.MONGODB_URI || "mongodb://localhost/react/mongodb/mongotweet"
//   )
//   .then(() => {})
//   .catch(() => {
//     console.log("Connection faild");
//   });
mongoose
  .connect(process.env.MONGODB_CONNSTR)
  .then(() => {})
  .catch((err) => {
    console.log("Connection failed", err);
  });
//bodypasrer
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//app.use(cookieParser());

app.use(express.static("client/build"));

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

//auth
app.use("/auth", auth);
//users
app.use("/users", users);
app.use("/register", users);
app.use("/users/id", users);
// app.use("/users/addFav", users);
// app.use("/users/delFav", users);
app.use("/users/follow", users);
app.use("/users/unfollow", users);
app.use("/users/byid", users);
app.use("/users/logout", users);
app.use("/users/uploadimage", users);

//chats
app.use("/chats", chats);
app.use("/chats/article", chats);
app.use("/chats/articles", chats);
app.use("/chats/articles_by_id", chats);
app.use("/chats/like", chats);
app.use("/chats/dislike", chats);
app.use("/chats/view", chats);
app.use("/chats/comment", chats);
app.use("/chats/update", chats);

//cattegories
app.use("/categories", categories);

//default
if (process.env.NODE_ENV === "production") {
  //Exprees will serve up production assets
  //app.use(express.static("client/build"));

  //Express serve up index.html file if it doesn't recognize route
  // app.get("*", (req, res) => {
  //   res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  // });
  // app.get("*", function (_, res) {
  //   res.sendFile(path.join(__dirname, "../client/build/index.html"), function (
  //     err
  //   ) {
  //     if (err) {
  //       res.status(500).send(err);
  //     }
  //   });
  // });
  app.get("/*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../client", "build", "index.html"));
  });
}

const port = process.env.PORT || 3002;

app.listen(port, () => {
  console.log(`server is running on ${port}`);
});
