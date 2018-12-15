// Set Infura as Web3 provider

function test() {

  web3.eth.sendTransaction({
      from: '0xAC5781f6eEC1f0Cb9B353aCBB745f813cEf68311',
      to: '0xb779bEa600c94D0a2337A6A1ccd99ac1a8f08866',
      value: '1000000000000000',
      gasPrice: '0x09184e72a000',
      gasLimit: '0x2710'
  })
}

test();
