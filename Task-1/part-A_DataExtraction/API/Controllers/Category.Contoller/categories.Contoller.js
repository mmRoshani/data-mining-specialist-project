let express = require("express");
let router = express.Router();
let Request = require("../../helpers/request");
let Category = require("../../models/Category");
let categoryServices = require("../../Services/category.Services/category.Services");
router.get("/", async function (req, res, next) {
  res.json(await categoryServices.compareMain_DK_Route());
});


router.get("/main/electronic-devices", async function (req, res, next) {
  request = new Request("https://api.digikala.com/v1/categories/");
  data = await request.get("electronic-devices/");
  res.json(data);
});

router.get("/main/vehicles", async function (req, res, next) {
  request = new Request("https://api.digikala.com/v1/categories/");
  data = await request.get("vehicles/");
  res.json(data);
});

router.get("/main/apparel", async function (req, res, next) {
  request = new Request("https://api.digikala.com/v1/categories/");
  data = await request.get("apparel/");
  res.json(data);
});
router.get("/main/mother-and-child", async function (req, res, next) {
  request = new Request("https://api.digikala.com/v1/categories/");
  data = await request.get("mother-and-child/");
  res.json(data);
});

router.get("/main/food-beverage", async function (req, res, next) {
  request = new Request("https://api.digikala.com/v1/categories/");
  data = await request.get("food-beverage/");
  res.json(data);
});

router.get("/main/personal-appliance", async function (req, res, next) {
  request = new Request("https://api.digikala.com/v1/categories/");
  data = await request.get("personal-appliance/");
  res.json(data);
});
router.get("/main/home-and-kitchen", async function (req, res, next) {
  request = new Request("https://api.digikala.com/v1/categories/");
  data = await request.get("home-and-kitchen/");
  res.json(data);
});
router.get("/main/rural-products", async function (req, res, next) {
  request = new Request("https://api.digikala.com/v1/categories/");
  data = await request.get("rural-products/");
  res.json(data);
});

module.exports = router;
