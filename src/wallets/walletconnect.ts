import algosdk, { Transaction, TransactionParams } from "algosdk";
import { PermissionCallback, SignedTxn, Wallet } from "./wallet";
import { Buffer } from "buffer";

import WalletConnect from "@walletconnect/client";
import WalletConnectQRCodeModal from "algorand-walletconnect-qrcode-modal";

import { formatJsonRpcRequest } from "@json-rpc-tools/utils";

const logo =
  "data:image/svg+xml;base64,PHN2ZyBmaWxsPSJub25lIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDQwMCA0MDAiIHdpZHRoPSI0MDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPjxjbGlwUGF0aCBpZD0iYSI+PHBhdGggZD0ibTAgMGg0MDB2NDAwaC00MDB6Ii8+PC9jbGlwUGF0aD48ZyBjbGlwLXBhdGg9InVybCgjYSkiPjxjaXJjbGUgY3g9IjIwMCIgY3k9IjIwMCIgZmlsbD0iIzMzOTZmZiIgcj0iMTk5LjUiIHN0cm9rZT0iIzY2YjFmZiIvPjxwYXRoIGQ9Im0xMjIuNTE5IDE0OC45NjVjNDIuNzkxLTQxLjcyOSAxMTIuMTcxLTQxLjcyOSAxNTQuOTYyIDBsNS4xNSA1LjAyMmMyLjE0IDIuMDg2IDIuMTQgNS40NjkgMCA3LjU1NWwtMTcuNjE3IDE3LjE4Yy0xLjA3IDEuMDQzLTIuODA0IDEuMDQzLTMuODc0IDBsLTcuMDg3LTYuOTExYy0yOS44NTMtMjkuMTExLTc4LjI1My0yOS4xMTEtMTA4LjEwNiAwbC03LjU5IDcuNDAxYy0xLjA3IDEuMDQzLTIuODA0IDEuMDQzLTMuODc0IDBsLTE3LjYxNy0xNy4xOGMtMi4xNC0yLjA4Ni0yLjE0LTUuNDY5IDAtNy41NTV6bTE5MS4zOTcgMzUuNTI5IDE1LjY3OSAxNS4yOWMyLjE0IDIuMDg2IDIuMTQgNS40NjkgMCA3LjU1NWwtNzAuNyA2OC45NDRjLTIuMTM5IDIuMDg3LTUuNjA4IDIuMDg3LTcuNzQ4IDBsLTUwLjE3OC00OC45MzFjLS41MzUtLjUyMi0xLjQwMi0uNTIyLTEuOTM3IDBsLTUwLjE3OCA0OC45MzFjLTIuMTM5IDIuMDg3LTUuNjA4IDIuMDg3LTcuNzQ4IDBsLTcwLjcwMTUtNjguOTQ1Yy0yLjEzOTYtMi4wODYtMi4xMzk2LTUuNDY5IDAtNy41NTVsMTUuNjc5NS0xNS4yOWMyLjEzOTYtMi4wODYgNS42MDg1LTIuMDg2IDcuNzQ4MSAwbDUwLjE3ODkgNDguOTMyYy41MzUuNTIyIDEuNDAyLjUyMiAxLjkzNyAwbDUwLjE3Ny00OC45MzJjMi4xMzktMi4wODcgNS42MDgtMi4wODcgNy43NDggMGw1MC4xNzkgNDguOTMyYy41MzUuNTIyIDEuNDAyLjUyMiAxLjkzNyAwbDUwLjE3OS00OC45MzFjMi4xMzktMi4wODcgNS42MDgtMi4wODcgNy43NDggMHoiIGZpbGw9IiNmZmYiLz48L2c+PC9zdmc+";

class WC implements Wallet {
  accounts: string[];
  defaultAccount: number;
  network: string;
  connector: WalletConnect;
  permissionCallback?: PermissionCallback;

  constructor(network: string) {
    this.accounts = [];
    this.defaultAccount = 0;
    this.network = network;
    const bridge = "https://bridge.walletconnect.org";
    this.connector = new WalletConnect({
      bridge,
      qrcodeModal: WalletConnectQRCodeModal,
    });
  }

  async connect(cb: any): Promise<boolean> {
    // Check if connection is already established
    if (this.connector.connected) return true;

    await this.connector.createSession();

    this.connector.on("connect", (error, payload) => {
      if (error) {
        throw error;
      }
      const { accounts } = payload.params[0];
      cb(accounts);
      this.accounts = accounts;
    });

    this.connector.on("session_update", (error, payload) => {
      if (error) {
        throw error;
      }
      const { accounts } = payload.params[0];
      cb(accounts);
      this.accounts = accounts;
    });

    this.connector.on("disconnect", (error, payload) => {
      if (error) throw error;
    });

    return new Promise((resolve) => {
      const reconn = setInterval(() => {
        if (this.connector.connected) {
          clearInterval(reconn);
          resolve(true);
          return;
        }
        this.connector.connect();
      }, 100);
    });
  }

  static displayName(): string {
    return "Wallet Connect";
  }
  displayName(): string {
    return WC.displayName();
  }

  static img(inverted: boolean): string {
    return logo;
  }
  img(inverted: boolean): string {
    return WC.img(inverted);
  }

  async isConnected(): Promise<boolean> {
    return this.connector.connected;
  }

  disconnect() {
    this.connector.killSession();
  }

  async getDefaultAccount(): Promise<string> {
    if (!(await this.isConnected())) return "";
    return this.accounts[this.defaultAccount];
  }

  async signTxn(txns: Transaction[]): Promise<SignedTxn[]> {
    const defaultAddress = await this.getDefaultAccount();
    await this.connect(() => null);
    const txnsToSign = txns.map((txn) => {
      const encodedTxn = Buffer.from(
        algosdk.encodeUnsignedTransaction(txn)
      ).toString("base64");

      if (algosdk.encodeAddress(txn.from.publicKey) !== defaultAddress)
        return { txn: encodedTxn, signers: [] };
      return { txn: encodedTxn };
    });

    const request = formatJsonRpcRequest("algo_signTxn", [txnsToSign]);
    const result: string[] = await this.connector.sendCustomRequest(request);

    return result.map((element, idx) => {
      return element
        ? {
            txID: txns[idx].txID(),
            blob: new Uint8Array(Buffer.from(element, "base64")),
          }
        : {
            txID: txns[idx].txID(),
            blob: txns[idx].toByte(),
          };
    });
  }

  async sign(txn: TransactionParams): Promise<SignedTxn> {
    throw new Error("Method not implemented.");
  }

  async signBytes(b: Uint8Array): Promise<Uint8Array> {
    throw new Error("Method not implemented.");
  }

  async signTeal(teal: Uint8Array): Promise<Uint8Array> {
    throw new Error("Method not implemented.");
  }
}

export default WC;