const express = require("express");
const axios = require("axios");
const router = express.Router();

router.get("/", async (req, res) => {
  let response = null;
  new Promise(async (resolve, reject) => {
    try {
      response = await axios.get(
        "https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest",
        {
          headers: {
            "X-CMC_PRO_API_KEY": "0d8a0a01-3b3a-4c41-8b7e-185101dbbe5f",
          },
        }
      );
    } catch (ex) {
      response = null;
      // error
      console.log(ex);
      reject(ex);
    }
    if (response) {
      // success
      const json = response.data;
      res.json(json);
      resolve(json);
    }
  });

  // const showData = await Post.find({})
  // res.json(showData)
});

router.get("/coin", async (req, res) => {
  let response = null;
  new Promise(async (resolve, reject) => {
    try {
      response = await axios.get(
        "https://pro-api.coinmarketcap.com/v1/fiat/map",
        {
          headers: {
            "X-CMC_PRO_API_KEY": "0d8a0a01-3b3a-4c41-8b7e-185101dbbe5f",
          },
        }
      );
    } catch (ex) {
      response = null;
      // error
      console.log(ex);
      reject(ex);
    }
    if (response) {
      // success
      const json = response.data;
      res.json(json);
      resolve(json);
    }
  });

  // const showData = await Post.find({})
  // res.json(showData)
});

module.exports = router;
