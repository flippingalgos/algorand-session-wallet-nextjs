import algosdk, { Transaction } from "algosdk";
import { PermissionCallback, SignedTxn, Wallet } from "./wallet";
import { PeraWalletConnect } from "@perawallet/connect";
import { SignerTransaction } from "@perawallet/connect/dist/util/model/peraWalletModels";

const logoInverted =
  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDgiIGhlaWdodD0iNDgiIHZpZXdCb3g9IjAgMCA0OCA0OCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjQ4IiBoZWlnaHQ9IjQ4IiByeD0iOS42IiBmaWxsPSIjRkZFRTU1Ii8+CjxwYXRoIGQ9Ik0yNi4wODE1IDExLjg1MDVDMjYuODI2IDE0LjkzNTEgMjYuNTc0NCAxNy42NDg0IDI1LjUxOTQgMTcuOTEwOUMyNC40NjQ0IDE4LjE3MzMgMjMuMDA1NyAxNS44ODU1IDIyLjI2MTIgMTIuODAwOUMyMS41MTY3IDkuNzE2MjYgMjEuNzY4NCA3LjAwMjkyIDIyLjgyMzMgNi43NDA0N0MyMy44NzgzIDYuNDc4MDIgMjUuMzM3IDguNzY1ODQgMjYuMDgxNSAxMS44NTA1WiIgZmlsbD0iYmxhY2siLz4KPHBhdGggZD0iTTM4LjM3NTIgMTQuNTAyNUMzNi43MjY0IDEyLjc1NSAzMy40NDYxIDEzLjIyODcgMzEuMDQ4NSAxNS41NjA0QzI4LjY1MDkgMTcuODkyMiAyOC4wNDM4IDIxLjE5OSAyOS42OTI2IDIyLjk0NjVDMzEuMzQxNCAyNC42OTQgMzQuNjIxNyAyNC4yMjA0IDM3LjAxOTMgMjEuODg4NkMzOS40MTY5IDE5LjU1NjkgNDAuMDI0IDE2LjI1IDM4LjM3NTIgMTQuNTAyNVoiIGZpbGw9ImJsYWNrIi8+CjxwYXRoIGQ9Ik0yNS4yNjE2IDQxLjI2MDdDMjYuMzE2NiA0MC45OTgyIDI2LjUzMTIgMzguMTMxNCAyNS43NDEgMzQuODU3NEMyNC45NTA4IDMxLjU4MzQgMjMuNDU1IDI5LjE0MjEgMjIuNCAyOS40MDQ2QzIxLjM0NTEgMjkuNjY3IDIxLjEzMDQgMzIuNTMzOSAyMS45MjA2IDM1LjgwNzhDMjIuNzEwOSAzOS4wODE4IDI0LjIwNjcgNDEuNTIzMSAyNS4yNjE2IDQxLjI2MDdaIiBmaWxsPSJibGFjayIvPgo8cGF0aCBkPSJNMTQuNTA3NCAxNi4xMDIzQzE3LjU1MSAxNi45OTk5IDE5Ljc3NSAxOC41NzQ1IDE5LjQ3NDggMTkuNjE5NEMxOS4xNzQ2IDIwLjY2NDIgMTYuNDYzOSAyMC43ODM2IDEzLjQyMDMgMTkuODg2MUMxMC4zNzY3IDE4Ljk4ODUgOC4xNTI3NCAxNy40MTM5IDguNDUyOTMgMTYuMzY5QzguNzUzMTIgMTUuMzI0MiAxMS40NjM4IDE1LjIwNDggMTQuNTA3NCAxNi4xMDIzWiIgZmlsbD0iYmxhY2siLz4KPHBhdGggZD0iTTM0LjI2MTcgMjcuOTAwN0MzNy40OTIyIDI4Ljg1MzQgMzkuODY3NiAzMC40NzI2IDM5LjU2NzQgMzEuNTE3NUMzOS4yNjcyIDMyLjU2MjMgMzYuNDA1MSAzMi42MzcxIDMzLjE3NDcgMzEuNjg0NEMyOS45NDQyIDMwLjczMTggMjcuNTY4OCAyOS4xMTI1IDI3Ljg2OSAyOC4wNjc3QzI4LjE2OTIgMjcuMDIyOCAzMS4wMzEzIDI2Ljk0ODEgMzQuMjYxNyAyNy45MDA3WiIgZmlsbD0iYmxhY2siLz4KPHBhdGggZD0iTTE3LjkzMjIgMjUuNzA4NEMxNy4xNzc0IDI0LjkyNiAxNC43MDE4IDI2LjA2NDggMTIuNDAyNyAyOC4yNTE4QzEwLjEwMzUgMzAuNDM4OSA4Ljg1MTYxIDMyLjg0NjEgOS42MDYzOCAzMy42Mjg1QzEwLjM2MTIgMzQuNDEwOSAxMi44MzY4IDMzLjI3MjIgMTUuMTM1OSAzMS4wODUxQzE3LjQzNSAyOC44OTgxIDE4LjY4NjkgMjYuNDkwOCAxNy45MzIyIDI1LjcwODRaIiBmaWxsPSJibGFjayIvPgo8L3N2Zz4K";
const logo =
  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDgiIGhlaWdodD0iNDgiIHZpZXdCb3g9IjAgMCA0OCA0OCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjQ4IiBoZWlnaHQ9IjQ4IiByeD0iOS42IiBmaWxsPSIjRkZFRTU1Ii8+CjxwYXRoIGQ9Ik0yNi4wODE1IDExLjg1MDVDMjYuODI2IDE0LjkzNTEgMjYuNTc0NCAxNy42NDg0IDI1LjUxOTQgMTcuOTEwOUMyNC40NjQ0IDE4LjE3MzMgMjMuMDA1NyAxNS44ODU1IDIyLjI2MTIgMTIuODAwOUMyMS41MTY3IDkuNzE2MjYgMjEuNzY4NCA3LjAwMjkyIDIyLjgyMzMgNi43NDA0N0MyMy44NzgzIDYuNDc4MDIgMjUuMzM3IDguNzY1ODQgMjYuMDgxNSAxMS44NTA1WiIgZmlsbD0iYmxhY2siLz4KPHBhdGggZD0iTTM4LjM3NTIgMTQuNTAyNUMzNi43MjY0IDEyLjc1NSAzMy40NDYxIDEzLjIyODcgMzEuMDQ4NSAxNS41NjA0QzI4LjY1MDkgMTcuODkyMiAyOC4wNDM4IDIxLjE5OSAyOS42OTI2IDIyLjk0NjVDMzEuMzQxNCAyNC42OTQgMzQuNjIxNyAyNC4yMjA0IDM3LjAxOTMgMjEuODg4NkMzOS40MTY5IDE5LjU1NjkgNDAuMDI0IDE2LjI1IDM4LjM3NTIgMTQuNTAyNVoiIGZpbGw9ImJsYWNrIi8+CjxwYXRoIGQ9Ik0yNS4yNjE2IDQxLjI2MDdDMjYuMzE2NiA0MC45OTgyIDI2LjUzMTIgMzguMTMxNCAyNS43NDEgMzQuODU3NEMyNC45NTA4IDMxLjU4MzQgMjMuNDU1IDI5LjE0MjEgMjIuNCAyOS40MDQ2QzIxLjM0NTEgMjkuNjY3IDIxLjEzMDQgMzIuNTMzOSAyMS45MjA2IDM1LjgwNzhDMjIuNzEwOSAzOS4wODE4IDI0LjIwNjcgNDEuNTIzMSAyNS4yNjE2IDQxLjI2MDdaIiBmaWxsPSJibGFjayIvPgo8cGF0aCBkPSJNMTQuNTA3NCAxNi4xMDIzQzE3LjU1MSAxNi45OTk5IDE5Ljc3NSAxOC41NzQ1IDE5LjQ3NDggMTkuNjE5NEMxOS4xNzQ2IDIwLjY2NDIgMTYuNDYzOSAyMC43ODM2IDEzLjQyMDMgMTkuODg2MUMxMC4zNzY3IDE4Ljk4ODUgOC4xNTI3NCAxNy40MTM5IDguNDUyOTMgMTYuMzY5QzguNzUzMTIgMTUuMzI0MiAxMS40NjM4IDE1LjIwNDggMTQuNTA3NCAxNi4xMDIzWiIgZmlsbD0iYmxhY2siLz4KPHBhdGggZD0iTTM0LjI2MTcgMjcuOTAwN0MzNy40OTIyIDI4Ljg1MzQgMzkuODY3NiAzMC40NzI2IDM5LjU2NzQgMzEuNTE3NUMzOS4yNjcyIDMyLjU2MjMgMzYuNDA1MSAzMi42MzcxIDMzLjE3NDcgMzEuNjg0NEMyOS45NDQyIDMwLjczMTggMjcuNTY4OCAyOS4xMTI1IDI3Ljg2OSAyOC4wNjc3QzI4LjE2OTIgMjcuMDIyOCAzMS4wMzEzIDI2Ljk0ODEgMzQuMjYxNyAyNy45MDA3WiIgZmlsbD0iYmxhY2siLz4KPHBhdGggZD0iTTE3LjkzMjIgMjUuNzA4NEMxNy4xNzc0IDI0LjkyNiAxNC43MDE4IDI2LjA2NDggMTIuNDAyNyAyOC4yNTE4QzEwLjEwMzUgMzAuNDM4OSA4Ljg1MTYxIDMyLjg0NjEgOS42MDYzOCAzMy42Mjg1QzEwLjM2MTIgMzQuNDEwOSAxMi44MzY4IDMzLjI3MjIgMTUuMTM1OSAzMS4wODUxQzE3LjQzNSAyOC44OTgxIDE4LjY4NjkgMjYuNDkwOCAxNy45MzIyIDI1LjcwODRaIiBmaWxsPSJibGFjayIvPgo8L3N2Zz4K";

class PeraConnectWallet implements Wallet {
  accounts: string[];
  defaultAccount: number;
  network: string;
  permissionCallback?: PermissionCallback;

  peraConnect: PeraWalletConnect;

  constructor() {
    this.accounts = [];
    this.defaultAccount = 0;

    this.peraConnect = new PeraWalletConnect();
  }

  static displayName(): string {
    return "Pera Connect";
  }
  displayName(): string {
    return PeraConnectWallet.displayName();
  }

  static img(inverted: boolean): string {
    return inverted ? logoInverted : logo;
  }

  img(inverted: boolean): string {
    return PeraConnectWallet.img(inverted);
  }

  async connect(): Promise<boolean> {
    if (await this.isConnected()) return true;
    try {
      const accounts = await this.peraConnect.connect();
      this.peraConnect.connector?.on("disconnect", this.disconnect);
      if (accounts && accounts.length) {
        this.accounts = accounts;
      }
    } catch (err) {
      return false;
    }

    return true;
  }

  async requestSessionReload() {
    try {
      const accounts = await this.peraConnect.reconnectSession();
      this.peraConnect.connector?.on("disconnect", this.disconnect);
      if (accounts && accounts.length) {
        this.accounts = accounts;
      }
    } catch (e) {
      this.accounts = [];
    }
  }

  async isConnected(): Promise<boolean> {
    await this.requestSessionReload();
    return this.accounts && this.accounts.length > 0;
  }

  disconnect() {
    this.peraConnect.disconnect();
    this.accounts = [];
  }

  async getDefaultAccount(): Promise<string> {
    if (!(await this.isConnected())) return "";
    return this.accounts[this.defaultAccount];
  }

  async signTxn(txns: Transaction[]): Promise<SignedTxn[]> {
    const defaultAddress = await this.getDefaultAccount();
    await this.connect();
    const txnsToSign: SignerTransaction[] = txns.map((txn) => {
      if (algosdk.encodeAddress(txn.from.publicKey) !== defaultAddress)
        return { txn, signers: [] };
      return { txn, signers: undefined };
    });

    const result: Uint8Array[] = await this.peraConnect.signTransaction([
      txnsToSign,
    ]);

    // tslint:disable-next-line:no-console
    console.log(result);

    return result.map((element, idx) => {
      return element
        ? {
            txID: txns[idx].txID(),
            blob: element,
          }
        : {
            txID: txns[idx].txID(),
            blob: txns[idx].toByte(),
          };
    });
  }

  signBytes(
    b: Uint8Array,
    permissionCallback?: PermissionCallback
  ): Promise<Uint8Array> {
    throw new Error("Method not implemented.");
  }

  async signTeal(
    teal: Uint8Array,
    permissionCallback?: PermissionCallback
  ): Promise<Uint8Array> {
    throw new Error("Method not implemented.");
  }
}

export default PeraConnectWallet;