// ### Variable Definition ###

var web3 = new Web3(Web3.givenProvider);

var utils = web3.utils;

// Loader

loader = `<div class="loader"></div>`;

// HTML elements to add and delete

swapButtonDiv = document.querySelector('.swap-button-div');
swapButton = document.querySelector('#swap-button');
swapButtonHtml = `<input class="btn btn-outline-light" id="swap-button" type="submit" value="SWAP">`;


// Change Swap to Loader and back

// Change Swap button to Loader
function swapToLoader() {
  swapButton.style.display = "none";
  swapButtonDiv.insertAdjacentHTML("afterbegin", loader);
}

// Change Loader back to Swap Button
function loaderToSwap() {
  document.querySelector('.loader').remove();
  swapButton.style.display = "";
}

// Check if web3 is injected
window.addEventListener('load', function() {
  if (typeof web3 !== 'undefined' && web3.currentProvider !== null) {
    console.log('web3 is enabled')
    if (web3.currentProvider.isMetaMask === true) {
      console.log('MetaMask is active')
    } else {
      console.log('MetaMask is not available')
    }
  } else {
    // Change inner HTML of Error message
    console.log('web3 is not found')
    console.log('Please install Metamask')
    $('.modal').modal('show');
    // Create Error Message
  }
})

// Change modal to only show title and close button
document.querySelector('.modal-body').style.display = "none";
document.querySelector('#metamask-button').style.display = "none";

// Check if client is on the right network and create alert if not
web3.eth.net.getNetworkType()
.then((result) => {
  console.log(result)
  console.log(selectedEthereumNetwork)
  if (`${result}` == "main" && selectedEthereumNetwork == "ropsten") {
    document.querySelector('.modal-header').innerText = "Please switch your web3 client to the Ropsten Testnet";
    $('.modal').modal('show');
  } else if (`${result}` == "ropsten" && selectedEthereumNetwork == "mainnet") {
      document.querySelector('.modal-header').innerText = "Please switch your web3 client to the Mainnet";
      $('.modal').modal('show');
  } else if (`${result}` == "ropsten" && selectedEthereumNetwork == "ropsten") {return 0;
  } else if (`${result}` == "main" && selectedEthereumNetwork == "mainnet") {return 0;
  } else {
      document.querySelector('.modal-header').innerText = "Please switch your web3 client to either Mainnet or Ropsten";
      $('.modal').modal('show');
  }
})


// Swap successful mondel

document.querySelector('.modal')


// Fetch User Address
async function fetchAddress() {

  await web3.eth.getAccounts(function(error, result) {
    fetchedUserAddressArray = result;
    fetchedUserAddress = fetchedUserAddressArray[0];
    return fetchedUserAddress;
  });
};


const USER_ACCOUNT_2 = fetchAddress();

// Input own Address
const PRODUCT_ETH_PRICE = '0.3'
const PRODUCT_ETH_WEI_PRICE = utils.toWei('0.3');

// Define variable successful, which if set to false, will stop after the first tx and avoid asking to user to confirm the second one.

let successful;

// Let the trade begin

async function trade() {

  srcAmountWei = `${srcAmount * (10 ** 18)}`;

  // Set successful to true
  successful = true;

  /*
  ########################
  ### TRADE EXECUTION ####
  ########################
  */

  // If User chooses to sell ETH
  if(addressToSell == "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee") {

    transactionData = kyberNetworkProxyContract.methods.trade(
      addressToSell, //ETH srcToken
      srcAmountWei, //uint srcAmount
      addressToBuy, //ERC20 destToken
      fetchedUserAddress, //address destAddress => VENDOR_WALLET_ADDRESS
      "10000000000000000000000000000000", //uint maxDestAmount
      slippageRate, //uint minConversionRate
      "0xb779bEa600c94D0a2337A6A1ccd99ac1a8f08866" //uint walletId
    ).encodeABI()

    console.log("transactionData2 CHECK");

    // Change Swap Button for loader
    swapToLoader();

    // Display Modal for a successful swap
    document.querySelector('.modal-header').innerText = "Please confirm the Swap with your web3 client🤖";
    $('.modal').modal('show');



    txReceipt = await web3.eth.sendTransaction({
        from: fetchedUserAddress, //obtained from website interface Eg. Metamask, Ledger etc.
        to: kyberNetworkProxyAddress,
        data: transactionData,
        value: srcAmountWei //ADDITIONAL FIELD HERE
        }).catch(function(error) {
          console.log(error);
          loaderToSwap();
          successful = false;
        })

    if (successful == false) return 0;

    console.log("txReceipt 2 CHECK");

    // Change Loader for Swap Button
    loaderToSwap();


  // ##############################################################

  // If User chooses to sell ERC20 TOken
  }else {

    //First, user must approve KyberNetwork contract to trade src tokens
    srcTokenContract = new web3.eth.Contract(ERC20ABI, addressToSell);
    console.log("srcTokenContract CHECK");

    transactionData = srcTokenContract.methods.approve(kyberNetworkProxyAddress, srcAmountWei).encodeABI()
    console.log("transcationData CHECK");

    // Change Swap Button for loader
    swapToLoader();

    // Display Modal for a successful swap
    document.querySelector('.modal-header').innerText = "Please approve the Swap with your web3 client🤖";
    $('.modal').modal('show');

    txReceipt = await web3.eth.sendTransaction({
        from: fetchedUserAddress, //obtained from website interface Eg. Metamask, Ledger etc.
        to: addressToSell, //srcTokenContract resluted in error as it did not provide the contracts address, but the object itself,
        data: transactionData
        }).catch(function(error) {
          console.log(error);
          loaderToSwap();
          successful = false;
        })
    console.log("txReceipt CHECK");

    if (successful == false) return 0;

    transactionData = kyberNetworkProxyContract.methods.trade(
      addressToSell, //ERC20 srcToken
      srcAmountWei, //uint srcAmount
      addressToBuy, //ERC20 destToken
      fetchedUserAddress, //address destAddress => VENDOR_WALLET_ADDRESS
      "10000000000000000000000000000000", //uint maxDestAmount
      slippageRate, //uint minConversionRate
      "0xb779bEa600c94D0a2337A6A1ccd99ac1a8f08866" //uint walletId
    ).encodeABI()

    console.log("transactionData2 CHECK");

    // Alert modulat to ask for confirmation of approved transaction
    document.querySelector('.modal-header').innerText = "Now confirm the approved Swap to exchange the tokens💱";
    $('.modal').modal('show');

    txReceipt = await web3.eth.sendTransaction({
        from: fetchedUserAddress, //obtained from website interface Eg. Metamask, Ledger etc.
        to: kyberNetworkProxyAddress,
        data: transactionData,
        }).catch(function(error) {
          console.log(error);
          loaderToSwap();
        })

    console.log("txReceipt 2 CHECK");
    console.log(txReceipt);

    // Change Loader for SWAP Button
    loaderToSwap();
  }

  // Display Modal for a successful swap
  document.querySelector('.modal-header').innerText = "Swap successful 👍";
  document.querySelector('#metamask-button').style.display = "none";
  $('.modal').modal('show');
}

const tradeButton = document.querySelector("#swap-button");

tradeButton.addEventListener('click', function(event) {
  event.preventDefault();
  trade();
});

// main();
