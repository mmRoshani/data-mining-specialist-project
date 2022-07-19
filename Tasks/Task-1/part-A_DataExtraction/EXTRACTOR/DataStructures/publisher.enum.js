class PublisherEnum {
  static #_EXCHANGE = "DK.EXCHANGE";

  static #_QUEUE_PRODUCT = "DK.PRODUCT";
  static #_ROUTING_PRODUCT = "PRODUCT";

  static #_QUEUE_COMMENT = "DK.COMMENT";
  static #_ROUTING_COMMENT = "COMMENT";

  static #_QUEUE_ALL_COMMENT_SUB_CATEGORY = "DK.ALL_COMMENT";
  static #_ROUTING_ALL_COMMENT_SUB_CATEGORY = "ALL_COMMENTS";

  static get EXCHANGE() {
    return this.#_EXCHANGE;
  }
  static get QUEUE_PRODUCT() {
    return this.#_QUEUE_PRODUCT;
  }
  static get ROUTING_PRODUCT() {
    return this.#_ROUTING_PRODUCT;
  }

  static get QUEUE_COMMENT() {
    return this.#_QUEUE_COMMENT;
  }
  static get ROUTING_COMMENT() {
    return this.#_ROUTING_COMMENT;
  }

  static get QUEUE_ALL_COMMENT_SUB_CATEGORY() {
    return this.#_QUEUE_ALL_COMMENT_SUB_CATEGORY;
  }
  static get ROUTING_ALL_COMMENT_SUB_CATEGORY() {
    return this.#_ROUTING_ALL_COMMENT_SUB_CATEGORY;
  }
}

module.exports = PublisherEnum;
