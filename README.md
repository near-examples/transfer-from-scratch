Transferring Ⓝ from scratch with near-api-js
===

This repository is intended to be used by the command line of NodeJS. It aims to show how to sign a transaction at a slightly lower level than some of the other NEAR examples located at https://near.dev

**Usage**:

    yarn
    node transfer.js
    
Note: this simple script is for demonstration purposes and the `nonce` may need to be increased. There is no automatic incrementing.

A good way to check that this script is successful is to use the NEAR CLI tool. Install it with:

    npm install -g near-cli
    
Then, assuming the private keys contained in this repository exist, run:

    near state alice.dev-1595360123360-4363521 && near state bob.dev-1595360123360-4363521    

This will show details of these two accounts, including a key called `formattedAmount` which is a human-readable value representing how much Ⓝ each account has.

After observing this, run:

    node transfer.js
    
Run the `near state…` command again and observe that the amounts have indeed changed during the transfer.

There are full-access private keys stored in the `./private-keys` directory. If these accounts are eventually deleted, please replace with full-access, unencrypted filestore keys (JSON files typically found in `~/.near-credentials/default` for instance) and change the variable names of `accountSending` and `accountReceiving` in `transfer.js`. 
