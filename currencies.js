// Fetching and displaying available ERC20s
url = "https://rinkeby-api.kyber.network/currencies"

const sellForm = document.getElementById("sell-form");
const buyForm = document.getElementById("buy-form");

function fetchCurrencies() {
  fetch(url)
    .then(response => response.json())
    .then((data) => {
      console.log(data);
      data.data.forEach((currency) => {
        // Input Currencies to buy
        console.log(currency);
        let buyItem = `<input type="radio" name="buyItem" id="buy-${currency.symbol}" value="${currency.symbol}">${currency.name} - ${currency.symbol}<br>`;
        buyForm.insertAdjacentHTML("beforeend", buyItem);

        // Input Currencies to sell
        let sellItem = `<input type="radio" name="sellItem" id="sell-${currency.symbol}" value="${currency.symbol}">${currency.name} - ${currency.symbol}<br>`;
        sellForm.insertAdjacentHTML("beforeend", sellItem);
      });
  });
}

var currencyList = fetchCurrencies();
