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
const connect_1 = require("@perawallet/connect");
const logoInverted = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDgiIGhlaWdodD0iNDgiIHZpZXdCb3g9IjAgMCA0OCA0OCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjQ4IiBoZWlnaHQ9IjQ4IiByeD0iOS42IiBmaWxsPSIjRkZFRTU1Ii8+CjxwYXRoIGQ9Ik0yNi4wODE1IDExLjg1MDVDMjYuODI2IDE0LjkzNTEgMjYuNTc0NCAxNy42NDg0IDI1LjUxOTQgMTcuOTEwOUMyNC40NjQ0IDE4LjE3MzMgMjMuMDA1NyAxNS44ODU1IDIyLjI2MTIgMTIuODAwOUMyMS41MTY3IDkuNzE2MjYgMjEuNzY4NCA3LjAwMjkyIDIyLjgyMzMgNi43NDA0N0MyMy44NzgzIDYuNDc4MDIgMjUuMzM3IDguNzY1ODQgMjYuMDgxNSAxMS44NTA1WiIgZmlsbD0iYmxhY2siLz4KPHBhdGggZD0iTTM4LjM3NTIgMTQuNTAyNUMzNi43MjY0IDEyLjc1NSAzMy40NDYxIDEzLjIyODcgMzEuMDQ4NSAxNS41NjA0QzI4LjY1MDkgMTcuODkyMiAyOC4wNDM4IDIxLjE5OSAyOS42OTI2IDIyLjk0NjVDMzEuMzQxNCAyNC42OTQgMzQuNjIxNyAyNC4yMjA0IDM3LjAxOTMgMjEuODg4NkMzOS40MTY5IDE5LjU1NjkgNDAuMDI0IDE2LjI1IDM4LjM3NTIgMTQuNTAyNVoiIGZpbGw9ImJsYWNrIi8+CjxwYXRoIGQ9Ik0yNS4yNjE2IDQxLjI2MDdDMjYuMzE2NiA0MC45OTgyIDI2LjUzMTIgMzguMTMxNCAyNS43NDEgMzQuODU3NEMyNC45NTA4IDMxLjU4MzQgMjMuNDU1IDI5LjE0MjEgMjIuNCAyOS40MDQ2QzIxLjM0NTEgMjkuNjY3IDIxLjEzMDQgMzIuNTMzOSAyMS45MjA2IDM1LjgwNzhDMjIuNzEwOSAzOS4wODE4IDI0LjIwNjcgNDEuNTIzMSAyNS4yNjE2IDQxLjI2MDdaIiBmaWxsPSJibGFjayIvPgo8cGF0aCBkPSJNMTQuNTA3NCAxNi4xMDIzQzE3LjU1MSAxNi45OTk5IDE5Ljc3NSAxOC41NzQ1IDE5LjQ3NDggMTkuNjE5NEMxOS4xNzQ2IDIwLjY2NDIgMTYuNDYzOSAyMC43ODM2IDEzLjQyMDMgMTkuODg2MUMxMC4zNzY3IDE4Ljk4ODUgOC4xNTI3NCAxNy40MTM5IDguNDUyOTMgMTYuMzY5QzguNzUzMTIgMTUuMzI0MiAxMS40NjM4IDE1LjIwNDggMTQuNTA3NCAxNi4xMDIzWiIgZmlsbD0iYmxhY2siLz4KPHBhdGggZD0iTTM0LjI2MTcgMjcuOTAwN0MzNy40OTIyIDI4Ljg1MzQgMzkuODY3NiAzMC40NzI2IDM5LjU2NzQgMzEuNTE3NUMzOS4yNjcyIDMyLjU2MjMgMzYuNDA1MSAzMi42MzcxIDMzLjE3NDcgMzEuNjg0NEMyOS45NDQyIDMwLjczMTggMjcuNTY4OCAyOS4xMTI1IDI3Ljg2OSAyOC4wNjc3QzI4LjE2OTIgMjcuMDIyOCAzMS4wMzEzIDI2Ljk0ODEgMzQuMjYxNyAyNy45MDA3WiIgZmlsbD0iYmxhY2siLz4KPHBhdGggZD0iTTE3LjkzMjIgMjUuNzA4NEMxNy4xNzc0IDI0LjkyNiAxNC43MDE4IDI2LjA2NDggMTIuNDAyNyAyOC4yNTE4QzEwLjEwMzUgMzAuNDM4OSA4Ljg1MTYxIDMyLjg0NjEgOS42MDYzOCAzMy42Mjg1QzEwLjM2MTIgMzQuNDEwOSAxMi44MzY4IDMzLjI3MjIgMTUuMTM1OSAzMS4wODUxQzE3LjQzNSAyOC44OTgxIDE4LjY4NjkgMjYuNDkwOCAxNy45MzIyIDI1LjcwODRaIiBmaWxsPSJibGFjayIvPgo8L3N2Zz4K";
const logo = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDgiIGhlaWdodD0iNDgiIHZpZXdCb3g9IjAgMCA0OCA0OCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjQ4IiBoZWlnaHQ9IjQ4IiByeD0iOS42IiBmaWxsPSIjRkZFRTU1Ii8+CjxwYXRoIGQ9Ik0yNi4wODE1IDExLjg1MDVDMjYuODI2IDE0LjkzNTEgMjYuNTc0NCAxNy42NDg0IDI1LjUxOTQgMTcuOTEwOUMyNC40NjQ0IDE4LjE3MzMgMjMuMDA1NyAxNS44ODU1IDIyLjI2MTIgMTIuODAwOUMyMS41MTY3IDkuNzE2MjYgMjEuNzY4NCA3LjAwMjkyIDIyLjgyMzMgNi43NDA0N0MyMy44NzgzIDYuNDc4MDIgMjUuMzM3IDguNzY1ODQgMjYuMDgxNSAxMS44NTA1WiIgZmlsbD0iYmxhY2siLz4KPHBhdGggZD0iTTM4LjM3NTIgMTQuNTAyNUMzNi43MjY0IDEyLjc1NSAzMy40NDYxIDEzLjIyODcgMzEuMDQ4NSAxNS41NjA0QzI4LjY1MDkgMTcuODkyMiAyOC4wNDM4IDIxLjE5OSAyOS42OTI2IDIyLjk0NjVDMzEuMzQxNCAyNC42OTQgMzQuNjIxNyAyNC4yMjA0IDM3LjAxOTMgMjEuODg4NkMzOS40MTY5IDE5LjU1NjkgNDAuMDI0IDE2LjI1IDM4LjM3NTIgMTQuNTAyNVoiIGZpbGw9ImJsYWNrIi8+CjxwYXRoIGQ9Ik0yNS4yNjE2IDQxLjI2MDdDMjYuMzE2NiA0MC45OTgyIDI2LjUzMTIgMzguMTMxNCAyNS43NDEgMzQuODU3NEMyNC45NTA4IDMxLjU4MzQgMjMuNDU1IDI5LjE0MjEgMjIuNCAyOS40MDQ2QzIxLjM0NTEgMjkuNjY3IDIxLjEzMDQgMzIuNTMzOSAyMS45MjA2IDM1LjgwNzhDMjIuNzEwOSAzOS4wODE4IDI0LjIwNjcgNDEuNTIzMSAyNS4yNjE2IDQxLjI2MDdaIiBmaWxsPSJibGFjayIvPgo8cGF0aCBkPSJNMTQuNTA3NCAxNi4xMDIzQzE3LjU1MSAxNi45OTk5IDE5Ljc3NSAxOC41NzQ1IDE5LjQ3NDggMTkuNjE5NEMxOS4xNzQ2IDIwLjY2NDIgMTYuNDYzOSAyMC43ODM2IDEzLjQyMDMgMTkuODg2MUMxMC4zNzY3IDE4Ljk4ODUgOC4xNTI3NCAxNy40MTM5IDguNDUyOTMgMTYuMzY5QzguNzUzMTIgMTUuMzI0MiAxMS40NjM4IDE1LjIwNDggMTQuNTA3NCAxNi4xMDIzWiIgZmlsbD0iYmxhY2siLz4KPHBhdGggZD0iTTM0LjI2MTcgMjcuOTAwN0MzNy40OTIyIDI4Ljg1MzQgMzkuODY3NiAzMC40NzI2IDM5LjU2NzQgMzEuNTE3NUMzOS4yNjcyIDMyLjU2MjMgMzYuNDA1MSAzMi42MzcxIDMzLjE3NDcgMzEuNjg0NEMyOS45NDQyIDMwLjczMTggMjcuNTY4OCAyOS4xMTI1IDI3Ljg2OSAyOC4wNjc3QzI4LjE2OTIgMjcuMDIyOCAzMS4wMzEzIDI2Ljk0ODEgMzQuMjYxNyAyNy45MDA3WiIgZmlsbD0iYmxhY2siLz4KPHBhdGggZD0iTTE3LjkzMjIgMjUuNzA4NEMxNy4xNzc0IDI0LjkyNiAxNC43MDE4IDI2LjA2NDggMTIuNDAyNyAyOC4yNTE4QzEwLjEwMzUgMzAuNDM4OSA4Ljg1MTYxIDMyLjg0NjEgOS42MDYzOCAzMy42Mjg1QzEwLjM2MTIgMzQuNDEwOSAxMi44MzY4IDMzLjI3MjIgMTUuMTM1OSAzMS4wODUxQzE3LjQzNSAyOC44OTgxIDE4LjY4NjkgMjYuNDkwOCAxNy45MzIyIDI1LjcwODRaIiBmaWxsPSJibGFjayIvPgo8L3N2Zz4K";
class PeraConnectWallet {
    constructor() {
        this.accounts = [];
        this.defaultAccount = 0;
        this.peraConnect = new connect_1.PeraWalletConnect();
    }
    static displayName() {
        return "Pera Connect";
    }
    displayName() {
        return PeraConnectWallet.displayName();
    }
    static img(inverted) {
        return inverted ? logoInverted : logo;
    }
    img(inverted) {
        return PeraConnectWallet.img(inverted);
    }
    connect() {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            if (yield this.isConnected())
                return true;
            try {
                const accounts = yield this.peraConnect.connect();
                (_a = this.peraConnect.connector) === null || _a === void 0 ? void 0 : _a.on("disconnect", this.disconnect);
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
                const accounts = yield this.peraConnect.reconnectSession();
                (_a = this.peraConnect.connector) === null || _a === void 0 ? void 0 : _a.on("disconnect", this.disconnect);
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
        if (this.peraConnect) {
            if (callback && typeof callback === 'function') {
                this.peraConnect.disconnect(callback);
            } else {
                this.peraConnect.disconnect();
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
            const result = yield this.peraConnect.signTransaction([
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
exports.default = PeraConnectWallet;