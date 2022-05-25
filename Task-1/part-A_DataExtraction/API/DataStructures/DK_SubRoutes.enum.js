class SubRoutesEnum {

    static #_LANDING = "https://api.digikala.com/v1/"
    static #_SUB_CATEGORY = "https://api.digikala.com/v1/categories/"
    static #_PROVIDER_PRODUCTS = "https://api.digikala.com/v1/providers-products/"

    static get LANDING() { return this.#_LANDING; }
    static get SUB_CATEGORY() { return this.#_SUB_CATEGORY; }
    static get PROVIDERS_PRODUCTS() {return this.#_PROVIDER_PRODUCTS}
}

module.exports  = SubRoutesEnum
