const User = require("../models/user");
const router = require("express").Router();
const mongoose = require("mongoose");
const formidable = require("express-formidable");
const { auth } = require("../middleware/auth");
const cloudinary = require("cloudinary");

router.get("/", auth, (req, res) => {
  User.find(
    { _id: { $ne: mongoose.Types.ObjectId(req.userid) } },
    (err, users) => {
      if (err) return res.status(400).send(err);
      res.status(200).json(users);
    }
  );
});

router.get("/id", (req, res) => {
  // console.log("get user query by id");
  const uid = req.query.id; //"5e87a4aeec5ce0255c8c4b98";
  //console.log("uid", uid);

  if (uid) {
    User.findOne({ _id: mongoose.Types.ObjectId(uid) }).exec((err, user) => {
      if (err) {
        console.log("error", err);
      }
      if (!user) {
        console.log("error", "no user found");
      }
      let tweetAuthor = {
        _id: user._id,
        username: user.username,
        lastname: user.lastname,
        name: user.name,
        images: user.images,
        following: user.following,
        likes: user.likes,
      };
      // console.log(
      //   uid,
      //   tweetAuthor.name,
      //   tweetAuthor.lastname,
      //   tweetAuthor.username
      // );
      res.status(200).json({ userdata: tweetAuthor });
    });
  } else {
    console.log("Error in fetching user");
    return res.status(301).json({ errors: { form: "User is undefined" } });
  }
});
router.post("/id", (req, res) => {
  //console.log("post user body by id");
  const uid = req.body.id; //"5e87a4aeec5ce0255c8c4b98";
  //console.log("uid", uid);
  if (uid) {
    User.findOne({ _id: mongoose.Types.ObjectId(uid) }).exec((err, user) => {
      if (err) {
        return res.status(301).json({ errors: { form: "User is not found" } });
      }
      if (!user) {
        return res.status(301).json({ errors: { form: "User is not found" } });
      }
      let currentUser = {
        _id: user._id,
        email: user.email,
        username: user.username,
        name: user.name,
        lastname: user.lastname,
        images: user.images,
        following: user.following,
        likes: user.likes,
      };
      // console.log(currentUser.lastname);
      res.status(200).json({ user: currentUser });
    });
  } else {
    console.log("Error in fetching user");
    return res.status(301).json({ errors: { form: "zUser is undefined" } });
  }
});

router.post("/", (req, res) => {
  User.findOne({ email: req.body.email }, function (err, existingUser) {
    if (existingUser) {
      return res
        .status(401)
        .json({ regSuccess: false, message: "Email already in use" });
    } else {
      let user = new User({
        email: req.body.email,
        password: req.body.password,
        username: req.body.username,
        name: req.body.name,
        lastname: req.body.lastname,
        likes: [],
        following: [],
      });
      user.save((err, doc) => {
        if (err)
          return res.status(401).json({
            regSuccess: false,
            message: "Unknown error",
          });
        res.status(200).json({
          regSuccess: true,
        });
      });
    }
  });
});
router.patch("/", auth, (req, res) => {
  console.log(req.body);
  User.findOneAndUpdate(
    { _id: req.userid },
    { $set: req.body },
    { new: true },
    (err, doc) => {
      if (err)
        return res.status(401).json({ editSuccess: false, message: err });
      res.status(200).json({
        editSuccess: true,
      });
    }
  );
});

// router.post("/addFav", (req, res) => {
//   console.log("/addFav");
//   console.log("uid", req.query.uid);
//   console.log("id", req.query.id);
//   User.findOneAndUpdate(
//     { _id: req.query.uid },
//     { $push: { favorites: { id: mongoose.Types.ObjectId(req.query.id) } } },
//     { new: true },
//     (err, doc) => {
//       if (err) return res.json({ success: false, err });
//       res.status(200).json({
//         editSuccess: true,
//       });
//     }
//   );
// });

// router.get("/delFav", (req, res) => {
//   console.log("/delFav");
//   console.log("uid", uid);
//   console.log("id", id);
//   User.findOneAndUpdate(
//     { _id: req.user.uid },
//     { $pull: { favorites: { id: mongoose.Types.ObjectId(req.query.id) } } },
//     { new: true },
//     (err, doc) => {
//       if (err) return res.json({ success: false, err });
//       res.status(200).json({
//         editSuccess: true,
//       });
//     }
//   );
// });

router.post("/follow", auth, (req, res) => {
  User.findOneAndUpdate(
    { _id: req.userid },
    { $push: { following: { id: mongoose.Types.ObjectId(req.query.id) } } },
    { new: true },
    (err, doc) => {
      if (err) return res.json({ success: false, err });
      res.status(200).json({
        editSuccess: true,
      });
    }
  );
});

router.post("/unfollow", auth, (req, res) => {
  User.findOneAndUpdate(
    { _id: req.userid },
    { $pull: { following: { id: mongoose.Types.ObjectId(req.query.id) } } },
    { new: true },
    (err, doc) => {
      if (err) return res.json({ success: false, err });
      res.status(200).json({
        editSuccess: true,
      });
    }
  );
});

router.get("/by_id", (req, res) => {
  let type = req.query.type;
  let items = req.query.id;
  if (type === "array") {
    let ids = req.query.id.split(",");
    items = [];
    items = ids.map((item) => {
      return mongoose.Types.ObjectId(item);
    });
  }

  User.find({ _id: { $in: items } })
    //Product.find({ _id: items })
    .populate("following")
    .populate("favorites")
    .exec((err, docs) => {
      return res.status(200).send(docs);
    });
});

router.get("/list", (req, res) => {
  User.find().exec((err, users) => {
    if (err) return res.status(400).send(err);
    res.status(200).send(users);
  });
});

// router.get("/logout", auth, (req, res) => {
//   User.findOneAndUpdate({ _id: req.user._id }, { token: "" }, (err, doc) => {
//     if (err) return res.json({ success: false, err });
//     return res.status(200).send({ success: true });
//   });
// });

router.post("/uploadimage", formidable(), (req, res) => {
  cloudinary.uploader.upload(
    req.files.file.path,
    (result) => {
      res.status(200).send({
        public_id: result.public_id,
        url: result.url,
      });
    },
    {
      public_id: `${Date.now()}`,
      resource_type: "auto",
    }
  );
});

module.exports = router;
