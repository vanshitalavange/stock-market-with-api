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
function clickEventHandler() {
  var purchasePrice = Number(stockPurchasePrice.value);
  var quantityOfStock = Number(stockQuantity.value);
  var currentPriceOfStock = Number(currentPrice.value);

  if (
    stockName.value === "" ||
    stockPurchasePrice.value === "" ||
    stockQuantity.value === ""
  ) {
    output.textContent = "All the fields are mandatory";
  } else if (purchasePrice === 0 || quantityOfStock === 0) {
    output.textContent = "Value cannot be zero";
  } else {
    var previousValue = purchasePrice * quantityOfStock;
    var currentValue = currentPriceOfStock * quantityOfStock;

    var amount = (currentValue - previousValue).toFixed(4);
    var percentage = Math.abs(amount / previousValue).toFixed(4) * 100;

    if (amount > 0) {
      container.style.backgroundColor = "#10B981";
      output.textContent =
        "Yayyy! You have gained profit of " +
        Math.abs(percentage).toFixed(2) +
        "%. Your total profit is " +
        Math.abs(amount);
    } else if (amount < 0) {
      container.style.backgroundColor = "#EF4444";
      output.textContent =
        "Oops! You lost " +
        Math.abs(percentage).toFixed(2) +
        "%. Your total loss is " +
        Math.abs(amount);
    } else {
      output.textContent = "No profit, no loss";
    }
  }
}
stockName.addEventListener("input", searchResultsAndGetCurrentprice);
btnCheck.addEventListener("click", clickEventHandler);
