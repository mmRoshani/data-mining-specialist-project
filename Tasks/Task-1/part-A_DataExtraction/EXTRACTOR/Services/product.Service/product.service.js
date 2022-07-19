let SubCategory = require("../../models/SubCategory");
let Product = require("../../models/Products");
let sellerServices = require("../../Services/seller.Services.js/seller.service");
let Request = require("../../helpers/request");
let SubRoutesEnum = require("../../DataStructures/DK_SubRoutes.enum");

const _providerChecker = function (shipmentMethodDescription) {
  return shipmentMethodDescription === "موجود در انبار دیجی‌کالا";
};

async function productExtractor(msg) {
  let messageData = JSON.parse(JSON.parse(msg.content.toString()).data);
  const subCategoryId = messageData.subCategoryId;
  console.log(`EnterProductExtractorFor: ${subCategoryId}`);
  let products = [];

  let _subCategory = await SubCategory.findById(subCategoryId).exec();

  if (!_subCategory) {
    return "subcategory not founded!";
  }
  /**
   * DON'T waste my server resource!
   */
  let relatedProductsCount = await Product.countDocuments({
    subCategory: _subCategory._id,
  }).exec();
  console.log(
    `Product count is more than 2000? ${relatedProductsCount >= 2000}`
  );
  if (relatedProductsCount <= 2000) {
    let pageCounter = 1;
    for (pageCounter; pageCounter <= 100; pageCounter++) {
      request = new Request(SubRoutesEnum.SUB_CATEGORY);
      requestResult = await request.get(
        `${_subCategory.code}/search/?page=${pageCounter}`
      );
      products = products.concat(requestResult.data.data.products);
    }

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
      .then(async function (data) {
        //provider-products
        await productExtractorByProviderAndSubCategories(subCategoryId)
          .then((_) => {
            console.log(`EndProductExtractionFor: ${subCategoryId}`);
          })
          .catch((err) => console.log(err));
      })
      .catch(function (err) {
        console.log(err);
      });
  } else {
    console.log(`no new Products found for: ${subCategoryId}`);
  }
}

async function productExtractorByProviderAndSubCategories(subCategoryId) {
  let products = [];
  let _subCategory = await SubCategory.findById(subCategoryId).exec();

  if (!_subCategory) {
    return "subcategory not founded!";
  }
  let page = 1;
  for (page; page <= 100; page++) {
    request = new Request(SubRoutesEnum.PROVIDERS_PRODUCTS);
    requestResult = await request.get(
      `?category_code=${_subCategory.code}&page=${page}`
    );
    products = products.concat(requestResult.data.data.products);
  }

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
          subCategory: _subCategory,
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

module.exports = {
  productExtractor,
  productExtractorByProviderAndSubCategories,
};
