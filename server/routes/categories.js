const Category = require("../models/category");
const router = require("express").Router();
const mongoose = require("mongoose");

router.post("/", (req, res) => {
  const category = new Category(req.body);
  console.log(category);
  category.save((err, doc) => {
    if (err) return res.json({ success: false, err });
    res.status(200).json({
      success: true,
      category: doc,
    });
  });
});

router.get("/", (req, res) => {
  Category.find({})
    .sort([["name", "asc"]])
    .exec((err, categories) => {
      if (err) return res.status(400).send(err);
      res.status(200).json(categories);
    });
});

// router.get("/api/product/categories/id", (req, res) => {
//   let category = req.body.category;
//   console.log(category);

//   Category.find({ name: category }, (err, categories) => {
//     if (err) return res.status(400).send(err);
//     res.status(200).send(categories);
//   });
// });
module.exports = router;
