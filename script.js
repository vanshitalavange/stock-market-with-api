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
function searchResultsAndGetCurrentprice() {
  let symbolOfStock = "";
  fetch(getSearchURL())
    .then((response) => response.json())
    .then((json) => {
      for (let i = 0; i < json.bestMatches.length; i++) {
        var name = json.bestMatches[i];
        var stock = Object.values(name);
        const optionName = document.createElement("option");
        optionName.value = stock[1];
        stockList.appendChild(optionName);
        if (stockName.value === stock[1]) {
          symbolOfStock = stock[0];
        }
      }

      getCurrentPrice(symbolOfStock);
    });
}
function getCurrentPrice(symbolOfStock) {
  fetch(getCurrentPriceURL(symbolOfStock))
    .then((response) => response.json())
    .then((json) => {
      var timeseriesdaily = Object.values(json)[1];
      var current = Object.values(timeseriesdaily)[0];
      var price = Object.values(current)[3];
      currentPrice.value = price;
    });
}
