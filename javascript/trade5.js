// ### Variable Definition ###

var web3 = new Web3(Web3.givenProvider);

var utils = web3.utils;

// Loader

loader = `<div class="loader"></div>`;

// HTML elements to add and delete

swapButtonDiv = document.querySelector('.swap-button-div');
swapButton = document.querySelector('#swap-button');
swapButtonHtml = `<input class="btn btn-outline-light" id="swap-button" type="submit" value="SWAP">`;

const metaMaskBtn = document.querySelector('#metamask-button')
const closeBtn = document.querySelector('#close-button')
const modalTitle = document.querySelector('.modal-header')
const modalBody = document.querySelector('.modal-body')


// For fee sharing program
const walletId = "0x1bF3e7EDE31dBB93826C2aF8686f80Ac53f9ed93"

// ############# Functions ###############

// Function to be called after the final event has been triggered
function reloadMainPage() {
  location.reload();
};


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
      // Open Metamask tab if not yet logged in and asks users if they trust the application or not
      console.log('MetaMask is active')
      ethereum.enable();
    } else {
      console.log('MetaMask is not available')
    }
    // Change modal to only show title and close button
    modalBody.style.display = "none";
    metaMaskBtn.style.display = "none";
  } else {
    // Change inner HTML of Error message
    console.log('web3 is not found')
    console.log('Please install Metamask')
    $('.modal').modal('show');
    // Create Error Message
  }
})


// Check if client is on the right network and create alert if not
web3.eth.net.getNetworkType()
.then((result) => {
  if (`${result}` == "main" && selectedEthereumNetwork == "ropsten") {
    modalTitle.innerText = "Please switch your web3 client to the Ropsten Testnet";
    $('.modal').modal('show');
  } else if (`${result}` == "ropsten" && selectedEthereumNetwork == "mainnet") {
      modalTitle.innerText = "Please switch your web3 client to the Mainnet";
      $('.modal').modal('show');
  } else if (`${result}` == "ropsten" && selectedEthereumNetwork == "ropsten") {return 0;
  } else if (`${result}` == "main" && selectedEthereumNetwork == "mainnet") {return 0;
  } else {
      modalTitle.innerText = "Please switch your web3 client to either Mainnet or Ropsten";
      $('.modal').modal('show');
  }
})


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


// Counter to protect users from creating two event listeners on the swap button that will result in 2 tx's to be signed
let counter = 0


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

//  ##################### Modal changes END #######################




// Let the trade begin

async function trade() {

  // Set the right Gas price
  const defaultGasPrice = await web3.eth.getGasPrice()
  const chosenGasPrice = (defaultGasPrice < 10000000000) ? `${10000000000}` : `${defaultGasPrice}`;

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

    // Call balanceOf function
    let etherBalance = await web3.eth.getBalance(fetchedUserAddress)

    if (etherBalance >= parseInt(srcAmountWei) ) {

      // Add Event listener to "SWAP" button of Modal which when clicked open the transaction
      // Display Modal for a successful swap
      modalTitle.innerText = "Please confirm the Swap 🤖";
      modalBody.innerHTML = `<div id="confirm-text">${srcAmountWei / srcQuantity} ${srcSymbol} for ${(srcAmount  * expectedRate) / srcQuantity} ${destSymbol}\n</div> <div id="slippage-note">A max 3% slippage Rate may be applied in situations of larger market movements during trade execution.</div>`
      modalBody.style.display = "";
      $('.modal').modal('show');
      closeBtn.innerText = "Confirm";

            // Display Modal for a successful swap
      modalTitle.innerText = "Please approve the Swap 🤖";
      // modalBody.innerText = `${srcAmountWei / srcQuantity} ${srcSymbol} for ${(srcAmount  * expectedRate) / srcQuantity} ${destSymbol}\n`
      modalBody.innerHTML = `<div id="confirm-text">${srcAmountWei / srcQuantity} ${srcSymbol} for ${(srcAmount  * expectedRate) / srcQuantity} ${destSymbol}\n</div> <div id="slippage-note">A max 3% slippage Rate may be applied in situations of larger market movements during trade execution.</div>` ;
      modalBody.style.display = "";
      closeBtn.innerText = "Approve"
      $('.modal').modal('show');

      async function executeTx() {

        transactionData = kyberNetworkProxyContract.methods.trade(
          addressToSell, //ETH srcToken
          srcAmountWei, //uint srcAmount
          addressToBuy, //ERC20 destToken
          fetchedUserAddress, //address destAddress => VENDOR_WALLET_ADDRESS
          "10000000000000000000000000000000", //uint maxDestAmount
          slippageRate, //uint minConversionRate
          walletId //uint walletId
        ).encodeABI();


        txReceipt = await web3.eth.sendTransaction({
          from: fetchedUserAddress, //obtained from website interface Eg. Metamask, Ledger etc.
          to: kyberNetworkProxyAddress,
          data: transactionData,
          value: srcAmountWei, //ADDITIONAL FIELD HERE
          gasPrice: chosenGasPrice
          })
          // When the user clicks confirm in Metamask and the transcation hash is broadcasted
          .on('transactionHash', function(hash){
            // Change Swap Button for loader
            swapToLoader();
            // Change Modal to say please wait
            modalTitle.innerText = "Please wait for the transaction to be mined 🕒";
            modalBody.innerHTML = ""
            modalBody.innerText = `Meanwhile, you can check the tx status on Etherscan`;
            closeBtn.style.display = "none"
            metaMaskBtn.innerText = "Check on Etherscan";
            const etherscanUrl = (selectedEthereumNetwork == "mainnet") ? `https://etherscan.io/tx/${hash}` : `https://ropsten.etherscan.io/tx/${hash}`;
            metaMaskBtn.href = etherscanUrl
            metaMaskBtn.style.display = "";
            $('.modal').modal('show');
            })
          .catch(function(error) {
              console.log(error);
              loaderToSwap();
              // Reload page to avoid having multiple tx queued up
              location.reload();
              successful = false;
          })

        if (successful == false) return 0;

        // Change Loader for Swap Button
        loaderToSwap();

        // Display Modal for a successful swap
        modalTitle.innerText = "Swap successful 👍";
        modalBody.style.display = "none"
        closeBtn.innerText = "New Swap";
        // Re-display close button
        closeBtn.style.display = ""
        // remove event listener
        closeBtn.removeEventListener("click", executeTx, { passive: true });
        closeBtn.addEventListener("click", reloadMainPage);
        metaMaskBtn.style.display = "none";
        $('.modal').modal('show');

      }
      counter += 1;
      if(counter < 2) closeBtn.addEventListener('click', executeTx);

    } else {
      modalTitle.innerText = "Insufficient Token Balance"
      closeBtn.innerText = "Close"
      $('.modal').modal('show');
    }




  // ##############################################################

  // If User chooses to sell ERC20 TOken
  }else {

    //First, user must approve KyberNetwork contract to trade src tokens
    srcTokenContract = new web3.eth.Contract(ERC20ABI, addressToSell);

    // Check if User gave Kyber any allowance in order to skip allow tx
    allowanceAmount = await srcTokenContract.methods.allowance(fetchedUserAddress,kyberNetworkProxyAddress).call()

    if (srcAmountWei <= allowanceAmount) {
        //proceed to step 3
        console.log(`Source Amount: ${srcAmountWei} is smaller than AllowanceAmount ${allowanceAmount}`)
    } else {
        //proceed to step 2
        console.log(`Source Amount: ${srcAmountWei} is greater than AllowanceAmount ${allowanceAmount}`)
    }

    // Call balanceOf function
    let erc20Balance = await srcTokenContract.methods.balanceOf(fetchedUserAddress).call();

    if (erc20Balance >= parseInt(srcAmountWei) ) {

      // Display Modal for a successful swap
      modalTitle.innerText = "Please approve the Swap 🤖";
      // modalBody.innerText = `${srcAmountWei / srcQuantity} ${srcSymbol} for ${(srcAmount  * expectedRate) / srcQuantity} ${destSymbol}\n`
      modalBody.innerHTML = `<div id="confirm-text">${srcAmountWei / srcQuantity} ${srcSymbol} for ${(srcAmount  * expectedRate) / srcQuantity} ${destSymbol}\n</div> <div id="slippage-note">A max 3% slippage Rate may be applied in situations of larger market movements during trade execution.</div>` ;
      modalBody.style.display = "";
      closeBtn.innerText = "Approve"
      $('.modal').modal('show');

      async function approveTx() {

        transactionData1 = srcTokenContract.methods.approve(kyberNetworkProxyAddress, srcAmountWei).encodeABI()


        txReceipt = await web3.eth.sendTransaction({
            from: fetchedUserAddress, //obtained from website interface Eg. Metamask, Ledger etc.
            to: addressToSell, //srcTokenContract resluted in error as it did not provide the contracts address, but the object itself,
            data: transactionData1,
            gasPrice: chosenGasPrice
            })
            .on('transactionHash', function(hash) {

              // Alert modal to ask for confirmation of approved transaction
              modalTitle.innerText = "Now confirm the approved Swap to exchange the tokens";
              closeBtn.innerText = "Confirm"
              modalBody.innerHTML = ``
              modalBody.style.display = "none"
              $('.modal').modal('show');

              async function executeTx() {

              // ####### Start second tx ########
              // Call the trade method in Proxy Contract
              transactionData2 = kyberNetworkProxyContract.methods.trade(
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
                data: transactionData2
                }).on('transactionHash', function(hash){
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
                })
                .catch(function(error) {
                  console.log(error);
                  loaderToSwap();
              });

              // Change Loader for Swap Button
              loaderToSwap();

              // Display Modal for a successful swap
              modalTitle.innerText = "Swap successful 👍";
              modalBody.innerText = "";
              modalBody.style.display = "none"
              // Re-display close button
              closeBtn.innerText = "New Swap"
              closeBtn.style.display = ""
              closeBtn.removeEventListener("click", executeTrade, { passive: true });
              closeBtn.addEventListener("click", reloadMainPage);
              metaMaskBtn.style.display = "none";
              $('.modal').modal('show');

                // Async Ende
              }
              // Remove first event listener
              closeBtn.removeEventListener("click", approveTx, { passive: true });
              // Add event Listener to function
              closeBtn.addEventListener('click', executeTrade)
            })
            .catch(function(error) {
              console.log(error);
              loaderToSwap();
              successful = false;
            })
        if (successful == false) return 0;

      // approveTx() end
      }
      counter += 1;
      if(counter < 2) closeBtn.addEventListener('click', approveTx)

      // If token balance is less then srcAmount
    } else {
      modalTitle.innerText = "Insufficient Token Balance"
      closeBtn.innerText = "Close"
      $('.modal').modal('show');
    }
  // Else end
  }

// trade() end
}

const tradeButton = document.querySelector("#swap-button");

tradeButton.addEventListener('click', function(event) {
  event.preventDefault();
  trade();
});



// ##### BATCHING EXPERIMENT ########################################

    // // Approve
    // transactionData1 = srcTokenContract.methods.approve(kyberNetworkProxyAddress, srcAmountWei).encodeABI()

    // // Trade
    // transactionData2 = kyberNetworkProxyContract.methods.trade(
    //   addressToSell, //ERC20 srcToken
    //   srcAmountWei, //uint srcAmount
    //   addressToBuy, //ERC20 destToken
    //   fetchedUserAddress, //address destAddress => VENDOR_WALLET_ADDRESS
    //   "10000000000000000000000000000000", //uint maxDestAmount
    //   slippageRate, //uint minConversionRate
    //   "0xb779bEa600c94D0a2337A6A1ccd99ac1a8f08866" //uint walletId
    // ).encodeABI()

    // // Create first batch
    // const batch = new web3.eth.BatchRequest()

    // // Display Modal for a successful swap
    // modalTitle.innerText = "Please grant IPFSWAP permission to swap"
    // modalBody.innerText = `${srcAmountWei / srcQuantity} ${srcSymbol} for ${(srcAmount  * expectedRate) / srcQuantity} ${destSymbol}🤖` ;
    // modalBody.style.display = "";
    // closeBtn.innerText = "Approve"
    // $('.modal').modal('show');

    // // Add trade tx to back
    // batch.add(web3.eth.sendTransaction.request({
    //           from: fetchedUserAddress, //obtained from website interface Eg. Metamask, Ledger etc.
    //           to: kyberNetworkProxyAddress,
    //           data: transactionData2,
    //           },function(error) {
    //         console.log(error);
    //         })

    // )


    // // Add authorize tx to batch
    // batch.add(web3.eth.sendTransaction.request({
    //       from: fetchedUserAddress, //obtained from website interface Eg. Metamask, Ledger etc.
    //       to: addressToSell, //srcTokenContract resluted in error as it did not provide the contracts address, but the object itself,
    //       data: transactionData1
    //       }, function(error) {
    //         console.log(error);
    //       })
    // )

    // function executeBatch() {
    //   batch.execute()
    //   // Change Swap Button for loader
    //   swapToLoader();
    //   // Change Modal to say please wait
    //   modalTitle.innerText = "Please wait for the transactions to be mined";
    //   modalBody.style.display = `To check out the tx status, visit Etherscan`;
    //   closeBtn.style.display = "none"
    //   modalBody.style.display = "none"
    //   metaMaskBtn.innerText = "Check on Etherscan"
    //   metaMaskBtn.href = `https://ropsten.etherscan.io/tx/${hash}`
    //   metaMaskBtn.style.display = "";
    //   $('.modal').modal('show');
    // }

    // closeBtn.addEventListener('click', executeBatch)

    // // ####### BATCHING EXPERIMENT OVER #######################





//  #################################################################

// main();

// OLD CODE FROM ELSE PART


    // closeBtn.addEventListener('click', approveTx);

    // transactionData = kyberNetworkProxyContract.methods.trade(
    //   addressToSell, //ERC20 srcToken
    //   srcAmountWei, //uint srcAmount
    //   addressToBuy, //ERC20 destToken
    //   fetchedUserAddress, //address destAddress => VENDOR_WALLET_ADDRESS
    //   "10000000000000000000000000000000", //uint maxDestAmount
    //   slippageRate, //uint minConversionRate
    //   "0xb779bEa600c94D0a2337A6A1ccd99ac1a8f08866" //uint walletId
    // ).encodeABI()

    // // Alert modulat to ask for confirmation of approved transaction
    // document.querySelector('.modal-header').innerText = "Now confirm the approved Swap to exchange the tokens💱";
    // $('.modal').modal('show');

    // txReceipt = await web3.eth.sendTransaction({
    //     from: fetchedUserAddress, //obtained from website interface Eg. Metamask, Ledger etc.
    //     to: kyberNetworkProxyAddress,
    //     data: transactionData,
    //     }).catch(function(error) {
    //       console.log(error);
    //       loaderToSwap();
    //     })


    // Change Loader for SWAP Button
    // loaderToSwap();
