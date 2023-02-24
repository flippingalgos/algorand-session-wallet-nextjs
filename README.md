# algorand-session-wallet

Upgraded to work on Next JS 11.x / Added Native pera-connect / Plans to intergrate defly-connect

a merged blend of: https://github.com/barnjamin/algorand-session-wallet-example
and https://github.com/matamicenclimate/algorand-session-wallet2 and some other changes along the way. 

```sh
yarn add algorand-session-wallet
```

```sh
npm -i algorand-session-wallet
```

```js
const sw = new SessionWallet("TestNet", "algosigner-wallet")
if(!sw.connect()) return alert("Couldnt connect")

//...

const accts = sw.accountList()

//...

sw.signTxn([txnblobs])

//...

sw.disconnect()

```
