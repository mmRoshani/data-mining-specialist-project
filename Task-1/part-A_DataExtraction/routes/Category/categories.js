var express = require("express");
var router = express.Router();
var Request = require("../../helpers/request");
var Category = require("../../models/Category")

router.get("/", async function (req, res, next) {
  categories = await  Category.find({}).exec()
  // res.send(categories)
  res.render("categories", {title: "MAIN CATEGORIES",categories: categories});
});

router.get("/electronic-devices", async function (req, res, next) {
  request = new Request("https://api.digikala.com/v1/categories/");
  data = await request.get("electronic-devices/");
  res.json(data);
});


router.get("/vehicles", async function (req, res, next) {
  request = new Request("https://api.digikala.com/v1/categories/");
  data = await request.get("vehicles/");
  res.json(data);
});

router.get("/apparel", async function (req, res, next) {
  request = new Request("https://api.digikala.com/v1/categories/");
  data = await request.get("apparel/");
  res.json(data);
});
router.get("/mother-and-child", async function (req, res, next) {
  request = new Request("https://api.digikala.com/v1/categories/");
  data = await request.get("mother-and-child/");
  res.json(data);
});

router.get("/food-beverage", async function (req, res, next) {
  request = new Request("https://api.digikala.com/v1/categories/");
  data = await request.get("food-beverage/");
  res.json(data);
});

router.get("/personal-appliance", async function (req, res, next) {
  request = new Request("https://api.digikala.com/v1/categories/");
  data = await request.get("personal-appliance/");
  res.json(data);
});
router.get("/home-and-kitchen", async function (req, res, next) {
  request = new Request("https://api.digikala.com/v1/categories/");
  data = await request.get("home-and-kitchen/");
  res.json(data);
});
router.get("/rural-products", async function (req, res, next) {
  request = new Request("https://api.digikala.com/v1/categories/");
  data = await request.get("rural-products/");
  res.json(data);
});

module.exports = router;
