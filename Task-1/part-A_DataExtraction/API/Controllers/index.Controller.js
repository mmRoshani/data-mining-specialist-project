let express = require("express");
let router = express.Router();
let Product = require("../models/Products")
const {json} = require("express");
/* GET home page. */
router.get("/", async function (req, res, next) {
    let labels = []
    let value =  []
      let queryResult = await Product.aggregate([
          {
              $group: {
                  _id: {
                      $dateToString: {
                          format: "%Y-%m-%d (%H:%M:%S o'clock)",
                          date: "$modify_date"
                      }
                  },
                  count: {
                      $sum: 1
                  }
              }
          },
          {
              $sort: {
                  _id: 1
              }
          }
      ])

    await queryResult.forEach( element => {
        labels.push(element._id)
        value.push(element.count)
    })

  res.json({labels, value})
});

module.exports = router;
