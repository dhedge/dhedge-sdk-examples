# dHEDGE Bot SDK Example

For longer version please refer to this [Medium](https://medium.com/dhedge-org/dhedge-bot-sdk-e825e6f469c8) post.

For a quickstart stay here:

Clone this repo and copy `.env.example` into `.env` and prefill the variables like mnemonic seed for the account and Web3 provider details:

```
MNEMONIC="magna volatile mice juggle ubiquitous nudist …"
ACCOUNT_ID="0"
PROVIDER="https://kovan.infura.io/v3/your-code-here"
//Ropsten
FACTORY_ADDRESS="0xc3F42F64AD9A7C55D4e5970459f8CE8069456408"
//Mainnet
//FACTORY_ADDRESS="0x03d20ef9bdc19736f5e8baf92d02c8661a5941f7"
```

Install the dependencies with `npm i` and run the example with `node rebalance.js`.

If you have created a pool already update:

```
const CREATE_POOL = false
const POOL_ADDRESS = '0xYourAwesomePool'
```
