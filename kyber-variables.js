// Declare contract variable

// Contract instantiation
var kyberNetwork;
var kyberNetworkContract;
var web3 = new Web3(Web3.givenProvider);

//var userAddress = web3.currentProvider.selectedAddress;

// Getting user account:
var userAddress

function getUserAddress() {
  web3.eth.getAccounts().then(response => {
  userAddress = response[0]
  })
}

getUserAddress();

var kyberNetworkAddress = "0x39CC6802cF1625C30548B57D885932CB381EB4a4";
kyberNetworkContract = new web3.eth.Contract(kyberNetworkAbi, kyberNetworkAddress);

// -------------------------------------------------------
// For get expected rate function

// source ERC20 token contract address
const src = '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee'; // ETH
// const src = '0x55080ac40700BdE5725D8a87f48a01e192F660AF'; // Kyber
const dest = '0x6b1224743CC0E5994d1B35f2b90A1A12a51044aC'; // SALT
const srcQty = web3.utils.toWei('1');

// -------------------------------------------------------
// For Trade function

// limit on the amount of destination tokens (to avoid too large orders)

const destAddress = '0x24A23af4c7A1449A1669d7F1bFdb116480b8e691';

const maxDestAmount = 100000000000;
// minimum conversion rate; trade is canceled if actual rate is lower
const minConversionRate = 50335827358;

// Fees will go to this handsome young gentleman:
const walletId = '0x24A23af4c7A1449A1669d7F1bFdb116480b8e691';

//wei amount of source ERC20 token => taken in ETH and converts into Wei
const srcAmount =  web3.utils.toWei('1');

// Token Addrress of token the User wants to purchase.
// const dest = '0xdd974D5C2e2928deA5F71b9825b8b646686BD200'; // KNC

// Console Logging all variables

console.log("----- Set Variables -----");
console.log(`Users Address: ${userAddress}`);
console.log(`Users Address: ${web3.eth.accounts.givenProvider.selectedAddress
}`);
console.log(`User is using metamask? ${web3.currentProvider.isMetaMask}`);
console.log(`Kypber Network Proxy Smart Contract Address: ${kyberNetworkAddress}`);
console.log(`Kypber Network Proxy Smart Contract Instance: ${kyberNetworkContract}`);
console.log(`Selected token address to be sold (src): ${src}`);
console.log(`Selected token address to be purchased (dest): ${dest}`);
console.log(`Quanitity of source token to be sold (srcQty): ${srcQty}`);
console.log(`Maximium tokens to swap (maxDestAmount): ${maxDestAmount}`);

console.log(`Minimum conversion fee accepted by sender (minConversionRate): ${minConversionRate}`);
console.log(`Address of IPFSWAP to receive small fee (walletId): ${walletId}`);


console.log("----- Variables End -----");





