// ############## TEST FUNCITON FOR ERROR MESSAGE #################

//  ##################### Modal changes #######################
function startModal() {

  if (addressToSell == "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee") {
    modalTitle.innerText = "Please execute the Swap 🤖";
    closeBtn.innerText = "Confirm"
  } else {
    modalTitle.innerText = "Please approve the Swap 🤖";
    closeBtn.innerText = "Approve"
  }

  modalBody.innerHTML = `<div id="confirm-text">${srcAmountWei / srcQuantity} ${srcSymbol} for ${destAmount.toFixed(6)} ${destSymbol}\n</div> <div id="slippage-note">A max 3% slippage Rate may be applied in situations of larger market movements during trade execution.</div>` ;

  modalBody.style.display = "";

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

function successfulModal() {
  // Change Loader for Swap Button
  loaderToSwap();

  // Display Modal for a successful swap
  modalTitle.innerText = "Swap successful 👍";
  modalBody.innerText = "";
  modalBody.style.display = "none"
  // Re-display close button
  closeBtn.innerText = "New Swap"
  closeBtn.style.display = ""
  closeBtn.addEventListener("click", reloadMainPage);
  metaMaskBtn.style.display = "none";
  $('.modal').modal('show');
}

// Specific Modals

function zeroModal() {
  modalTitle.innerText = `Please input how many ${srcSymbol} you want to sell`
  modalBody.style.display = "none";
  metaMaskBtn.style.display = "none";

  $('.modal').modal('show');
}

function insufficientFundsModal() {
  modalTitle.innerText = "Insufficient funds"
  modalBody.style.display = "none"
  closeBtn.innerText = "Close"
  $('.modal').modal('show');
}

//  ##################### Modal changes END #######################



// async function trade() {

//   // Set nonce
//   nonce = await web3.eth.getTransactionCount(fetchedUserAddress);

//   // Check if User has enough tokens
//   if (erc20tokenBalance >= parseInt(srcAmountWei) ) {

//     async function approveTx() {

//       transactionData1 = srcTokenContract.methods.approve(kyberNetworkProxyAddress, srcAmountWei).encodeABI()

//       txReceipt = await web3.eth.sendTransaction({
//           from: fetchedUserAddress, //obtained from website interface Eg. Metamask, Ledger etc.
//           to: addressToSell, //srcTokenContract resluted in error as it did not provide the contracts address, but the object itself,
//           data: transactionData1,
//           nonce: nonce
//           }, function(error, hash) {


//             async function executeTx() {

//             // ####### Start second tx ########
//             // Call the trade method in Proxy Contract
//             transactionData2 = kyberNetworkProxyContract.methods.trade(
//               addressToSell, //ERC20 srcToken
//               srcAmountWei, //uint srcAmount
//               addressToBuy, //ERC20 destToken
//               fetchedUserAddress, //address destAddress => VENDOR_WALLET_ADDRESS
//               "10000000000000000000000000000000", //uint maxDestAmount
//               slippageRate, //uint minConversionRate
//               walletId //uint walletId for fee sharing program
//             ).encodeABI()

//             txReceipt = await web3.eth.sendTransaction({
//               from: fetchedUserAddress, //obtained from website interface Eg. Metamask, Ledger etc.
//               to: kyberNetworkProxyAddress,
//               data: transactionData2,
//               nonce: nonce + 1
//             }, function(error, hash) {
//                 waitingModal(hash)
//               })
//               .catch(function(error) {
//                 console.log(error);
//                 loaderToSwap();
//             });
//           }
//           // Remove first event listener
//           closeBtn.removeEventListener("click", approveTx, { passive: true });
//           // Add event Listener to function
//           closeBtn.addEventListener('click', executeTx)
//           })
//       .catch(function(error) {
//         console.log(error);
//         loaderToSwap();
//       })
//     // approveTx() end
//     }
//     closeBtn.addEventListener('click', approveTx)
//   }
// }









