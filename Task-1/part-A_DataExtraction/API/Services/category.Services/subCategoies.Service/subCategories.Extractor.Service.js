let Request = require("../../../helpers/request");
let SubRoutesEnum = require("../../../DataStructures/DK_SubRoutes.enum")
let Category = require("../../../models/Category");
let SubCategories = require("../../../models/SubCategory")

subCategoriesExtractor = async function (data){
    let subCategories = []
    let mainCategoryCode
    let mainCategory
    let result
    //find out witch category?
    request = new Request(SubRoutesEnum.SUB_CATEGORY);
    requestResult = await request.get(data.code + "/")
    mainCategoryCode = requestResult.data.data.category.code
    subCategories = requestResult.data.data.sub_categories

    mainCategory = await Category.findOne({code: mainCategoryCode})

    if (!mainCategory)
        return "You Have to Reload Category Page"

    const _dataExtractor = async () => {

        await subCategories.forEach(async element => {
            let _subCategory = await SubCategories.findOne({code: element.code})

            if (!_subCategory){
                let newSubCategory = new SubCategories({modify_date: Date.now(),DK_ID: element.id,mainCategory: mainCategory, ...element})
                await newSubCategory.save().catch(err => console.log(err))
            }
        })
    }

    await _dataExtractor()
        .then(async data => {
        result = await SubCategories.find({mainCategory: mainCategory._id}).exec()
    }).catch(err => result = err)

    return result
}

module.exports = {
    subCategoriesExtractor
}