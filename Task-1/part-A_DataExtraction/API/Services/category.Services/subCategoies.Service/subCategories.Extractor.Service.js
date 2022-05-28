let SubCategories = require("../../../models/SubCategory");
let Category = require("../../../models/Category");

subCategoriesExtractor = async function (data) {
  let result;

  let mainCategory = await Category.findOne({ code: data.code });

  result = await SubCategories.find({
    mainCategory: mainCategory._id,
  }).exec();

  return result;
};

module.exports = {
  subCategoriesExtractor,
};
