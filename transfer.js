const nearAPI = require('near-api-js');
const bs58 = require('bs58');

Transfer = {
  init: async function() {
    const keyStore = new nearAPI.keyStores.UnencryptedFileSystemKeyStore('./private-keys');

    const accountSending = 'alice.dev-1595360123360-4363521';
    const accountReceiving = 'bob.dev-1595360123360-4363521';
    const nonce = 4;
    const config = {
      networkId: 'default',
      nodeUrl: 'https://rpc.testnet.near.org',
      walletUrl: 'https://wallet.testnet.near.org',
    }

    const near = await nearAPI.connect(Object.assign({ deps: { keyStore: keyStore } }, config))
    const status = await near.connection.provider.status();

    let txHash, signedTx;
    try {
      [txHash, signedTx] = await nearAPI.transactions.signTransaction(
        accountReceiving,
        nonce,
        [nearAPI.transactions.transfer('1000000000000000000000000')],
        Buffer.from(bs58.decode(status.sync_info.latest_block_hash)),
        near.connection.signer,
        accountSending,
        near.connection.networkId
      );
      console.log('txHash', txHash);
      console.log('signedTx', signedTx);
      const res = await near.connection.provider.sendTransaction(signedTx);
      console.log('Result of transfer:', res);
    } catch (e) {
      console.error(e);
    }
  }
};

Transfer.init();
