const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const SALT_I = 10;
const SECRET_KEY = "SUPERSECRETPASSWORD123";
require("dotenv").config();

const userSchema = mongoose.Schema({
  email: {
    type: String,
    require: true,
    trim: true,
    unique: 1,
  },
  password: {
    type: String,
    require: true,
    minlength: 5,
  },
  name: {
    type: String,
    require: true,
    maxlength: 100,
  },
  lastname: {
    type: String,
    require: true,
    maxlength: 100,
  },
  username: {
    type: String,
    require: false,
    maxlength: 100,
  },
  likes: {
    type: Array,
    default: [],
  },
  following: {
    type: Array,
    default: [],
  },
  role: {
    type: Number,
    defaut: 0,
  },
  images: {
    type: Array,
    default: [],
  },
  token: {
    type: String,
  },
});

userSchema.pre("save", function (next) {
  var user = this;

  if (user.isModified("password")) {
    bcrypt.genSalt(SALT_I, function (err, salt) {
      if (err) return next(err);

      bcrypt.hash(user.password, salt, function (err, hash) {
        if (err) return next(err);
        user.password = hash;
        next();
      });
    });
  }
});

userSchema.methods.comparePassword = function (candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

userSchema.methods.generateToken = function (cb) {
  var user = this;

  const expiresIn = 24 * 60 * 60;

  //var token = jwt.sign(user._id.toHexString(), SECRET_KEY);
  var token = jwt.sign(
    {
      exp: expiresIn,
      id: user.id,
    },
    SECRET_KEY
  );
  user.token = token;
  // user.save(function(err, user) {
  //   if (err) return cb(err);
  //   cb(null, user);
  // });
  User.update({ _id: user._id }, user, function (
    err,
    numberAffected,
    rawResponse
  ) {
    if (err) return cb(err);
    cb(null, user);
  });
};

userSchema.statics.findByToken = function (token, cb) {
  var user = this;

  jwt.verify(token, SECRET_KEY, function (err, decode) {
    user.findOne({ _id: decode, token: token }, function (err, user) {
      if (err) return cb(err);
      cb(null, user);
    });
  });
};

const User = mongoose.model("User", userSchema);

module.exports = User;
