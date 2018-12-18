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
        let buyItem =  `<a href="#"name="buyItem" id="buy-${currency.symbol}" value="${currency.address}">${currency.symbol}</a>`
        // let buyItem = `<input type="radio" name="buyItem" id="buy-${currency.symbol}" value="${currency.symbol}">${currency.name} - ${currency.symbol}<br>`;
        buyForm.insertAdjacentHTML("beforeend", buyItem);

        // Input Currencies to sell
        let sellItem =  `<a href="#" name="sellItem" id="sell-${currency.symbol}" value="${currency.address}">${currency.symbol}</a>`
        // let sellItem = `<input type="radio" name="sellItem" id="sell-${currency.symbol}" value="${currency.symbol}">${currency.name} - ${currency.symbol}<br>`;
        sellForm.insertAdjacentHTML("beforeend", sellItem);
      });
  });
}

var currencyList = fetchCurrencies();

// Set variables based on User Selection


// 1. Select all ahrefs

// 2. Add an event listener that returns the src and dest addresses of the selected tokens


// currenciesToSell.addEventListener('onclick', returnTokenAddress())

// 3. Call the get-expected-rate function with these variables and display the results


// Show Dropdown when user clicks on button

  let addressToSell;
  let addressToBuy;

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
          if (openDropdown.value == "sellDropdown") {
            console.log(event.target.attributes[3].value);
            addressToSell = event.target.attributes[3].value
          } else {
            console.log(event.target.attributes[3].value);
            addressToBuy = event.target.attributes[3].value
          }
        }
      }
    }
  }


