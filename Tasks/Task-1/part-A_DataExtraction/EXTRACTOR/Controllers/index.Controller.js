let express = require("express");
let router = express.Router();
const { json } = require("express");
/* GET home page. */
router.get("/", async function (req, res, next) {
  res.json({ "status": 200, "message": "Iam the number2 server" });
});

module.exports = router;
