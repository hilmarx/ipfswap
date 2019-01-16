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
//  ##################### Modal changes END #######################
