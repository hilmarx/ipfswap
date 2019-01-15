// ##############Variable Declaration#####################

// ###Fetching and displaying available ERC20s###

// If user switched to ropsten network, we fetch the query string and fetch the ropsten specific kyber data
let selectedEthereumNetwork;

// Navbar menu to select ethereum mainnet or ropsten testnet
navbarMenu = document.getElementById('navbar-menu')

// Create a string with the params of the URL
const urlParams = new URLSearchParams(location.search);


// If ropsten is in query string, change selectedEhtereumNetwork to ropsten, otherwise use mainnet
if (urlParams.get("network") == "ropsten") {

  selectedEthereumNetwork = "ropsten";
  // Change inner Text of Mainnet div
  navbarMenu.innerText = "Ropsten Testnet";
  navbarMenu.insertAdjacentHTML("beforeend", `<ul class="dropdown-menu dropdown-menu-right navbar-dropdown-menu"> <li><a href="#" id="networkSwitch">Mainnet</a></li> </ul>`);

} else {

 selectedEthereumNetwork = "mainnet";
 // Change inner Text of Mainnet div
}

// Create url variable, which will be used to insert the given Kyber Network API based on the chosen network
let url;

// By default, address to sell will be ETH (Same for ropsten and mainnet)
let addressToSell = "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee";

let addressToBuy;

// ##### Function that reloads page with or without query string that determines the network #####
function reloadPage() {

  if (selectedEthereumNetwork == "mainnet") {

    window.location.href="?network=ropsten";

  } else if (selectedEthereumNetwork == "ropsten") {

    // Fetch the query string (if present) from window search bar, erase it and open new url
    const newUrl = window.location.href.replace(location.search, "");
    window.open(newUrl, "_self");
  }

}

// Add event listener to Mainnet Button to detect the user switchting to Ropsten and back

networkSwitch = document.getElementById('networkSwitch');

// ### NETWORK SWITCH EVENT LISTENER ###

networkSwitch.addEventListener('click', reloadPage);

function fetchApiFromSelectedNetwork() {
  // If selected Network is Mainnet
  if (selectedEthereumNetwork == "mainnet") {
    // Kyber Network ERC20 mainnet address
    addressToBuy = "0xdd974d5c2e2928dea5f71b9825b8b646686bd200";
  } else if (selectedEthereumNetwork = "ropsten" ) {
    // Kyber Network ERC20 ropstem address
    addressToBuy = "0x4e470dc7321e84ca96fcaedd0c8abcebbaeb68c6";
  };
}

// When document loads, fetch mainnet API
fetchApiFromSelectedNetwork();

const sellForm = document.getElementById("sellDropdown");
const buyForm = document.getElementById("buyDropdown");

// Array to input individual token data from KyberAPI call
const currencyArray = [];
let item1;

// Mainet ERC20 addresses to fetch the images even if user selects ropsten
const mainnetAddresses = {};

// Assign currently selected src and dest token symbols

let srcSymbol = "ETH";
let destSymbol = "KNC";

// Assign currently selected src and dest names

let srcName = "Ethereum";
let destName = "KyberNetwork"

// Set default source Token Decimal number to 10^18
let srcQuantity = "1000000000000000000";

// Select the two token logos

const sellLogo = document.getElementById('sell-logo');
const buyLogo = document.getElementById('buy-logo');

// Function to change the image to default no image available image if Trust Wallet Api returns 404

function noImageSell() {
  sellLogo.src = "images/no-image.png"
}

function noImageBuy() {
  buyLogo.src = "images/no-image.png"
}

// Event listener to change image to no-image.png is nothing is fetched

sellLogo.addEventListener("error", noImageSell)
buyLogo.addEventListener("error", noImageBuy)


// ######################Functions#############################

// To display the Tokens in an alphabetical order, the fetchCurrencies function needs to only fetch the available names of the tokens wheras a seperate function createCurrencyList will create the necessary HTML Tags

// Create HTML tags to display currencies to user through the list

function createHtmlTags() {
  currencyArray.forEach((currencyArray) => {
    // Input Currencies to buy
    let currencyTag = `<a href="#"name="${currencyArray[0]}" data-decimal="${currencyArray[3]}" id="${currencyArray[1]}" value="${currencyArray[2]}">${currencyArray[0]} - (${currencyArray[1]})</a>`
    buyForm.insertAdjacentHTML("beforeend", currencyTag);
    sellForm.insertAdjacentHTML("beforeend", currencyTag);
  })
}

// Fetch currencies from KyberAPI and store sorted in currencyArray Array. Then call createHtmlTags function


function fetchCurrencies() {
  fetch("https://api.kyber.network/currencies")
    .then(response => response.json())
    .then((data) => {
      data.data.forEach((currency) => {
        if (selectedEthereumNetwork == "mainnet") {
          item = [currency.name, currency.symbol, currency.address, currency.decimals]
          currencyArray.push(item);
        }
        mainnetAddresses[currency.symbol] = currency.address;
      });
    })
    .then((result) => {
      if (selectedEthereumNetwork == "ropsten") {
        fetch("https://ropsten-api.kyber.network/currencies")
          .then(response => response.json())
          .then((data) => {
            data.data.forEach((currency) => {
              item = [currency.name, currency.symbol, currency.address, currency.decimals]
              currencyArray.push(item);
            });
          })
          .then((result) => {
            currencyArray.sort();
            createHtmlTags();
        });
      }
      currencyArray.sort();
      createHtmlTags();
  });
}

fetchCurrencies();




/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */

function SellFunction() {
  document.getElementById("sellDropdown").classList.toggle("show");
}

function BuyFunction() {
  document.getElementById("buyDropdown").classList.toggle("show");
}


// Close the dropdown menu if User selects a token from dropdown
window.onclick = function(event) {
  // ############# SWAP TOKEN Information ###################
  if (event.target.className == "swap-image") {
    console.log("I am in")

    // Set src Token Symbol
    let swappedSrcSymbol = destSymbol
    let swappedDestSymbol = srcSymbol
    destSymbol = swappedDestSymbol;
    srcSymbol = swappedSrcSymbol;
    console.log(`Dest Symbol: ${destSymbol}`)
    console.log(`Src Symbol: ${srcSymbol}`)

    // Find token address of selected token from mainnetAddresses hash
    let sellTokenImageUrl = mainnetAddresses[srcSymbol];
    // Find token address of selected token from mainnetAddresses hash
    let buyTokenImageUrl = mainnetAddresses[destSymbol];
    // Find token address of selected token from mainnetAddresses hash

    console.log(`sellTokenImageUrl: ${sellTokenImageUrl}`);

    // Set token-logo for token to buy. If it is ETH, then use local image
    (destSymbol == "ETH") ? buyLogo.src = "images/ethereum.png" : buyLogo.src = `https://raw.githubusercontent.com/TrustWallet/tokens/master/tokens/${buyTokenImageUrl}.png`;
    // Set token-logo for token to sell. If it is ETH, then use local image
    (srcSymbol == "ETH") ? sellLogo.src = "images/ethereum.png" : sellLogo.src = `https://raw.githubusercontent.com/TrustWallet/tokens/master/tokens/${sellTokenImageUrl}.png`;

    // Set token address which the user wants to buy
    let swappedAddressToBuy = addressToSell;
    let swappedAddressToSell = addressToBuy;
    addressToSell = swappedAddressToSell;
    addressToBuy = swappedAddressToBuy;

    // Re-run getExpectedRate function for new address pair & wait for the promise to resolve. Then update the numbers in the dest field
    getExpectedRate()
    .then((response) => {
      updateDestValue();
    })

    swappedDestName = srcName
    swappedSrcName = destName
    srcName = swappedSrcName;
    destName = swappedDestName;

    // Set Dropdown value to Token acronym
    document.getElementById("buy-button").innerText = `${destName} - (${destSymbol})`;

    // Set Dropdown value to Token acronym
    document.getElementById("sell-button").innerText = `${srcName} - (${srcSymbol})`;

    // Set buy-symbol to destSymbol
    document.getElementById('buy-symbol').innerText = destSymbol

    // Set sell-symbol Symbol to srcSy,bol
    document.getElementById('sell-symbol').innerText = srcSymbol


    // Set sell-symbol Symbol to srcSybol
    document.getElementById('sell-symbol').innerText = srcSymbol

  }

  // ############# TOKEN SELECTION ###################

  // If User clicks on Search bar, do not close the window
  if (event.target.id == "sellSearch" || event.target.id == "buySearch") return 0;
  console.log("1")
  // Check condition if User pressed anything else than the image or the title of the token
  if (event.target.parentElement.id != "sell-content" && event.target.parentElement.id != "buy-content"){
    console.log("2")
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
        console.log("3")

        // If the sell Dropdown is selected
        if (openDropdown.id == "sellDropdown") {
          console.log("now")
          // Set src Token Symbol
          srcSymbol = event.target.attributes.id.value;

          // Find token address of selected token from mainnetAddresses hash
          let sellTokenImageUrl = mainnetAddresses[srcSymbol];

          // Set token-logo for token to sell. If it is ETH, then use local image
          (srcSymbol == "ETH") ? sellLogo.src = "images/ethereum.png" : sellLogo.src = `https://raw.githubusercontent.com/TrustWallet/tokens/master/tokens/${sellTokenImageUrl}.png`;

          // Set new token address for getExpectedRate function
          addressToSell = `${event.target.attributes[4].value}`;

          // Get Source token decimal for GetExpectedRate function
          srcDecimal = event.target.dataset.decimal;

          // Calc srcQuantity with srcDecimal
          srcQuantity = `${10 ** srcDecimal}`;

          // Re-run getExpectedRate function for new address pair & wait for the promise to resolve. Then update the numbers in the src field
          getExpectedRate()
          .then((response) => {
            updateSrcValue();
          })

          srcName = event.target.attributes.name.value
          // Set Dropdown value to Token name & symbol
          document.getElementById("sell-button").innerText = `${srcName} - (${srcSymbol})`;

          // Set sell-symbol Symbol to srcSybol
          document.getElementById('sell-symbol').innerText = srcSymbol


          return addressToSell;
          // If the buy Dropdown is selected
        } else if (openDropdown.id == "buyDropdown") {

          // Set src Token Symbol
          destSymbol = event.target.attributes.id.value;

          // Find token address of selected token from mainnetAddresses hash
          let buyTokenImageUrl = mainnetAddresses[destSymbol];

          // Set token-logo for token to buy. If it is ETH, then use local image
          (destSymbol == "ETH") ? buyLogo.src = "images/ethereum.png" : buyLogo.src = `https://raw.githubusercontent.com/TrustWallet/tokens/master/tokens/${buyTokenImageUrl}.png`;

          // Set token address which the user wants to buy
          addressToBuy = `${event.target.attributes[4].value}`;


          // Re-run getExpectedRate function for new address pair & wait for the promise to resolve. Then update the numbers in the dest field
          getExpectedRate()
          .then((response) => {
            updateDestValue();
          })

          destName = event.target.attributes.name.value

          // Set Dropdown value to Token acronym
          document.getElementById("buy-button").innerText = `${destName} - (${destSymbol})`;

          // Set buy-symbol to srcSybol
          document.getElementById('buy-symbol').innerText = destSymbol

          return addressToBuy;

          } else {
        }
      }
    }
  }
}

sellSearch = document.querySelector('#sellSearch');
sellSearch.addEventListener('keyup', filterFunction)

buySearch = document.querySelector('#buySearch');
buySearch.addEventListener('keyup', filterFunction)

// Filter Functionality to search for specific currencies with input
function filterFunction(event) {
  let input, filter, a, i;
  if (event.target.id == "sellSearch") {
    input = sellSearch
    div = document.getElementById("sellDropdown");
  } else if (event.target.id == "buySearch") {
    input = buySearch;
    div = document.getElementById("buyDropdown");
    // Input stuff
  }
  filter = input.value.toUpperCase();
  a = div.querySelectorAll("a");

  // Check if the inputted letter is somewhere in the selected currency name before the last index. changing the a[i].style.display to "" makes it visible, setting it to none makes it invisible from a css perspective
  for (i = 0; i < a.length; i++) {
    txtValue = a[i].name;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      a[i].style.display = "";
    } else {
      a[i].style.display = "none";
    }
  }
}
