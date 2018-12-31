// ### Variable Definition ###

var web3 = new Web3(Web3.givenProvider);

var utils = web3.utils;

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
const VENDOR_WALLET_ADDRESS = "0x483C5100C3E544Aef546f72dF4022c8934a6945E"
const PRODUCT_ETH_PRICE = '0.3'
const PRODUCT_ETH_WEI_PRICE = utils.toWei('0.3');

// Let the trade begin

async function trade() {

  srcAmountWei = `${srcAmount * (10 ** 18)}`;

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

    txReceipt = await web3.eth.sendTransaction({
        from: fetchedUserAddress, //obtained from website interface Eg. Metamask, Ledger etc.
        to: kyberNetworkProxyAddress,
        data: transactionData,
        value: srcAmountWei //ADDITIONAL FIELD HERE
        }).catch(error => console.log(error))

    console.log("txReceipt 2 CHECK");

  // If User chooses to sell ERC20 TOken
  }else {

    //First, user must approve KyberNetwork contract to trade src tokens
    srcTokenContract = new web3.eth.Contract(ERC20ABI, addressToSell);
    console.log("srcTokenContract CHECK");

    transactionData = srcTokenContract.methods.approve(kyberNetworkProxyAddress, srcAmountWei).encodeABI()
    console.log("transcationData CHECK");

    txReceipt = await web3.eth.sendTransaction({
        from: fetchedUserAddress, //obtained from website interface Eg. Metamask, Ledger etc.
        to: addressToSell, //srcTokenContract resluted in error as it did not provide the contracts address, but the object itself,
        data: transactionData
        }).catch(error => console.log(error))
    console.log("txReceipt CHECK");

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

    txReceipt = await web3.eth.sendTransaction({
        from: fetchedUserAddress, //obtained from website interface Eg. Metamask, Ledger etc.
        to: kyberNetworkProxyAddress,
        data: transactionData,
        }).catch(error => console.log(error))

    console.log("txReceipt 2 CHECK");
  }

}

const tradeButton = document.querySelector("#swap-button");

tradeButton.addEventListener('click', function(event) {
  event.preventDefault();
  trade();
});

// main();
