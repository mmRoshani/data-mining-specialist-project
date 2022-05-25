let SubCategory = require("../../models/SubCategory")
let Product = require("../../models/Products")
let sellerServices = require("../../Services/seller.Services.js/seller.service")
let Request = require("../../helpers/request")
let SubRoutesEnum = require("../../DataStructures/DK_SubRoutes.enum")


const _providerChecker = (shipmentMethodDescription) => shipmentMethodDescription === "موجود در انبار دیجی‌کالا"

async function productExtractor(data){
    let products = []
    let result
    subCategoryCode = data.code
    let page = 1
    if (data.page)
        page = data.page

    //
    await productExtractorByProviderAndSubCategories(data)
    //

    let _subCategory = await SubCategory.findOne({code: subCategoryCode}).exec()

    if(!_subCategory || page > 100){
        return "Error> You must go through fist page one more time or the page number is higher than 100"
    }

    request = new Request(SubRoutesEnum.SUB_CATEGORY);
    requestResult = await request.get(`${subCategoryCode}/search/?page=${page}`)
    products = requestResult.data.data.products

    const _productAdder = async () => {
        await products.forEach(async item => {
            let _product = await Product.findOne({DK_ID: item.id}).catch(err => console.log(err))

            if (!_product){

                const newProduct = new Product({
                    modify_date: Date.now(),
                    DK_ID: item.id,
                    DK_Provider: _providerChecker(item.default_variant.shipment_methods.description),
                    subCategory: _subCategory._id,
                    warranty: {
                        DK_ID: item.default_variant.warranty.id,
                        ...item.default_variant.warranty
                    },
                    seller: await sellerServices.sellerExistence(item.default_variant.seller),
                    ...item
                })
                await newProduct.save().catch(err => console.log(err))
            }
        })
    }

    await _productAdder()
        .then(async data => {
            result = await Product.find({}).sort({'DK_ID': +1}).limit((page*20)).exec()
        })
        .catch(err=> {
            result = err
        })

    return result
}

async function productExtractorByProviderAndSubCategories(data){
    let products = []
    let result = []
    let page = 1;
    subCategoryCode = data.code
    let _subCategory = await SubCategory.findOne({code: subCategoryCode}).exec()

    if(!_subCategory || page > 100){
        return "Error> You must go through fist page one more time or the page number is higher than 100"
    }

    for (page; page<=100; page ++ ){
        request = new Request(SubRoutesEnum.PROVIDERS_PRODUCTS);
        requestResult = await request.get(`?category_code=${subCategoryCode}&page=${page}`)
        products = requestResult.data.data.products

        const _productAdder = async () => {
            await products.forEach(async item => {
                let _product = await Product.findOne({DK_ID: item.id}).catch(err => console.log(err))

                if (!_product){
                    const newProduct = new Product({
                        modify_date: Date.now(),
                        DK_ID: item.id,
                        DK_Provider: _providerChecker(item.default_variant.shipment_methods.description),
                        subCategiry: _subCategory,
                        warranty: {
                            DK_ID: item.default_variant.warranty.id,
                            ...item.default_variant.warranty
                        },
                        seller: await sellerServices.sellerExistence(item.default_variant.seller),
                        ...item
                    })
                    await newProduct.save().catch(err => console.log(err))
                }
            })
        }
        await _productAdder()
            .catch(err=> {
                result = err
            })

    }
}


module.exports ={
    productExtractor,
    productExtractorByProviderAndSubCategories
}