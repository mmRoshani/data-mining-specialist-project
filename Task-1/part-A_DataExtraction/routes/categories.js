var express = require("express");
const { json } = require("express/lib/response");
var router = express.Router();
var Request = require("../helpers/request");

router.get("/", async function (req, res, next) {
  request = new Request("https://api.digikala.com/v1");
  data = await request.get("/categories/electronic-devices/");
  res.json(data);
});

module.exports = router;
