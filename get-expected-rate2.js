// Variables needed

var kyberNetworkProxyContract = null

const kyberNetworkProxyAddress = "0x818e6fecd516ecc3849daf6845e3ec868087b755"

kyberNetworkProxyContract = new web3.eth.Contract(kyberNetworkProxyAbi, KYBER_NETWORK_PROXY_ADDRESS)

const src = addressToSell;
const dest = addressToBuy;

let srcAmount
let destAmount;

let expectedRate;
let slippageRate;

// destAmount HTML field
const destAmountHTML = document.getElementById("dest-amount");
const srcAmountHTML = document.getElementById("src-amount");
const expectedRateHTML = document.querySelector(".exchange-rate");

// Display Exchange Rate

function displayExchangeRate() {
  // Calcualte user Exchange rate
  expectedRateHTML.innerText = expectedRate / (10 ** 18);
  // expectedRate / (10 ** 18)
}

// Create HTML to display display expected destination amount

function displayDestAmount() {
  destAmountHTML.value = destAmount;
}

function displaySrcAmount() {
  srcAmountHTML.value = srcAmount;
}

//  Take Expected Rate and display how many destTokens the user will get in return
function sellExchangeRate() {
  srcAmount = event.srcElement.value;
  destAmount = (srcAmount * (expectedRate / 10 ** 18));
  displayDestAmount();
}

function buyExchangeRate() {
  destAmount = event.srcElement.value;
  srcAmount = destAmount * (1 / (expectedRate / (10 ** 18)));
  console.log(`expected rate ${expectedRate} destAmount ${destAmount} - srcAmount ${srcAmount}`)
  displaySrcAmount();
}

// Test whether users receive different expected Rates for different quantities

async function getExpectedRate() {

  let result = await kyberNetworkProxyContract.methods.getExpectedRate(
      addressToSell,
      addressToBuy,
      "1000000000000000000"
      ).call()

  expectedRate = result.expectedRate
  slippageRate = result.slippageRate
  console.log("Expected Rate: " + expectedRate)
  console.log("Slippage Rate: " + slippageRate)
  displayExchangeRate();
}

getExpectedRate();
