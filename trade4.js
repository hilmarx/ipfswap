// Goal: Swap ETH for KNC with static values using the Ropsten Netwowrk.

var web3 = new Web3(Web3.givenProvider);

// Pre-defined variables
// web3 provider should already be set
// const web3 = new Web3(new Web3.providers.HttpProvider("https://ropsten.infura.io"))
var utils = web3.utils

// Fetch User Address
async function fetchAddress() {
  await web3.eth.getAccounts(function(error, result) {
    fetchedUserAddressArray = result;
    fetchedUserAddress = fetchedUserAddressArray[0];
    return fetchedUserAddress;
  });
};

const USER_ACCOUNT_2 = fetchAddress();

const USER_ACCOUNT = "0xac5781f6eec1f0cb9b353acbb745f813cef68311";
// const USER_ACCOUNT = "0xAC5781f6eEC1f0Cb9B353aCBB745f813cEf68311";

const ERC20ABI = [{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_value","type":"uint256"}],"name":"approve","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"supply","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"digits","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"}],"name":"balanceOf","outputs":[{"name":"balance","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"},{"name":"_spender","type":"address"}],"name":"allowance","outputs":[{"name":"remaining","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_owner","type":"address"},{"indexed":true,"name":"_spender","type":"address"},{"indexed":false,"name":"_value","type":"uint256"}],"name":"Approval","type":"event"}];
const KNCABI2 = [{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_value","type":"uint256"}],"name":"approve","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"INITIAL_SUPPLY","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_value","type":"uint256"}],"name":"burn","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"}],"name":"balanceOf","outputs":[{"name":"balance","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_value","type":"uint256"}],"name":"burnFrom","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"},{"name":"_spender","type":"address"}],"name":"allowance","outputs":[{"name":"remaining","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[{"name":"_name","type":"string"},{"name":"_symbol","type":"string"},{"name":"_decimals","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_burner","type":"address"},{"indexed":false,"name":"_value","type":"uint256"}],"name":"Burn","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"owner","type":"address"},{"indexed":true,"name":"spender","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Transfer","type":"event"}];
const kyberNetworkProxyABI = [{"constant":false,"inputs":[{"name":"alerter","type":"address"}],"name":"removeAlerter","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"enabled","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"pendingAdmin","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getOperators","outputs":[{"name":"","type":"address[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"src","type":"address"},{"name":"srcAmount","type":"uint256"},{"name":"dest","type":"address"},{"name":"destAddress","type":"address"},{"name":"maxDestAmount","type":"uint256"},{"name":"minConversionRate","type":"uint256"},{"name":"walletId","type":"address"},{"name":"hint","type":"bytes"}],"name":"tradeWithHint","outputs":[{"name":"","type":"uint256"}],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[{"name":"token","type":"address"},{"name":"srcAmount","type":"uint256"},{"name":"minConversionRate","type":"uint256"}],"name":"swapTokenToEther","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"token","type":"address"},{"name":"amount","type":"uint256"},{"name":"sendTo","type":"address"}],"name":"withdrawToken","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"maxGasPrice","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"newAlerter","type":"address"}],"name":"addAlerter","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"kyberNetworkContract","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"user","type":"address"}],"name":"getUserCapInWei","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"src","type":"address"},{"name":"srcAmount","type":"uint256"},{"name":"dest","type":"address"},{"name":"minConversionRate","type":"uint256"}],"name":"swapTokenToToken","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"newAdmin","type":"address"}],"name":"transferAdmin","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"claimAdmin","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"token","type":"address"},{"name":"minConversionRate","type":"uint256"}],"name":"swapEtherToToken","outputs":[{"name":"","type":"uint256"}],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[{"name":"newAdmin","type":"address"}],"name":"transferAdminQuickly","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getAlerters","outputs":[{"name":"","type":"address[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"src","type":"address"},{"name":"dest","type":"address"},{"name":"srcQty","type":"uint256"}],"name":"getExpectedRate","outputs":[{"name":"expectedRate","type":"uint256"},{"name":"slippageRate","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"user","type":"address"},{"name":"token","type":"address"}],"name":"getUserCapInTokenWei","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"newOperator","type":"address"}],"name":"addOperator","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_kyberNetworkContract","type":"address"}],"name":"setKyberNetworkContract","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"operator","type":"address"}],"name":"removeOperator","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"field","type":"bytes32"}],"name":"info","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"src","type":"address"},{"name":"srcAmount","type":"uint256"},{"name":"dest","type":"address"},{"name":"destAddress","type":"address"},{"name":"maxDestAmount","type":"uint256"},{"name":"minConversionRate","type":"uint256"},{"name":"walletId","type":"address"}],"name":"trade","outputs":[{"name":"","type":"uint256"}],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[{"name":"amount","type":"uint256"},{"name":"sendTo","type":"address"}],"name":"withdrawEther","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"token","type":"address"},{"name":"user","type":"address"}],"name":"getBalance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"admin","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[{"name":"_admin","type":"address"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"name":"trader","type":"address"},{"indexed":false,"name":"src","type":"address"},{"indexed":false,"name":"dest","type":"address"},{"indexed":false,"name":"actualSrcAmount","type":"uint256"},{"indexed":false,"name":"actualDestAmount","type":"uint256"}],"name":"ExecuteTrade","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"newNetworkContract","type":"address"},{"indexed":false,"name":"oldNetworkContract","type":"address"}],"name":"KyberNetworkSet","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"token","type":"address"},{"indexed":false,"name":"amount","type":"uint256"},{"indexed":false,"name":"sendTo","type":"address"}],"name":"TokenWithdraw","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"amount","type":"uint256"},{"indexed":false,"name":"sendTo","type":"address"}],"name":"EtherWithdraw","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"pendingAdmin","type":"address"}],"name":"TransferAdminPending","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"newAdmin","type":"address"},{"indexed":false,"name":"previousAdmin","type":"address"}],"name":"AdminClaimed","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"newAlerter","type":"address"},{"indexed":false,"name":"isAdd","type":"bool"}],"name":"AlerterAdded","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"newOperator","type":"address"},{"indexed":false,"name":"isAdd","type":"bool"}],"name":"OperatorAdded","type":"event"}];


var kyberNetworkProxyContract = null
var KYBER_NETWORK_PROXY_ADDRESS = "0x818e6fecd516ecc3849daf6845e3ec868087b755"

// Kyber Network Address to retrieve expected rate
const KYBER_NETWORK_ADDRESS = "0x91a502C678605fbCe581eae053319747482276b9"
const KYBER_NETWORK_ROPSTEN_CONTRACT_ADDRESS = "0x818e6fecd516ecc3849daf6845e3ec868087b755"

const ETH_TOKEN_ADDRESS = "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee"
const KNC_TOKEN_ADDRESS_OLD = "0xdd974d5c2e2928dea5f71b9825b8b646686bd200"
const KNC_TOKEN_ADDRESS_NEW = "0x4e470dc7321e84ca96fcaedd0c8abcebbaeb68c6"
const ETH_DECIMALS = 18
const KNC_DECIMALS = 18

// Input own Address
const VENDOR_WALLET_ADDRESS = "0x483C5100C3E544Aef546f72dF4022c8934a6945E"
const PRODUCT_ETH_PRICE = '0.3'
const PRODUCT_ETH_WEI_PRICE = utils.toWei('0.3');

// Let the trade begin

async function main() {
    // Manually inputted
    // KYBER_NETWORK_PROXY_ADDRESS = await getKyberNetworkProxyAddress()
    kyberNetworkProxyContract = new web3.eth.Contract(kyberNetworkProxyABI, KYBER_NETWORK_PROXY_ADDRESS)
    console.log(kyberNetworkProxyContract);
    // Get Kyber Network Proxy Address


    /*
    ######################################################
    ### OBTAINING & DISPLAYING SINGLE TOKEN PAIR RATE ####
    ######################################################
    */
    let result = await kyberNetworkProxyContract.methods.getExpectedRate(
        ETH_TOKEN_ADDRESS,
        KNC_TOKEN_ADDRESS_NEW,
        PRODUCT_ETH_WEI_PRICE
        ).call()

    let expectedRate = result.expectedRate
    let slippageRate = result.slippageRate
    console.log("Expected Rate: " + expectedRate)
    console.log("Slippage Rate: " + slippageRate)

    //Convert expected rate and / or slippage rate to KNC for user to view
    userTokenWeiPrice = convertToUserTokenWeiPrice(Number(PRODUCT_ETH_PRICE), expectedRate)
    userTokenPrice = convertToTokenPrice(userTokenWeiPrice,KNC_DECIMALS)
    console.log("Product price: " + userTokenPrice + " KNC")

    // Conver userTOkenWeiPrice to String
    userTokenWeiPrice2 = "1006716039884000000";
    /*
    ########################
    ### TRADE EXECUTION ####
    ########################
    */

    //User can pay in KNC (src), but we receive payment in ETH (dest)
    //First, user must approve KyberNetwork contract to trade src tokens
    srcTokenContract = new web3.eth.Contract(ERC20ABI, KNC_TOKEN_ADDRESS_NEW);
    console.log("srcTokenContract CHECK");

    transactionData = srcTokenContract.methods.approve(KYBER_NETWORK_PROXY_ADDRESS, userTokenWeiPrice2).encodeABI()
    console.log("transcationData CHECK");

    txReceipt = await web3.eth.sendTransaction({
        from: fetchedUserAddress, //obtained from website interface Eg. Metamask, Ledger etc.
        to: "0x4e470dc7321e84ca96fcaedd0c8abcebbaeb68c6", //srcTokenContract resluted in error as it did not provide the contracts address, but the object itself,
        data: transactionData
        }).catch(error => console.log(error))
    console.log("txReceipt CHECK");


    // transactionData = kyberNetworkProxyContract.methods.trade(
    //     KNC_TOKEN_ADDRESS_NEW, //ERC20 srcToken
    //     userTokenWeiPrice2, //uint srcAmount
    //     ETH_TOKEN_ADDRESS, //ERC20 destToken
    //     USER_ACCOUNT, //address destAddress => VENDOR_WALLET_ADDRESS
    //     userTokenWeiPrice2 + 1, //uint maxDestAmount
    //     slippageRate, //uint minConversionRate
    //     "0xb779bEa600c94D0a2337A6A1ccd99ac1a8f08866" //uint walletId
    //     ).encodeABI()

    // Same funciton only hardcoded
    // ####check if it works, if not post and ask why?
    transactionData = kyberNetworkProxyContract.methods.trade(
      "0x4e470dc7321e84ca96fcaedd0c8abcebbaeb68c6", //ERC20 srcToken
      userTokenWeiPrice2, //uint srcAmount
      ETH_TOKEN_ADDRESS, //ERC20 destToken
      fetchedUserAddress, //address destAddress => VENDOR_WALLET_ADDRESS
      userTokenWeiPrice2, //uint maxDestAmount
      "1", //uint minConversionRate
      "0xb779bEa600c94D0a2337A6A1ccd99ac1a8f08866" //uint walletId
    ).encodeABI()

    console.log("transactionData2 CHECK");

    txReceipt = await web3.eth.sendTransaction({
        from: fetchedUserAddress, //obtained from website interface Eg. Metamask, Ledger etc.
        to: KYBER_NETWORK_PROXY_ADDRESS,
        data: transactionData,
        }).catch(error => console.log(error))

    console.log("txReceipt 2 CHECK");
}

function convertToUserTokenWeiPrice(productSrcPrice,expectedRate) {
    return (productSrcPrice * expectedRate);
}

function convertToTokenPrice(userTokenWeiPrice,destDecimals) {
    return userTokenWeiPrice / 10 ** destDecimals
}


// Get Kyber Network Proxy Address:
async function getKyberNetworkProxyAddress() {
    var providers = ethers.providers
    // var provider = providers.getDefaultProvider();
    var provider = ethers.getDefaultProvider('ropsten');
    var address = await provider.resolveName("kybernetwork.eth").catch(error => console.log(error))
    if (!address) {
        address = KYBER_NETWORK_ROPSTEN_CONTRACT_ADDRESS
    }
    console.log(providers);
    console.log(provider);
    console.log(address);
    console.log("0x818e6fecd516ecc3849daf6845e3ec868087b755")
    return address
}

// getKyberNetworkProxyAddress();
main();

