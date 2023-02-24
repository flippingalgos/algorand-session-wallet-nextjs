import AlgoSignerWallet from "./wallets/algosigner";
import MyAlgoConnectWallet from "./wallets/myalgoconnect";
import InsecureWallet from "./wallets/insecure";
import WC from "./wallets/walletconnect";
import PeraConnectWallet from "./wallets/peraconnect";
import { PermissionCallback, Wallet, SignedTxn } from "./wallets/wallet";
import { Transaction, TransactionSigner } from "algosdk";
export { PermissionResult, PermissionCallback, Wallet, SignedTxn, } from "./wallets/wallet";
export declare const allowedWallets: {
    "wallet-connect": typeof WC;
    "pera-connect": typeof PeraConnectWallet;
    "algo-signer": typeof AlgoSignerWallet;
    "my-algo-connect": typeof MyAlgoConnectWallet;
    "insecure-wallet": typeof InsecureWallet;
};
export declare class SessionWallet {
    wallet: Wallet;
    wname: string;
    network: string;
    permissionCallback?: PermissionCallback;
    constructor(network: string, permissionCallback?: PermissionCallback, wname?: string);
    connect(): Promise<boolean>;
    connected(): Promise<boolean>;
    getSigner(): TransactionSigner;
    setAccountList(accts: string[]): void;
    accountList(): string[];
    setAccountIndex(idx: number): void;
    accountIndex(): number;
    setWalletPreference(wname: string): void;
    walletPreference(): string;
    setMnemonic(m: string): void;
    mnemonic(): string;
    disconnect(): void;
    getDefaultAccount(): Promise<string>;
    signTxn(txns: Transaction[]): Promise<SignedTxn[]>;
}
