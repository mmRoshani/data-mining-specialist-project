class SubRoutesEnum {

    static #_LANDING = "https://api.digikala.com/v1/"
    static #_SUB_CATEGORY = "https://api.digikala.com/v1/categories/"

    static get LANDING() { return this.#_LANDING; }
    static get SUB_CATEGORY() { return this.#_SUB_CATEGORY; }
}

module.exports  = SubRoutesEnum
