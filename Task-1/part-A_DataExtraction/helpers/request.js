class Request {
  constructor(mainUrl) {
    this.mainUrl = mainUrl;
    this.axios = require("axios");
  }

  get = async function (sunUrl = "", params = {}) {
    await this.axios
      .get(this.mainUrl + sunUrl, params)
      .then((response) => {
        this.data = response.data;
      })
      .catch((err) => console.log(err));
    return this.data;
  };

  post = async function (subUrl, bodyData) {

    await this.axios({
      method: "post",
      url: this.mainUrl + subUrl,
      data: {
        bodyData,
      },
    })
      .then((data) => console.log(data))
      .catch((err) => console.log(err));
  };
}

module.exports = Request;
