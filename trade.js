// Conduct the SWAP / TRADE

document.getElementById("swap-button").addEventListener('submit', async function executeTrade(event) {
  event.preventDefault();

  console.log(src);
  console.log(srcAmount);
  console.log(dest);
  console.log(destAddress);
  console.log(maxDestAmount);
  console.log(minConversionRate);
  console.log(walletId);

  // Set provider to Metamask
  // const myProvider = new Web3(web3.currentProvider);
  // web3.setProvider(myProvider)

  console.log("hi");

  transactionData = KyberNetworkProxy.methods.trade(
    src,
    srcAmount,
    dest,
    destAddress,
    maxDestAmount,
    minConversionRate,
    walletId
  ).encodeABI()

  txReceipt = await web3.eth.sendTransaction({
    from: USER_WALLET_ADDRESS, //obtained from web3 interface
    to: KYBER_NETWORK_PROXY_ADDRESS,
    data: transactionData
  });

})
//   transactionData = kyberNetworkContract.trade(src, srcAmount, dest, destAddress, maxDestAmount, minConversionRate, walletId, function (err, res) {

//     if (!err) {
//       maxRateInWei = String(res[0]);
//       console.log(maxRateInWei);
//       slippageRateInWei = String(res[1]);
//       console.log(slippageRateInWei);
//       console.log("no error")
//     } else {
//       console.log("error")
//       console.log(err);
//     }
//   }).getData();
//   // result = await sendTx(txObject);
//   // console.log(transactionData);
//   // transactionData.getData();
//   //     console.log("hi2");


//   // Last Call
//   console.log(transactionData);
//   txReceipt = await web3.eth.sendTransaction({
//       from: "0x24a23af4c7a1449a1669d7f1bfdb116480b8e691", //obtained from web3 interface
//       to: "0x39CC6802cF1625C30548B57D885932CB381EB4a4",
//       data: transactionData
//     }, function (err, res) {

//       if (!err) {
//         maxRateInWei = String(res[0]);
//         console.log(maxRateInWei);
//         slippageRateInWei = String(res[1]);
//         console.log(slippageRateInWei);
//         console.log("no error")
//       } else {
//         console.log("error")
//         console.log(err);
//       }})
// })

