import { Transaction } from "algosdk";
import { PermissionCallback, SignedTxn, Wallet } from "./wallet";
import { DeflyWalletConnect } from "@blockshake/defly-connect";
declare class DeflyConnectWallet implements Wallet {
    accounts: string[];
    defaultAccount: number;
    network: string;
    permissionCallback?: PermissionCallback;
    peraConnect: DeflyWalletConnect;
    constructor();
    static displayName(): string;
    displayName(): string;
    static img(inverted: boolean): string;
    img(inverted: boolean): string;
    connect(): Promise<boolean>;
    requestSessionReload(): Promise<void>;
    isConnected(): Promise<boolean>;
    disconnect(): void;
    getDefaultAccount(): Promise<string>;
    signTxn(txns: Transaction[]): Promise<SignedTxn[]>;
    signBytes(b: Uint8Array, permissionCallback?: PermissionCallback): Promise<Uint8Array>;
    signTeal(teal: Uint8Array, permissionCallback?: PermissionCallback): Promise<Uint8Array>;
}
export default DeflyConnectWallet;