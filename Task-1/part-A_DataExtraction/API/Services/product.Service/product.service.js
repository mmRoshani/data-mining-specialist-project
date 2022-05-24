let SubCategory = require("../../models/SubCategory");
let Product = require("../../models/Products")
let Request = require("../../helpers/request");
let SubRoutesEnum = require("../../DataStructures/DK_SubRoutes.enum")


async function productExtractor(data){
    let products = []
    let result
    subCategoryCode = data.code
    let page = 1
    if (data.page)
        page = data.page

    let _subCategory = await SubCategory.findOne({code: subCategoryCode}).exec()

    if(!_subCategory){
        return "You Must Go Througth Application One time"
    }

    request = new Request(SubRoutesEnum.SUB_CATEGORY);
    requestResult = await request.get(`${subCategoryCode}/search/?page=${page}`)
    products = requestResult.data.data.products

    const _productAdder = async () => {
        await products.forEach(async item => {
            let _product = await Product.findOne({DK_ID: item.id}).catch(err => console.log(err))
            if (!_product){
                const newProduct = new Product({modify_date: Date.now(),DK_ID: item.id,...item})
                await newProduct.save().catch(err => console.log(err))
            }
        })
    }

    await _productAdder()
        .then(async data => {
            result = await Product.find({}).sort({'DK_ID': +1}).limit((page*10)).exec()
        })
        .catch(err=> {
            result = err
        })

    return result
}

module.exports ={
    productExtractor
}