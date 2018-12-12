// Set Variables
// Example: Kyber Network:

function tradeInit() {
  const ERC20ABI = KNCABI;
  // Source token address: Kyber Network Token
  const SRC_TOKEN_ADDRESS = "0x55080ac40700BdE5725D8a87f48a01e192F660AF";
  // Desination token address: Omise Go
  const DEST_TOKEN_ADDRESS = "0x659c4206b2ee8CC00af837CddA132eb30fA58df8";
  // Vendor address
  const VENDOR_WALLET_ADDRESS = "0xAC5781f6eEC1f0Cb9B353aCBB745f813cEf68311"
  const KYBER_NETWORK_PROXY_ADDRESS = kyberNetworkAddress;
  // !!!!!!!!!!!!!!!!!!!!!Does not fetch expectedRate!!!!!!!!!!!!!!!!
  const srcTokenWeiPrice = expectedRate;
  // !!!!!!!!!!!!!!!!!!!!!Does not fetch userAddress with userAddress!!!!!!!!!!!!!!!!
  const USER_ACCOUNT = web3.eth.accounts.givenProvider.selectedAddress;
  const srcTokenWeiAmount = srcAmount;
  const KyberNetworkProxyContract = kyberNetworkContract;
  const maximumDestTokenWeiAmount = maxDestAmount;
  const minConversionWeiRate = slippageRate;


  console.log("----- Trade -----");
  console.log(`KYBER_NETWORK_PROXY_ADDRESS: ${KYBER_NETWORK_PROXY_ADDRESS}`);
  console.log(`srcTokenWeiPrice: ${srcTokenWeiPrice}`);
  console.log(`USER_ACCOUNT: ${USER_ACCOUNT}`);
  console.log(`srcTokenWeiAmount: ${srcTokenWeiAmount}`);

  async function trade() {

    // STEP 2:  Approve function
    async function approve() {
      console.log("----Approve function-------")
      srcTokenContract = new web3.eth.Contract(ERC20ABI, SRC_TOKEN_ADDRESS)
      console.log(`srcTokenContract: ${srcTokenContract._address}`);

      transactionData = srcTokenContract.methods.approve(KYBER_NETWORK_PROXY_ADDRESS,srcTokenWeiPrice).encodeABI();

      txReceipt = await web3.eth.sendTransaction({
          from: USER_ACCOUNT, //obtained from website interface Eg. Metamask, Ledger etc.
          to: srcTokenContract._address,
          data: transactionData
      });
    }
    // STEP 2:  END

    // Step 3: Execute Trade
    async function executeTrade() {
      console.log("Enter executeTrade function");
      transactionData = KyberNetworkProxyContract.methods.trade(
          SRC_TOKEN_ADDRESS, //ERC20 srcToken
          srcTokenWeiAmount, //uint srcAmount
          DEST_TOKEN_ADDRESS, //ERC20 destToken
          VENDOR_WALLET_ADDRESS, //address destAddress
          maximumDestTokenWeiAmount, //uint maxDestAmount
          minConversionWeiRate, //uint minConversionRate
          VENDOR_WALLET_ADDRESS //uint walletId
          ).encodeABI();

      txReceipt = await web3.eth.sendTransaction({
          from: USER_ACCOUNT, //obtained from website interface Eg. Metamask, Ledger etc.
          to: KYBER_NETWORK_PROXY_ADDRESS,
          data: transactionData
      })
      console.log("Exit execute Trade function");
    }


    // Step 3: END

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
      console.log("Wei amount smaller than allowance");
      // Delete approve() after figuring out why wei amount is mslaeer than allowance
      executeTrade();
      //proceed to step 3
      // call function step 3
    } else {
      //proceed to step 2 - The user has to approve the transaction first because the trade amount exceeds the allowance
      approve();
      executeTrade();
      console.log("----- End approve function -----");

    }
    console.log("----- Trade End -----");
  }

  trade();

}


