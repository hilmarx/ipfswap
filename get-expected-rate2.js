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


// Create HTML to display display expected destination amount

function displayDestAmount() {
  destAmountHTML.value = destAmount;
}

//  Take Expected Rate and display how many destTokens the user will get in return
function calcExchangeRate() {
  srcAmount = event.srcElement.value;
  destAmount = (srcAmount * expectedRate) / 10 ** 18;
  displayDestAmount();
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
}

getExpectedRate();
