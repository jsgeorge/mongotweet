const User = require("../models/user");
const router = require("express").Router();
const mongoose = require("mongoose");
const { auth } = require("../middleware/auth");

router.get("/", auth, (req, res) => {
  res.status(200).json({
    isAdmin: req.user.role === 0 ? false : true,
    isAuth: true,
    email: req.user.email,
    name: req.user.name,
    lastname: req.user.lastname,
    username: req.user.username,
    images: req.user.images,
    role: req.user.role,
    likes: req.user.likes,
    following: req.user.following,
  });
});

router.post("/", (req, res) => {
  console.log(req.body);

  User.findOne({ email: req.body.email }, (err, user) => {
    if (!user){
      console.log("Wrong email. user not found")
      return res.json({
        loginSuccess: false,
        message: "Login failed, email not found",
      });
    }
    
    user.comparePassword(req.body.password, (err, isMatch) => {
      if (!isMatch) {
        console.log("wrong password");
        return res.json({
          loginSuccess: false,
          message: "Login failed. Wrong password",
        });
      }
      console.log("login successful");
      // res.status(200).json({
      //   loginSuccess: true
      // });
      user.generateToken((err, user) => {
        if (err) {
          return res.status(400).send(err);
        }
        // res.cookie("w_auth", user.token).status(200).json({
        //   loginSuccess: true,
        // });
        let currentUser = {
          _id: user._id,
          email: user.email,
          username: user.username,
          name: user.name,
          lastname: user.lastname,
          images: user.images,
        };

        res
          .status(200)
          .json({ loginSuccess: true, user: currentUser, token: user.token });
      });
    });
  });
});

module.exports = router;
