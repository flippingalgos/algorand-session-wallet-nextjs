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
const client_1 = __importDefault(require("@walletconnect/client"));
const algorand_walletconnect_qrcode_modal_1 = __importDefault(require("algorand-walletconnect-qrcode-modal"));
const utils_1 = require("@json-rpc-tools/utils");
const logo = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPHN2ZyB2ZXJzaW9uPSIxLjEiIGlkPSJMYXllcl8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCIKCSB2aWV3Qm94PSIwIDAgNDgwIDQ4MCIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNDgwIDQ4MDsiIHhtbDpzcGFjZT0icHJlc2VydmUiPgo8c3R5bGUgdHlwZT0idGV4dC9jc3MiPgoJLnN0MHtmaWxsOiMzMzk2RkY7fQo8L3N0eWxlPgo8cGF0aCBjbGFzcz0ic3QwIiBkPSJNMTI2LjYsMTY4YzYyLjYtNjEuMywxNjQuMi02MS4zLDIyNi44LDBsNy41LDcuNGMzLjEsMy4xLDMuMSw4LDAsMTEuMWwtMjUuOCwyNS4yYy0xLjYsMS41LTQuMSwxLjUtNS43LDAKCWwtMTAuNC0xMC4yYy00My43LTQyLjgtMTE0LjUtNDIuOC0xNTguMiwwbC0xMS4xLDEwLjljLTEuNiwxLjUtNC4xLDEuNS01LjcsMGwtMjUuOC0yNS4yYy0zLjEtMy4xLTMuMS04LDAtMTEuMUwxMjYuNiwxNjh6CgkgTTQwNi43LDIyMC4ybDIyLjksMjIuNWMzLjEsMy4xLDMuMSw4LDAsMTEuMUwzMjYuMiwzNTUuMWMtMy4xLDMuMS04LjIsMy4xLTExLjMsMGwtNzMuNC03MS45Yy0wLjgtMC44LTIuMS0wLjgtMi44LDBsLTczLjQsNzEuOQoJYy0zLjEsMy4xLTguMiwzLjEtMTEuMywwTDUwLjMsMjUzLjhjLTMuMS0zLjEtMy4xLTgsMC0xMS4xbDIyLjktMjIuNWMzLjEtMy4xLDguMi0zLjEsMTEuMywwbDczLjQsNzEuOWMwLjgsMC44LDIuMSwwLjgsMi44LDAKCWw3My40LTcxLjljMy4xLTMuMSw4LjItMy4xLDExLjMsMGw3My40LDcxLjljMC44LDAuOCwyLjEsMC44LDIuOCwwbDczLjQtNzEuOUMzOTguNSwyMTcuMSw0MDMuNiwyMTcuMSw0MDYuNywyMjAuMkw0MDYuNywyMjAuMnoiLz4KPC9zdmc+Cg==";
class WC {
    constructor(network) {
        this.accounts = [];
        this.defaultAccount = 0;
        this.network = network;
        const bridge = "https://bridge.walletconnect.org";
        this.connector = new client_1.default({
            bridge,
            qrcodeModal: algorand_walletconnect_qrcode_modal_1.default,
        });
    }
    connect(cb) {
        return __awaiter(this, void 0, void 0, function* () {
            // Check if connection is already established
            if (this.connector.connected)
                return true;
            this.connector.createSession();
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
                if (error)
                    throw error;
            });
            return new Promise(resolve => {
                const reconn = setInterval(() => {
                    if (this.connector.connected) {
                        clearInterval(reconn);
                        resolve(true);
                        return;
                    }
                    this.connector.connect();
                }, 100);
            });
        });
    }
    static displayName() {
        return "Wallet Connect";
    }
    displayName() {
        return WC.displayName();
    }
    static img(inverted) {
        return logo;
    }
    img(inverted) {
        return WC.img(inverted);
    }
    isConnected() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.connector.connected;
        });
    }
    disconnect() {
        this.connector.killSession();
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
            const txnsToSign = txns.map((txn) => {
                const encodedTxn = Buffer.from(algosdk_1.default.encodeUnsignedTransaction(txn)).toString("base64");
                if (algosdk_1.default.encodeAddress(txn.from.publicKey) !== defaultAddress)
                    return { txn: encodedTxn, signers: [] };
                return { txn: encodedTxn };
            });
            const request = utils_1.formatJsonRpcRequest("algo_signTxn", [txnsToSign]);
            const result = yield this.connector.sendCustomRequest(request);
            return result.map((element, idx) => {
                return element
                    ? {
                        txID: txns[idx].txID(),
                        blob: new Uint8Array(Buffer.from(element, "base64")),
                    }
                    : {
                        txID: txns[idx].txID(),
                        blob: new Uint8Array(),
                    };
            });
        });
    }
    sign(txn) {
        return __awaiter(this, void 0, void 0, function* () {
            throw new Error("Method not implemented.");
        });
    }
    signBytes(b) {
        return __awaiter(this, void 0, void 0, function* () {
            throw new Error("Method not implemented.");
        });
    }
    signTeal(teal) {
        return __awaiter(this, void 0, void 0, function* () {
            throw new Error("Method not implemented.");
        });
    }
}
exports.default = WC;
