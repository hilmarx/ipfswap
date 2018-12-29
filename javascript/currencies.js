// Fetching and displaying available ERC20s
url = "https://ropsten-api.kyber.network/currencies"

// const sellForm = document.getElementById("sell-form");
// const buyForm = document.getElementById("buy-form");

const sellForm = document.getElementById("sellDropdown");
const buyForm = document.getElementById("buyDropdown");

function fetchCurrencies() {
  fetch(url)
    .then(response => response.json())
    .then((data) => {
      data.data.forEach((currency) => {
        // Input Currencies to buy
                  //<a href="#">EOS</a>
        let buyItem =  `<a href="#"name="${currency.name}" id="${currency.symbol}" value="${currency.address}">${currency.name} - (${currency.symbol})</a>`
        // let buyItem = `<input type="radio" name="buyItem" id="buy-${currency.symbol}" value="${currency.symbol}">${currency.name} - ${currency.symbol}<br>`;
        buyForm.insertAdjacentHTML("beforeend", buyItem);

        // Input Currencies to sell
        let sellItem =  `<a href="#" name="${currency.name}" id="${currency.symbol}" value="${currency.address}">${currency.name} - (${currency.symbol})</a>`
        // let sellItem = `<input type="radio" name="sellItem" id="sell-${currency.symbol}" value="${currency.symbol}">${currency.name} - ${currency.symbol}<br>`;
        sellForm.insertAdjacentHTML("beforeend", sellItem);
      });
  });
}

var currencyList = fetchCurrencies();


// Fetch the selected Tokens addresses

let addressToSell = "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee";
let addressToBuy = "0x4e470dc7321e84ca96fcaedd0c8abcebbaeb68c6";

/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */

function SellFunction() {
  document.getElementById("sellDropdown").classList.toggle("show");
}

function BuyFunction() {
  document.getElementById("buyDropdown").classList.toggle("show");
}


// Close the dropdown menu if the user clicks outside of it
window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
        // If the sell Dropdown is selected
        if (openDropdown.id == "sellDropdown") {
          console.log(event.target.attributes[3].value);
          addressToSell = `${event.target.attributes[3].value}`;

          // Refresh amounts
          // srcAmountHTML.value = 0;
          // destAmountHTML.value = 0;

          // Re-run getExpectedRate function for new address pair
          getExpectedRate()

          // Refresh Expected rate
          // displayExchangeRate();

          // Set Dropdown value to Token acronym
          document.getElementById("sell-button").innerText = `${event.target.attributes.name.value} - (${event.target.attributes.id.value})`;
          return addressToSell;
          // If the buy Dropdown is selected
        } else if (openDropdown.id == "buyDropdown") {
          console.log(event.target.attributes[3].value);
          addressToBuy = `${event.target.attributes[3].value}`;

          // Refresh amounts
          // srcAmountHTML.value = 0;
          // destAmountHTML.value = 0;


          // Re-run getExpectedRate function for new address pair
          getExpectedRate()

          // Refresh Expected rate
          // displayExchangeRate();

          // Set Dropdown value to Token acronym
          document.getElementById("buy-button").innerText = `${event.target.attributes.name.value} - (${event.target.attributes.id.value})`;
          return addressToBuy;
        } else {
          console.log("not working")
        }
      }
    }
  }
}

