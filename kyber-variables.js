// Declare contract variable

// Contract instantiation
var kyberNetwork;
var kyberNetworkContract;
var test;
var web3 = new Web3(Web3.givenProvider)

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


// minimum conversion rate; trade is canceled if actual rate is lower
const minConversionRate = 50335827358;

// Fees will go to this handsome young gentleman:
const walletId = '0x24A23af4c7A1449A1669d7F1bFdb116480b8e691';

//wei amount of source ERC20 token
const srcAmount =  web3.utils.toWei('100');

// Token Addrress of token the User wants to purchase.
// const dest = '0xdd974D5C2e2928deA5F71b9825b8b646686BD200'; // KNC
