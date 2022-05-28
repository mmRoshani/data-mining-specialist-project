let mongoose = require("mongoose");

let Schema = mongoose.Schema;

let Products = new Schema({
  DK_ID: Number,
  title_fa: String,
  title_en: String,
  url: {
    base: String | null,
    uri: String,
  },
  cpc: Object | null,
  image: {
    storage_ids: Object | null,
    url: Array | null,
    thumbnail_url: String | null,
    temporary_id: String | null,
    webp_url: Array | null,
    main:
      {
        storage_ids: Array | null,
        url: Array | null,
        thumbnail_url: String | null,
        temporary_id: String | null,
      } | null,
  },
  status: String,
  has_quick_view: Boolean,
  digiplus: Object,
  data_layer: Object,
  rating:
    {
      rate: Number | null,
      count: Number | null,
    } | null,
  default_variant: {
    id: Number | null,
    lead_time: Number | null,
    rank: Number | null,
    rate: Number | null,
    warranty:
      {
        DK_ID: Number,
        title_fa: String,
        title_en: String | null,
      } | null,
    seller:
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "sellers",
      } | null,
    statistics: String | Number | null,
    properties:
      {
        is_fast_shipping: Boolean,
        is_ship_by_seller: Boolean,
        is_multi_warehouse: Boolean,
        has_similar_variants: Boolean,
        in_digikala_warehouse: Boolean,
      } | null,
    digiplus:
      {
        services: Array | null,
        is_jet_eligible: Boolean | null,
        cash_back: Number | null,
        is_general_location_jet_eligible: Boolean | null,
      } | null,
    size: {
      id: Number,
      title: String,
    },
    color:
      {
        id: Number | null,
        title: String | null,
        hex_code: String | null,
      } | null,
    digiclub:
      {
        point: Number | null,
      } | null,
    price:
      {
        selling_price: Number | null,
        rrp_price: Number | null,
        order_limit: Number | null,
        is_incredible: Boolean | null,
        is_promotion: Boolean | null,
        is_locked_for_digiplus: Boolean | null,
        discount_percent: Number | null,
      } | null,
    shipment_methods:
      {
        description: String | null,
        has_lead_time: Boolean | null,
        providers:
          [
            {
              title: String | null,
              description: String | null,
              has_lead_time: Boolean | null,
              type: String | null,
            },
          ] | null,
      } | null,
  },
  properties: {
    is_fast_shipping: Boolean | null,
    is_ship_by_seller: Boolean | null,
    is_multi_warehouse: Boolean | null,
    is_fake: Boolean | null,
    has_gift: Boolean | null,
    min_price_in_last_month: Number | null,
    is_non_inventory: Boolean | null,
    is_ad: Boolean | null,
    is_jet_eligible: Boolean | null,
    is_medical_supplement: Boolean | null,
  },
  badges: Array | null,
  colors: Array | null,
  subCategory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "sub_categories",
  },
  DK_Provider: Boolean,
  modify_date: Date,
});

module.exports = mongoose.model("products", Products);
