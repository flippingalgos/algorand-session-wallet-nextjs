import AlgoSignerWallet from "./wallets/algosigner";
import MyAlgoConnectWallet from "./wallets/myalgoconnect";
import InsecureWallet from "./wallets/insecure";
import WC from "./wallets/walletconnect";
import { PermissionCallback, Wallet, SignedTxn } from "./wallets/wallet";
import { Transaction, TransactionSigner } from "algosdk";
//import MagicLink from "./wallets/magiclink";
import PeraConnectWallet from "./wallets/peraconnect";
import DeflyConnectWallet from "./wallets/deflyconnect";

export {
  PermissionResult,
  PermissionCallback,
  Wallet,
  SignedTxn,
} from "./wallets/wallet";

export const allowedWallets = {
  "wallet-connect": WC,
  "algo-signer": AlgoSignerWallet,
  "my-algo-connect": MyAlgoConnectWallet,
  "insecure-wallet": InsecureWallet,
  //"magic-link": MagicLink,
  "pera-connect": PeraConnectWallet,
  "defly-connect": DeflyConnectWallet,
};

const walletPreferenceKey = "wallet-preference";
const acctListKey = "acct-list";
const acctPreferenceKey = "acct-preference";
const mnemonicKey = "mnemonic";

export class SessionWallet {
  wallet: Wallet;
  wname: string;
  network: string;
  //apiKey: string;
  permissionCallback?: PermissionCallback;
  //rpcURL: string;
  //email: string;

  constructor(
    network: string,
    permissionCallback?: PermissionCallback,
    wname?: string,
    //email?: string,
    //apiKey?: string,
    //magiclinkRpcURL?: string
  ) {
    if (wname) this.setWalletPreference(wname);

    this.network = network;

    this.wname = this.walletPreference();

    if (permissionCallback) this.permissionCallback = permissionCallback;

    if (!(this.wname in allowedWallets)) return;

    //this.apiKey = apiKey;
    //this.rpcURL = magiclinkRpcURL;
    //this.email = email;
    this.wallet = new allowedWallets[this.wname](network);
    this.wallet.permissionCallback = this.permissionCallback;
    this.wallet.accounts = this.accountList();
    this.wallet.defaultAccount = this.accountIndex();
  }

  async connect(): Promise<boolean> {
    if (this.wallet === undefined) return false;

    switch (this.wname) {
      case "insecure-wallet":
        const storedMnemonic = this.mnemonic();

        const mnemonic = storedMnemonic
          ? storedMnemonic
          : prompt(
              "Paste your mnemonic space delimited (DO NOT USE WITH MAINNET ACCOUNTS)"
            );

        if (!mnemonic) return false;

        if (await this.wallet.connect(mnemonic)) {
          this.setMnemonic(mnemonic);
          this.setAccountList(this.wallet.accounts);
          this.wallet.defaultAccount = this.accountIndex();
          return true;
        }

        break;
      /* case "magic-link":
        if (
          await this.wallet.connect({
            email: this.email,
            apiKey: this.apiKey,
            rpcURL: this.rpcURL,
          })
        ) {
          this.setAccountList(this.wallet.accounts);
          this.wallet.defaultAccount = this.accountIndex();
          return true;
        }

        break; */
      case "wallet-connect":
        await this.wallet.connect((acctList) => {
          this.setAccountList(acctList);
          this.wallet.defaultAccount = this.accountIndex();
        });

        return true;
      default:
        if (await this.wallet.connect()) {
          this.setAccountList(this.wallet.accounts);
          this.wallet.defaultAccount = this.accountIndex();
          return true;
        }

        break;
    }

    // Fail
    this.disconnect();
    return false;
  }

  async connected(): Promise<boolean> {
    return this.wallet !== undefined && (await this.wallet.isConnected());
  }

  getSigner(): TransactionSigner {
    return (txnGroup: Transaction[], indexesToSign: number[]) => {
      return Promise.resolve(this.signTxn(txnGroup)).then((txns) => {
        return txns
          .map((tx) => {
            return tx.blob;
          })
          .filter((_, index) => indexesToSign.includes(index));
      });
    };
  }

  setAccountList(accts: string[]) {
    sessionStorage.setItem(acctListKey, JSON.stringify(accts));
  }
  accountList(): string[] {
    if (typeof window !== "undefined") {
        const accts = sessionStorage.getItem(acctListKey);
        return accts === "" || accts === null ? [] : JSON.parse(accts);
    }
  }

  setAccountIndex(idx: number) {
    if (typeof window !== "undefined") {
        this.wallet.defaultAccount = idx;
        sessionStorage.setItem(acctPreferenceKey, idx.toString());
    }
  }
  accountIndex(): number {
    if (typeof window !== "undefined") {
        const idx = sessionStorage.getItem(acctPreferenceKey);
        return idx === null || idx === "" ? 0 : parseInt(idx, 10);
    }
  }

  setWalletPreference(wname: string) {
    if (typeof window !== "undefined") {
        this.wname = wname;
        sessionStorage.setItem(walletPreferenceKey, wname);
    }
  }
  walletPreference(): string {
    if (typeof window !== "undefined") {
        const wp = sessionStorage.getItem(walletPreferenceKey);
        return wp === null ? "" : wp;
    }
  }

  setMnemonic(m: string) {
    sessionStorage.setItem(mnemonicKey, m);
  }
  mnemonic(): string {
    const mn = sessionStorage.getItem(mnemonicKey);
    return mn === null ? "" : mn;
  }

  disconnect() {
    if (this.wallet !== undefined) this.wallet.disconnect();
    sessionStorage.setItem(walletPreferenceKey, "");
    sessionStorage.setItem(acctPreferenceKey, "");
    sessionStorage.setItem(acctListKey, "");
    sessionStorage.setItem(mnemonicKey, "");
  }

  async getDefaultAccount() {
    if (!(this.connected())) return "";
    return this.wallet.getDefaultAccount();
  }

  async signTxn(txns: Transaction[], forceAuth = false): Promise<SignedTxn[]> {
    if (!(await this.connected()) && !(await this.connect())) return [];
    return this.wallet.signTxn(txns, forceAuth);
  }
}