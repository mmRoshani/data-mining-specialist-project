let SubCategory = require("../../models/SubCategory");
let Product = require("../../models/Products");
let sellerServices = require("../../Services/seller.Services.js/seller.service");
let Request = require("../../helpers/request");
let SubRoutesEnum = require("../../DataStructures/DK_SubRoutes.enum");

const _providerChecker = function (shipmentMethodDescription) {
  return shipmentMethodDescription === "موجود در انبار دیجی‌کالا";
};

async function productExtractor(data) {
  let products = [];
  subCategoryCode = data.code;
  let page = 1;
  if (data.page) page = data.page;

  //
  await productExtractorByProviderAndSubCategories(data);
  //

  let _subCategory = await SubCategory.findOne({
    code: subCategoryCode,
  }).exec();

  if (!_subCategory) {
    return "subcategory not founded!";
  }
  if (page > 100) {
    return "bounder's error:data unavailable";
  }
  request = new Request(SubRoutesEnum.SUB_CATEGORY);
  requestResult = await request.get(`${subCategoryCode}/search/?page=${page}`);
  products = requestResult.data.data.products;

  const _productAdder = async function () {
    await products.forEach(async function (item) {
      let _product = await Product.findOne({ DK_ID: item.id }).catch(function (
        err
      ) {
        console.log(err);
      });

      if (!_product) {
        const newProduct = new Product({
          modify_date: Date.now(),
          DK_ID: item.id,
          DK_Provider: _providerChecker(
            item.default_variant.shipment_methods.description
          ),
          subCategory: _subCategory._id,
          warranty: {
            DK_ID: item.default_variant.warranty.id,
            ...item.default_variant.warranty,
          },
          seller: await sellerServices.sellerExistence(
            item.default_variant.seller
          ),
          ...item,
        });
        await newProduct.save().catch(function (err) {
          console.log(err);
        });
      }
    });
  };

  await _productAdder()
    .then(async function (data) {})
    .catch(function (err) {
      console.log(err);
    });
}

async function productExtractorByProviderAndSubCategories(data) {
  let products = [];
  let page = 1;
  subCategoryCode = data.code;
  let _subCategory = await SubCategory.findOne({
    code: subCategoryCode,
  }).exec();

  if (!_subCategory) {
    return "subcategory not founded!";
  }
  if (page > 100) {
    return "bounder's error:data unavailable";
  }
  for (page; page <= 100; page++) {
    request = new Request(SubRoutesEnum.PROVIDERS_PRODUCTS);
    requestResult = await request.get(
      `?category_code=${subCategoryCode}&page=${page}`
    );
    products = requestResult.data.data.products;

    const _productAdder = async function () {
      await products.forEach(async function (item) {
        let _product = await Product.findOne({ DK_ID: item.id }).catch(
          function (err) {
            console.log(err);
          }
        );

        if (!_product) {
          const newProduct = new Product({
            modify_date: Date.now(),
            DK_ID: item.id,
            DK_Provider: _providerChecker(
              item.default_variant.shipment_methods.description
            ),
            subCategiry: _subCategory,
            warranty: {
              DK_ID: item.default_variant.warranty.id,
              ...item.default_variant.warranty,
            },
            seller: await sellerServices.sellerExistence(
              item.default_variant.seller
            ),
            ...item,
          });
          await newProduct.save().catch(function (err) {
            console.log(err);
          });
        }
      });
    };
    await _productAdder().catch(function (err) {
      console.log(err);
    });
  }
}

module.exports = {
  productExtractor,
  productExtractorByProviderAndSubCategories,
};
