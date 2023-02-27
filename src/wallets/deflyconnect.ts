import algosdk, { Transaction } from "algosdk";
import { PermissionCallback, SignedTxn, Wallet } from "./wallet";
import { DeflyWalletConnect } from "@blockshake/defly-connect";
import { SignerTransaction } from "@blockshake/defly-connect/dist/util/model/deflyWalletModels";

const logoInverted =
  "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+CjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+Cjxzdmcgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4bWw6c3BhY2U9InByZXNlcnZlIiB4bWxuczpzZXJpZj0iaHR0cDovL3d3dy5zZXJpZi5jb20vIiBzdHlsZT0iZmlsbC1ydWxlOmV2ZW5vZGQ7Y2xpcC1ydWxlOmV2ZW5vZGQ7c3Ryb2tlLWxpbmVqb2luOnJvdW5kO3N0cm9rZS1taXRlcmxpbWl0OjI7Ij4KICAgIDxyZWN0IHg9IjAiIHk9IjAiIHdpZHRoPSIxMDI0IiBoZWlnaHQ9IjEwMjQiLz4KICAgIDxnIHRyYW5zZm9ybT0ibWF0cml4KDEuNjgyMDksMCwwLDEuNjgyMDksMjI2LjM2OCwyMTIuODE4KSI+CiAgICAgICAgPHBhdGggZD0iTTMyNy4wNDksMjgwLjE5MkwxNjkuNTI0LDEzTDEyLDI4MC4xOTJMMTY5LjUyNCwxODkuMDg0TDMyNy4wNDksMjgwLjE5MloiIHN0eWxlPSJmaWxsOndoaXRlO2ZpbGwtcnVsZTpub256ZXJvOyIvPgogICAgPC9nPgogICAgPGcgdHJhbnNmb3JtPSJtYXRyaXgoMS42ODIwOSwwLDAsMS42ODIwOSwyMjYuMzY4LDIxMi44MTgpIj4KICAgICAgICA8cGF0aCBkPSJNMjk5LjU0NiwzMDdMMTY5LjUyNSwyMzguNDczTDM5LjUwNCwzMDdMMTY5LjUyNSwyNjQuNjdMMjk5LjU0NiwzMDdaIiBzdHlsZT0iZmlsbDp3aGl0ZTtmaWxsLXJ1bGU6bm9uemVybzsiLz4KICAgIDwvZz4KPC9zdmc+Cg==";
const logo =
  "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+CjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+Cjxzdmcgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4bWw6c3BhY2U9InByZXNlcnZlIiB4bWxuczpzZXJpZj0iaHR0cDovL3d3dy5zZXJpZi5jb20vIiBzdHlsZT0iZmlsbC1ydWxlOmV2ZW5vZGQ7Y2xpcC1ydWxlOmV2ZW5vZGQ7c3Ryb2tlLWxpbmVqb2luOnJvdW5kO3N0cm9rZS1taXRlcmxpbWl0OjI7Ij4KICAgIDxyZWN0IHg9IjAiIHk9IjAiIHdpZHRoPSIxMDI0IiBoZWlnaHQ9IjEwMjQiLz4KICAgIDxnIHRyYW5zZm9ybT0ibWF0cml4KDEuNjgyMDksMCwwLDEuNjgyMDksMjI2LjM2OCwyMTIuODE4KSI+CiAgICAgICAgPHBhdGggZD0iTTMyNy4wNDksMjgwLjE5MkwxNjkuNTI0LDEzTDEyLDI4MC4xOTJMMTY5LjUyNCwxODkuMDg0TDMyNy4wNDksMjgwLjE5MloiIHN0eWxlPSJmaWxsOndoaXRlO2ZpbGwtcnVsZTpub256ZXJvOyIvPgogICAgPC9nPgogICAgPGcgdHJhbnNmb3JtPSJtYXRyaXgoMS42ODIwOSwwLDAsMS42ODIwOSwyMjYuMzY4LDIxMi44MTgpIj4KICAgICAgICA8cGF0aCBkPSJNMjk5LjU0NiwzMDdMMTY5LjUyNSwyMzguNDczTDM5LjUwNCwzMDdMMTY5LjUyNSwyNjQuNjdMMjk5LjU0NiwzMDdaIiBzdHlsZT0iZmlsbDp3aGl0ZTtmaWxsLXJ1bGU6bm9uemVybzsiLz4KICAgIDwvZz4KPC9zdmc+Cg==";

class DeflyConnectWallet implements Wallet {
  accounts: string[];
  defaultAccount: number;
  network: string;
  permissionCallback?: PermissionCallback;

  deflyConnect: DeflyWalletConnect;

  constructor() {
    this.accounts = [];
    this.defaultAccount = 0;

    this.deflyConnect = new DeflyWalletConnect();
  }

  static displayName(): string {
    return "Defly Connect";
  }
  displayName(): string {
    return DeflyConnectWallet.displayName();
  }

  static img(inverted: boolean): string {
    return inverted ? logoInverted : logo;
  }

  img(inverted: boolean): string {
    return DeflyConnectWallet.img(inverted);
  }

  async connect(): Promise<boolean> {
    if (await this.isConnected()) return true;
    try {
      const accounts = await this.deflyConnect.connect();
      this.deflyConnect.connector?.on("disconnect", this.disconnect);
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
      const accounts = await this.deflyConnect.reconnectSession();
      this.deflyConnect.connector?.on("disconnect", this.disconnect);
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
    this.deflyConnect.disconnect();
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

    const result: Uint8Array[] = await this.deflyConnect.signTransaction([
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

export default DeflyConnectWallet;