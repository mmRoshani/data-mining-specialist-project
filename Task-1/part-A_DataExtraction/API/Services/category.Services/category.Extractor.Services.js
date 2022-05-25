let Category = require("../../models/Category");
let Request = require("../../helpers/request");
let SubRoutesEnum = require("../../DataStructures/DK_SubRoutes.enum");

async function mainCategoriesExtractor() {
  let categories = [];
  let result;
  request = new Request(SubRoutesEnum.LANDING);
  requestResult = await request.get();
  categories = requestResult.data.data.main_categories.categories;

  const _dataChecker = async () => {
    await categories.forEach(async (item) => {
      let _category = await Category.findOne({ code: item.code }).catch((err) =>
        console.log(err)
      );

      if (!_category) {
        const newCategory = new Category({
          modify_date: Date.now(),
          DK_ID: item.id,
          ...item,
        });
        await newCategory.save().catch((err) => console.log(err));
      }
    });
  };

  await _dataChecker()
    .then(async (data) => {
      result = await Category.find({}).exec();
    })
    .catch((err) => {
      result = err;
    });

  return result;
}

module.exports = {
  mainCategoriesExtractor,
};
