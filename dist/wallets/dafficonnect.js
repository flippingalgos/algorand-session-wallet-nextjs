"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const algosdk_1 = __importDefault(require("algosdk"));
const connect_1 = require("@daffiwallet/connect");
const logoInverted = "data:image/svg+xml;base64,PHN2ZyAgd2lkdGg9IjQ0IiBoZWlnaHQ9IjQ0IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxOTk5LjQ0IDE5OTkuNDQiPjxkZWZzPjxzdHlsZT4uYntmaWxsOiMyM2I3YTU7fS5je2ZpbGw6I2Y1OTQxZjt9LmR7ZmlsbDojZTUxZTI1O30uZXtmaWxsOiNlMWNhMjA7fS5me2ZpbGw6IzY5Y2NiMjt9PC9zdHlsZT48L2RlZnM+PHBhdGggY2xhc3M9ImUiIGQ9Ik0xNjUwLjc0LDE1NDQuNzJsLTE3My45LDI5OS44YzE0OS04NS4yOCwyNzMuMDEtMjA5LjI3LDM1OS4wNi0zNTguMTMsLjE1LS4yNiwuMy0uNTIsLjQ1LS43OGwtNDAuMDQtMTkxLjgxLTE0NS41NiwyNTAuOTNaIi8+PHBhdGggY2xhc3M9ImMiIGQ9Ik0xNzk2LjMsMTI5My43OWw0MC4wNCwxOTEuODFjODIuMjUtMTQyLjYyLDEyOS42OC0zMDguMDUsMTI5Ljg3LTQ4NC43M2wtMTY5LjkxLDI5Mi45MVoiLz48cGF0aCBjbGFzcz0iYiIgZD0iTTY5Ni4wMiwxNDIzLjY0Yy04Ny44OC01Ni41LTE2Ny4zNS0xNDMuNTktMjAyLjExLTI0Mi44Ni00MC44NS0xMTYuNjQtNDkuOTctMjUyLjc4LDEuMzQtMzY3Ljc0LDM1LjM2LTc5LjI1LDk1LjY5LTE0NS4zNSwxNjMuOTEtMTk3LjkxLDIzLjUxLTE4LjExLDQ4LjE3LTM0LjgxLDczLjgyLTQ5Ljc0LDYuNzQtMy45NSwyMS43NC0xNi4yNSwzMC4wNC0xNi4yNWgxLjM5bC0yNDguNzUtMzkwLjJMMjE4LjY2LDY3Ny4yNiwzMy4yMywxMDAwLjg4bDMxNS40Nyw1NDMuODQsMTczLjksMjk5LjgsMjE2LjA4LTM5Ny43OWMtMTUuMDctNS44LTI5LjM2LTE0LjUyLTQyLjY3LTIzLjFaIi8+PHBhdGggY2xhc3M9ImMiIGQ9Ik04MS41Nyw2OTYuOTFjLTMxLjEzLDk1LjM0LTQ4LjM5LDE5Ni45OS00OC4zOSwzMDIuODFsLjA1LDEuMTYsMTg1LjQzLTMyMy42Mi0xMzcuMDksMTkuNjVaIi8+PHBhdGggY2xhc3M9ImUiIGQ9Ik01MTUuNjQsMTU4LjkzQzMxMi4yMiwyNzcuNjUsMTU2LjE1LDQ2OC43MSw4MS41Nyw2OTYuOTFsMTM3LjA5LTE5LjY1TDUxNS42NCwxNTguOTNaIi8+PHBhdGggY2xhc3M9ImUiIGQ9Ik0zMy4yMywxMDAwLjg4Yy4xOSwxNzcsNDcuNzksMzQyLjcyLDEzMC4zMiw0ODUuNTEsNTQuMDIsMTguODcsMTI0LjkxLDQyLjQxLDE4NS4xNSw1OC4zM0wzMy4yMywxMDAwLjg4WiIvPjxwYXRoIGNsYXNzPSJjIiBkPSJNMTYzLjU1LDE0ODYuMzljODYuMDUsMTQ4Ljg2LDIxMC4wNiwyNzIuODQsMzU5LjA2LDM1OC4xM2wtMTczLjktMjk5LjhjLTYwLjI0LTE1LjkyLTEzMS4xNC0zOS40Ni0xODUuMTUtNTguMzNaIi8+PHBhdGggY2xhc3M9ImQiIGQ9Ik05OTguOTUsMTU4Ljg2bDQ4NC44NSwuMDdDMTM0MS42Niw3NS45OCwxMTc2LjY4LDI4LjEyLDEwMDAuNDksMjcuNzNoMGMtLjI2LS4wMS0uNTEsMC0uNzcsMC0uMjYsMC0uNTEsMC0uNzcsMGgwYy0xNzYuMTksLjQtMzQxLjE3LDQ4LjI2LTQ4My4zMSwxMzEuMjFsNDgzLjMxLS4wN1oiLz48cG9seWdvbiBjbGFzcz0iZiIgcG9pbnRzPSIxMjM1LjA0IDU0OS4xNCAxNDgzLjggMTU4LjkzIDk5OC45NSAxNTguODYgNTE1LjY0IDE1OC45MyA3NjQuNCA1NDkuMTQgMTIzNS4wNCA1NDkuMTQiLz48cGF0aCBjbGFzcz0iYiIgZD0iTTE0ODMuOCwxNTguOTNsLTI0OC43NSwzOTAuMmgxLjM5YzguMywwLDIzLjI5LDEyLjMsMzAuMDQsMTYuMjUsMjUuNjQsMTQuOTQsNTAuMywzMS42NCw3My44Miw0OS43NCw2OC4yMiw1Mi41NiwxMjguNTQsMTE4LjY2LDE2My45MSwxOTcuOTEsNTEuMzEsMTE0Ljk2LDQyLjE5LDI1MS4xMSwxLjM0LDM2Ny43NC0zNC43Niw5OS4yNy0xMTQuMjMsMTg2LjM2LTIwMi4xMSwyNDIuODYtMTMuMzEsOC41OC0yNy42LDE3LjMtNDIuNjcsMjMuMWwyMTYuMDgsMzk3Ljc5LDE3My45LTI5OS44LDMxNS40Ny01NDMuODQtMTg1LjQzLTMyMy42MkwxNDgzLjgsMTU4LjkzWiIvPjxwYXRoIGNsYXNzPSJlIiBkPSJNMTc4MC43OCw2NzcuMjZsMTg1LjQzLDMyMy42MiwuMDUtMS4xNmMwLTEwNS44Mi0xNy4yNi0yMDcuNDgtNDguMzktMzAyLjgxbC0xMzcuMDktMTkuNjVaIi8+PHBhdGggY2xhc3M9ImMiIGQ9Ik0xNzgwLjc4LDY3Ny4yNmwxMzcuMDksMTkuNjVjLTc0LjU4LTIyOC4xOS0yMzAuNjUtNDE5LjI2LTQzNC4wNy01MzcuOTdsMjk2Ljk4LDUxOC4zMloiLz48cGF0aCBjbGFzcz0iZCIgZD0iTTk5OC45NSwxODQ2LjkzaDBsLTQ3Ni4zNC0yLjQxYzE0MC41OCw4MC40NywzMDMuMDUsMTI2LjgxLDQ3Ni4zNCwxMjcuMTloMGMuMjYsLjAxLC41MSwwLC43Nywwcy41MSwwLC43NywwaDBjMTczLjI5LS4zOSwzMzUuNzYtNDYuNzIsNDc2LjM0LTEyNy4ybC00NzcuODgsMi40MVoiLz48cGF0aCBjbGFzcz0iZiIgZD0iTTEyNTAuOTEsMTQ1MC4yMWwtMjUxLjE5LC45Mi0yNTEuMTktLjkyYy0zLjM0LS45My02LjU5LTIuMjItOS44NC0zLjQ3bC0yMTYuMDgsMzk3Ljc5LDQ3Ni4zNCwyLjRoMGw0NzcuODgtMi40LTIxNi4wOC0zOTcuNzljLTMuMjYsMS4yNS02LjUxLDIuNTUtOS44NCwzLjQ3WiIvPjwvc3ZnPg==";
const logo = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDgiIGhlaWdodD0iNDgiIHZpZXdCb3g9IjAgMCA0OCA0OCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjQ4IiBoZWlnaHQ9IjQ4IiByeD0iOS42IiBmaWxsPSIjRkZFRTU1Ii8+CjxwYXRoIGQ9Ik0yNi4wODE1IDExLjg1MDVDMjYuODI2IDE0LjkzNTEgMjYuNTc0NCAxNy42NDg0IDI1LjUxOTQgMTcuOTEwOUMyNC40NjQ0IDE4LjE3MzMgMjMuMDA1NyAxNS44ODU1IDIyLjI2MTIgMTIuODAwOUMyMS41MTY3IDkuNzE2MjYgMjEuNzY4NCA3LjAwMjkyIDIyLjgyMzMgNi43NDA0N0MyMy44NzgzIDYuNDc4MDIgMjUuMzM3IDguNzY1ODQgMjYuMDgxNSAxMS44NTA1WiIgZmlsbD0iYmxhY2siLz4KPHBhdGggZD0iTTM4LjM3NTIgMTQuNTAyNUMzNi43MjY0IDEyLjc1NSAzMy40NDYxIDEzLjIyODcgMzEuMDQ4NSAxNS41NjA0Q";

class DaffiConnectWallet {
    constructor() {
        this.accounts = [];
        this.defaultAccount = 0;
        this.daffiConnect = new connect_1.DaffiWalletConnect();
    }
    static displayName() {
        return "Daffi Connect";
    }
    displayName() {
        return DaffiConnectWallet.displayName();
    }
    static img(inverted) {
        return inverted ? logoInverted : logo;
    }
    img(inverted) {
        return DaffiConnectWallet.img(inverted);
    }
    connect() {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            if (yield this.isConnected())
                return true;
            try {
                const accounts = yield this.daffiConnect.connect();
                (_a = this.daffiConnect.connector) === null || _a === void 0 ? void 0 : _a.on("disconnect", this.disconnect);
                if (accounts && accounts.length) {
                    this.accounts = accounts;
                }
            }
            catch (err) {
                return false;
            }
            return true;
        });
    }
    requestSessionReload() {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const accounts = yield this.daffiConnect.reconnectSession();
                (_a = this.daffiConnect.connector) === null || _a === void 0 ? void 0 : _a.on("disconnect", this.disconnect);
                if (accounts && accounts.length) {
                    this.accounts = accounts;
                }
            }
            catch (e) {
                this.accounts = [];
            }
        });
    }
    isConnected() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.requestSessionReload();
            return this.accounts && this.accounts.length > 0;
        });
    }
    disconnect(callback) {
        if (this.daffiConnect) {
            if (callback && typeof callback === 'function') {
                this.daffiConnect.disconnect(callback);
            } else {
                this.daffiConnect.disconnect();
            }
        }
        this.accounts = [];
    }
    getDefaultAccount() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!(yield this.isConnected()))
                return "";
            return this.accounts[this.defaultAccount];
        });
    }
    signTxn(txns) {
        return __awaiter(this, void 0, void 0, function* () {
            const defaultAddress = yield this.getDefaultAccount();
            yield this.connect();
            const txnsToSign = txns.map((txn) => {
                if (algosdk_1.default.encodeAddress(txn.from.publicKey) !== defaultAddress)
                    return { txn, signers: [] };
                return { txn, signers: undefined };
            });
            const result = yield this.daffiConnect.signTransaction([
                txnsToSign,
            ]);
            // tslint:disable-next-line:no-console
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
        });
    }
    signBytes(b, permissionCallback) {
        throw new Error("Method not implemented.");
    }
    signTeal(teal, permissionCallback) {
        return __awaiter(this, void 0, void 0, function* () {
            throw new Error("Method not implemented.");
        });
    }
}
exports.default = DaffiConnectWallet;