# dHEDGE Bot SDK Example

For longer version please refer to this Medium post.

For a quickstart stay here:

Clone this repo and copy `.env.example` into `.env` and prefill the variables like mnemonic seed for the account and Web3 provider details:

```
MNEMONIC="magna volatile mice juggle ubiquitous nudist …"
ACCOUNT_ID="0"
PROVIDER="https://ropsten.infura.io/v3/your-code-here"
//Ropsten
FACTORY_ADDRESS="0xdd1Ee9e21bbd0012d1C710Ed94057A3CBE3E02D7"
//Mainnet
//FACTORY_ADDRESS="0x03d20ef9bdc19736f5e8baf92d02c8661a5941f7"
```


Install the dependencies with `npm i` and run the example with `node rebalance.js`.

If you have created a pool already update: 

```
const CREATE_POOL = false
const POOL_ADDRESS = '0xYourAwesomePool'
```
