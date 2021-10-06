var stockName = document.querySelector("#stock-name");
var currentPrice = document.querySelector("#current-price");
const stockList = document.querySelector("#stock-list");
var stockPurchasePrice = document.querySelector("#stock-purchase-price");
var stockQuantity = document.querySelector("#stock-quantity");
var btnCheck = document.querySelector("#btn-check");
var output = document.querySelector("#output");
var container = document.querySelector(".input-container");
var searchURL =
  "https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=";
var currentPriceURL =
  "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=";

function getSearchURL() {
  return searchURL + stockName.value + "&apikey=8NT09YOGTVEE1ZHM";
}
function getCurrentPriceURL(symbolOfStock) {
  return currentPriceURL + symbolOfStock + "&apikey=8NT09YOGTVEE1ZHM";
}
