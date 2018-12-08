console.log(src);
console.log(dest);
console.log(srcQty);

async function getExpectedRate() {

  let expectedRate;
  let slippageRate;

  ({ expectedRate, slippageRate } = await kyberNetworkContract.methods.getExpectedRate(
  src, // srcToken
  dest, // destToken
  web3.utils.toWei('1') // srcQty
  ).call());
  console.log(expectedRate);
  console.log(slippageRate);

}

// EXPECTED RATE END

window.addEventListener('load', function() {
  getExpectedRate()
})


  // Set the provider you want from Web3.providers
// Checking if Web3 has been injected by the browser (Mist/MetaMask)
//if (typeof web3 !== 'undefined') {
  // Use Mist/MetaMask's provider
 // web3js = new Web3(web3.currentProvider);
//} else {
  // Handle the case where the user doesn't have Metamask installed
  // Probably show them a message prompting them to install Metamask
//}

// Now you can start your app & access web3 freely:

// Call getExpectedRata and do something with the result:


