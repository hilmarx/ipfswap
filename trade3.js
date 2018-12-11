// Set Variables
// Example: Kyber Network:

function tradeInit() {
  const ERC20ABI = KNCABI;
  const SRC_TOKEN_ADDRESS = "0x55080ac40700BdE5725D8a87f48a01e192F660AF";
  const KYBER_NETWORK_PROXY_ADDRESS = kyberNetworkAddress;
  // !!!!!!!!!!!!!!!!!!!!!Does not fetch expectedRate!!!!!!!!!!!!!!!!
  const srcTokenWeiPrice = expectedRate;
  // !!!!!!!!!!!!!!!!!!!!!Does not fetch userAddress with userAddress!!!!!!!!!!!!!!!!
  const USER_ACCOUNT = web3.eth.accounts.givenProvider.selectedAddress;
  const srcTokenWeiAmount = srcAmount;

  console.log("----- Trade -----");
  console.log(`KYBER_NETWORK_PROXY_ADDRESS: ${KYBER_NETWORK_PROXY_ADDRESS}`);
  console.log(`srcTokenWeiPrice: ${srcTokenWeiPrice}`);
  console.log(`USER_ACCOUNT: ${USER_ACCOUNT}`);
  console.log(`srcTokenWeiAmount: ${srcTokenWeiAmount}`);

  async function trade() {

    // Approve function
    async function approve() {
      srcTokenContract = new web3.eth.Contract(ERC20ABI, SRC_TOKEN_ADDRESS)
      transactionData = srcTokenContract.methods.approve(KYBER_NETWORK_PROXY_ADDRESS,srcTokenWeiPrice).encodeABI()

      txReceipt = await web3.eth.sendTransaction({
          from: USER_ACCOUNT, //obtained from website interface Eg. Metamask, Ledger etc.
          to: srcTokenContract,
          data: transactionData
      })
    }

    // Initiate Trade function



    // Prevent Front running by kimiting the amount of gas a user can specify:
    let maxGasPrice = await kyberNetworkContract.methods.maxGasPrice().call()

    console.log(`Max gas price: ${maxGasPrice}`);

    // Check if preinputted allowance is greate than the trade, continue
    srcTokenContract = new web3.eth.Contract(ERC20ABI, SRC_TOKEN_ADDRESS)
    // Calling function on selected ERC20 contract with the userAddress (receiver) and Kyber Network Proxy Address (sender) as arguments
    allowanceAmount = srcTokenContract.methods.allowance(userAddress,kyberNetworkAddress).call()
    console.log(`Allowance: ${allowanceAmount}`);

    if (srcTokenWeiAmount <= allowanceAmount) {
      approve()
      console.log("Went straight to step 3");
      //proceed to step 3
      // call function step 3
    } else {
      //proceed to step 2 - The user has to approve the transaction first because the trade amount exceeds the allowance
      approve()
      console.log("----- Successfully approved -----");

    }


    console.log("----- Trade End -----");

  }

  trade();

}


