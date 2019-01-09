// Variables needed

var kyberNetworkProxyContract = null;

var kyberNetworkProxyAddress = "0x818e6fecd516ecc3849daf6845e3ec868087b755";

kyberNetworkProxyContract = new web3.eth.Contract(kyberNetworkProxyABI, kyberNetworkProxyAddress)

// Define token address to sell and token address to buy
let src = addressToSell;
let dest = addressToBuy;

let srcAmount;
let destAmount;

let expectedRate;
let slippageRate;

// destAmount HTML field
const destAmountHTML = document.getElementById("dest-amount");
const srcAmountHTML = document.getElementById("src-amount");
const expectedRateHTML = document.querySelector(".exchange-rate");

// Display Exchange Rate to User on Front End

function displayExchangeRate() {
  // Calc expected Rate in ETH not Wei
  expectedRateEth = expectedRate / (10 ** 18);
  // Calcualte user Exchange rate
  expectedRateHTML.innerText = `1 ${srcSymbol} = ${expectedRateEth} ${destSymbol}`;
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
      srcQuantity
      ).call()

  expectedRate = result.expectedRate
  slippageRate = result.slippageRate
  displayExchangeRate();
}

getExpectedRate();
