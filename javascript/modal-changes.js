// ############## TEST FUNCITON FOR ERROR MESSAGE #################

//  ##################### Modal changes #######################
function startModal() {

  if (addressToSell == "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee") {
    // Display Modal for a successful swap
    modalTitle.innerText = "Please approve the Swap 🤖";
    closeBtn.innerText = "Approve"
  } else {
    modalTitle.innerText = "Please execute the Swap 🤖";
    closeBtn.innerText = "Confirm"
  }

  modalBody.innerHTML = `<div id="confirm-text">${srcAmountWei / srcQuantity} ${srcSymbol} for ${(srcAmount  * expectedRate) / srcQuantity} ${destSymbol}\n</div> <div id="slippage-note">A max 3% slippage Rate may be applied in situations of larger market movements during trade execution.</div>` ;

  modalBody.style.display = "";

  closeBtn.innerText = "Approve"
  $('.modal').modal('show');

}

function tradeApprovedModal() {
  // Alert modal to ask for confirmation of approved transaction
  modalTitle.innerText = "Now confirm the approved Swap to exchange the tokens";
  closeBtn.innerText = "Confirm"
  modalBody.innerHTML = ``
  modalBody.style.display = "none"
  $('.modal').modal('show');

}

function waitingModal(hash) {
   // Change Swap Button for loader
  swapToLoader();
  // Change Modal to say please wait
  modalTitle.innerText = "Please wait for the transaction to be mined 🕒";
  modalBody.innerHTML = ``;
  modalBody.innerText = `Meanwhile, you can check the tx status on Etherscan`;
  modalBody.style.display = "";
  closeBtn.style.display = "none";
  metaMaskBtn.innerText = "Check Tx Status";
  (selectedEthereumNetwork == "mainnet") ? etherscanUrl = `https://etherscan.io/tx/${hash}` : etherscanUrl = `https://ropsten.etherscan.io/tx/${hash}`
  metaMaskBtn.href = etherscanUrl
  metaMaskBtn.style.display = "";
  $('.modal').modal('show');

}

function completedModal() {
  // Change Loader for Swap Button
  loaderToSwap();

  // Display Modal for a successful swap
  modalTitle.innerText = "Swap successful 👍";
  modalBody.innerText = "";
  modalBody.style.display = "none"
  // Re-display close button
  closeBtn.innerText = "New Swap"
  closeBtn.style.display = ""
  closeBtn.removeEventListener("click", executeTx, { passive: true });
  closeBtn.addEventListener("click", reloadMainPage);
  metaMaskBtn.style.display = "none";
  $('.modal').modal('show');
}



async function approveTx() {

  transactionData1 = srcTokenContract.methods.approve(kyberNetworkProxyAddress, srcAmountWei).encodeABI()

  txReceipt = await web3.eth.sendTransaction({
      from: fetchedUserAddress, //obtained from website interface Eg. Metamask, Ledger etc.
      to: addressToSell, //srcTokenContract resluted in error as it did not provide the contracts address, but the object itself,
      data: transactionData1,
      gasPrice: chosenGasPrice,
      nonce: nonce
      })
      .on('transactionHash', function(hash) {
        // Called when the user presses "Confirm" button
        async function executeTx() {
        // ####### Start second tx ########
        // Call the trade method in Proxy Contract
        trsansactionData2 = kyberNetworkProxyContract.methods.trade(
          addressToSell, //ERC20 srcToken
          srcAmountWei, //uint srcAmount
          addressToBuy, //ERC20 destToken
          fetchedUserAddress, //address destAddress => VENDOR_WALLET_ADDRESS
          "10000000000000000000000000000000", //uint maxDestAmount
          slippageRate, //uint minConversionRate
          walletId //uint walletId for fee sharing program
        ).encodeABI()

        txReceipt = await web3.eth.sendTransaction({
          from: fetchedUserAddress, //obtained from website interface Eg. Metamask, Ledger etc.
          to: kyberNetworkProxyAddress,
          data: transactionData2,
          nonce: nonce + 1












//  ##################### Modal changes END #######################

// ############## TEST FUNCITON FOR ERROR MESSAGE #################

// async function test() {

//   srcAmountWei = `${srcAmount * (10 ** 18)}`;

//     async function test1() {
//       txReceipt = await web3.eth.sendTransaction({
//                     from: fetchedUserAddress, //obtained from website interface Eg. Metamask, Ledger etc.
//                     to: kyberNetworkProxyAddress,
//                     data: transactionData,
//                     }).catch(function(error) {
//                       console.log(error);
//                       loaderToSwap();
//                     })

//     }

//   //First, user must approve KyberNetwork contract to trade src tokens
//   srcTokenContract = new web3.eth.Contract(ERC20ABI, addressToSell);

//   transactionData1 = srcTokenContract.methods.approve(kyberNetworkProxyAddress, srcAmountWei).encodeABI()


//   txReceipt = await web3.eth.sendTransaction({
//             from: fetchedUserAddress, //obtained from website interface Eg. Metamask, Ledger etc.
//             to: addressToSell, //srcTokenContract resluted in error as it did not provide the contracts address, but the object itself,
//             data: transactionData1
//             }).on('transactionHash', function(hash){
//               transactionData = kyberNetworkProxyContract.methods.trade(
//               addressToSell, //ERC20 srcToken
//               srcAmountWei, //uint srcAmount
//               addressToBuy, //ERC20 destToken
//               fetchedUserAddress, //address destAddress => VENDOR_WALLET_ADDRESS
//               "10000000000000000000000000000000", //uint maxDestAmount
//               slippageRate, //uint minConversionRate
//               "0xb779bEa600c94D0a2337A6A1ccd99ac1a8f08866" //uint walletId
//             ).encodeABI()

//             test1()

//             });
// }


