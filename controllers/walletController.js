var express = require('express');
var app = express();
const { hdkey } = require('ethereumjs-wallet');
var etherHDkey=hdkey;
const Binance = require('binance-api-node').default;
const client = Binance()

const sendResponse = require('../helper/responseSender');



const coinStatesInGraph = async function (req, res) {
    let shortcode = req.body.shortcode;
    let timeInterval = req.body.timeInterval;

    let finalCoin = shortcode + "USDT";
    console.log("finalCoin", finalCoin);

    if (timeInterval == '') {
      timeInterval = '1d';
    }
    try {
  
      let details = await client.candles({ symbol: finalCoin }, { interval: timeInterval });
      for (let i = 0; i < details.length; i++) {
        details[i].open = parseFloat(details[i].open);
        details[i].high = parseFloat(details[i].high);
        details[i].low = parseFloat(details[i].low);
        details[i].close = parseFloat(details[i].close);
        details[i].openTime = (details[i].openTime).toString();
        details[i].closeTime = (details[i].closeTime).toString();
      }
  
      // let convertedDetails=await convertTimeandInt(details);
      //  console.log(details);
      return sendResponse(res, 200, { status: true, data: details, message: 'data sent' });
    } catch (err) {
      console.log(err);
      return sendResponse(res, 500, { status: false, message: "something went wrong" });
    }
}

module.exports = {
    coinStatesInGraph
};  