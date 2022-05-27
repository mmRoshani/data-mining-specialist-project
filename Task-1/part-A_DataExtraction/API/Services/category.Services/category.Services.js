let Category = require("../../models/Category");

const mainCategoriesExtractor = async () => {
  let result = await Category.find({})
    .exec()
    .catch((err) => console.log(err));

  return result;
};

module.exports = {
  mainCategoriesExtractor,
};
