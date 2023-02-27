var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import algosdk from "algosdk";
import { PeraWalletConnect } from "@perawallet/connect";
var logoInverted = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDgiIGhlaWdodD0iNDgiIHZpZXdCb3g9IjAgMCA0OCA0OCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjQ4IiBoZWlnaHQ9IjQ4IiByeD0iOS42IiBmaWxsPSIjRkZFRTU1Ii8+CjxwYXRoIGQ9Ik0yNi4wODE1IDExLjg1MDVDMjYuODI2IDE0LjkzNTEgMjYuNTc0NCAxNy42NDg0IDI1LjUxOTQgMTcuOTEwOUMyNC40NjQ0IDE4LjE3MzMgMjMuMDA1NyAxNS44ODU1IDIyLjI2MTIgMTIuODAwOUMyMS41MTY3IDkuNzE2MjYgMjEuNzY4NCA3LjAwMjkyIDIyLjgyMzMgNi43NDA0N0MyMy44NzgzIDYuNDc4MDIgMjUuMzM3IDguNzY1ODQgMjYuMDgxNSAxMS44NTA1WiIgZmlsbD0iYmxhY2siLz4KPHBhdGggZD0iTTM4LjM3NTIgMTQuNTAyNUMzNi43MjY0IDEyLjc1NSAzMy40NDYxIDEzLjIyODcgMzEuMDQ4NSAxNS41NjA0QzI4LjY1MDkgMTcuODkyMiAyOC4wNDM4IDIxLjE5OSAyOS42OTI2IDIyLjk0NjVDMzEuMzQxNCAyNC42OTQgMzQuNjIxNyAyNC4yMjA0IDM3LjAxOTMgMjEuODg4NkMzOS40MTY5IDE5LjU1NjkgNDAuMDI0IDE2LjI1IDM4LjM3NTIgMTQuNTAyNVoiIGZpbGw9ImJsYWNrIi8+CjxwYXRoIGQ9Ik0yNS4yNjE2IDQxLjI2MDdDMjYuMzE2NiA0MC45OTgyIDI2LjUzMTIgMzguMTMxNCAyNS43NDEgMzQuODU3NEMyNC45NTA4IDMxLjU4MzQgMjMuNDU1IDI5LjE0MjEgMjIuNCAyOS40MDQ2QzIxLjM0NTEgMjkuNjY3IDIxLjEzMDQgMzIuNTMzOSAyMS45MjA2IDM1LjgwNzhDMjIuNzEwOSAzOS4wODE4IDI0LjIwNjcgNDEuNTIzMSAyNS4yNjE2IDQxLjI2MDdaIiBmaWxsPSJibGFjayIvPgo8cGF0aCBkPSJNMTQuNTA3NCAxNi4xMDIzQzE3LjU1MSAxNi45OTk5IDE5Ljc3NSAxOC41NzQ1IDE5LjQ3NDggMTkuNjE5NEMxOS4xNzQ2IDIwLjY2NDIgMTYuNDYzOSAyMC43ODM2IDEzLjQyMDMgMTkuODg2MUMxMC4zNzY3IDE4Ljk4ODUgOC4xNTI3NCAxNy40MTM5IDguNDUyOTMgMTYuMzY5QzguNzUzMTIgMTUuMzI0MiAxMS40NjM4IDE1LjIwNDggMTQuNTA3NCAxNi4xMDIzWiIgZmlsbD0iYmxhY2siLz4KPHBhdGggZD0iTTM0LjI2MTcgMjcuOTAwN0MzNy40OTIyIDI4Ljg1MzQgMzkuODY3NiAzMC40NzI2IDM5LjU2NzQgMzEuNTE3NUMzOS4yNjcyIDMyLjU2MjMgMzYuNDA1MSAzMi42MzcxIDMzLjE3NDcgMzEuNjg0NEMyOS45NDQyIDMwLjczMTggMjcuNTY4OCAyOS4xMTI1IDI3Ljg2OSAyOC4wNjc3QzI4LjE2OTIgMjcuMDIyOCAzMS4wMzEzIDI2Ljk0ODEgMzQuMjYxNyAyNy45MDA3WiIgZmlsbD0iYmxhY2siLz4KPHBhdGggZD0iTTE3LjkzMjIgMjUuNzA4NEMxNy4xNzc0IDI0LjkyNiAxNC43MDE4IDI2LjA2NDggMTIuNDAyNyAyOC4yNTE4QzEwLjEwMzUgMzAuNDM4OSA4Ljg1MTYxIDMyLjg0NjEgOS42MDYzOCAzMy42Mjg1QzEwLjM2MTIgMzQuNDEwOSAxMi44MzY4IDMzLjI3MjIgMTUuMTM1OSAzMS4wODUxQzE3LjQzNSAyOC44OTgxIDE4LjY4NjkgMjYuNDkwOCAxNy45MzIyIDI1LjcwODRaIiBmaWxsPSJibGFjayIvPgo8L3N2Zz4K";
var logo = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDgiIGhlaWdodD0iNDgiIHZpZXdCb3g9IjAgMCA0OCA0OCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjQ4IiBoZWlnaHQ9IjQ4IiByeD0iOS42IiBmaWxsPSIjRkZFRTU1Ii8+CjxwYXRoIGQ9Ik0yNi4wODE1IDExLjg1MDVDMjYuODI2IDE0LjkzNTEgMjYuNTc0NCAxNy42NDg0IDI1LjUxOTQgMTcuOTEwOUMyNC40NjQ0IDE4LjE3MzMgMjMuMDA1NyAxNS44ODU1IDIyLjI2MTIgMTIuODAwOUMyMS41MTY3IDkuNzE2MjYgMjEuNzY4NCA3LjAwMjkyIDIyLjgyMzMgNi43NDA0N0MyMy44NzgzIDYuNDc4MDIgMjUuMzM3IDguNzY1ODQgMjYuMDgxNSAxMS44NTA1WiIgZmlsbD0iYmxhY2siLz4KPHBhdGggZD0iTTM4LjM3NTIgMTQuNTAyNUMzNi43MjY0IDEyLjc1NSAzMy40NDYxIDEzLjIyODcgMzEuMDQ4NSAxNS41NjA0QzI4LjY1MDkgMTcuODkyMiAyOC4wNDM4IDIxLjE5OSAyOS42OTI2IDIyLjk0NjVDMzEuMzQxNCAyNC42OTQgMzQuNjIxNyAyNC4yMjA0IDM3LjAxOTMgMjEuODg4NkMzOS40MTY5IDE5LjU1NjkgNDAuMDI0IDE2LjI1IDM4LjM3NTIgMTQuNTAyNVoiIGZpbGw9ImJsYWNrIi8+CjxwYXRoIGQ9Ik0yNS4yNjE2IDQxLjI2MDdDMjYuMzE2NiA0MC45OTgyIDI2LjUzMTIgMzguMTMxNCAyNS43NDEgMzQuODU3NEMyNC45NTA4IDMxLjU4MzQgMjMuNDU1IDI5LjE0MjEgMjIuNCAyOS40MDQ2QzIxLjM0NTEgMjkuNjY3IDIxLjEzMDQgMzIuNTMzOSAyMS45MjA2IDM1LjgwNzhDMjIuNzEwOSAzOS4wODE4IDI0LjIwNjcgNDEuNTIzMSAyNS4yNjE2IDQxLjI2MDdaIiBmaWxsPSJibGFjayIvPgo8cGF0aCBkPSJNMTQuNTA3NCAxNi4xMDIzQzE3LjU1MSAxNi45OTk5IDE5Ljc3NSAxOC41NzQ1IDE5LjQ3NDggMTkuNjE5NEMxOS4xNzQ2IDIwLjY2NDIgMTYuNDYzOSAyMC43ODM2IDEzLjQyMDMgMTkuODg2MUMxMC4zNzY3IDE4Ljk4ODUgOC4xNTI3NCAxNy40MTM5IDguNDUyOTMgMTYuMzY5QzguNzUzMTIgMTUuMzI0MiAxMS40NjM4IDE1LjIwNDggMTQuNTA3NCAxNi4xMDIzWiIgZmlsbD0iYmxhY2siLz4KPHBhdGggZD0iTTM0LjI2MTcgMjcuOTAwN0MzNy40OTIyIDI4Ljg1MzQgMzkuODY3NiAzMC40NzI2IDM5LjU2NzQgMzEuNTE3NUMzOS4yNjcyIDMyLjU2MjMgMzYuNDA1MSAzMi42MzcxIDMzLjE3NDcgMzEuNjg0NEMyOS45NDQyIDMwLjczMTggMjcuNTY4OCAyOS4xMTI1IDI3Ljg2OSAyOC4wNjc3QzI4LjE2OTIgMjcuMDIyOCAzMS4wMzEzIDI2Ljk0ODEgMzQuMjYxNyAyNy45MDA3WiIgZmlsbD0iYmxhY2siLz4KPHBhdGggZD0iTTE3LjkzMjIgMjUuNzA4NEMxNy4xNzc0IDI0LjkyNiAxNC43MDE4IDI2LjA2NDggMTIuNDAyNyAyOC4yNTE4QzEwLjEwMzUgMzAuNDM4OSA4Ljg1MTYxIDMyLjg0NjEgOS42MDYzOCAzMy42Mjg1QzEwLjM2MTIgMzQuNDEwOSAxMi44MzY4IDMzLjI3MjIgMTUuMTM1OSAzMS4wODUxQzE3LjQzNSAyOC44OTgxIDE4LjY4NjkgMjYuNDkwOCAxNy45MzIyIDI1LjcwODRaIiBmaWxsPSJibGFjayIvPgo8L3N2Zz4K";
var PeraConnectWallet = /** @class */ (function () {
    function PeraConnectWallet() {
        this.accounts = [];
        this.defaultAccount = 0;
        this.peraConnect = new PeraWalletConnect();
    }
    PeraConnectWallet.displayName = function () {
        return "Pera Connect";
    };
    PeraConnectWallet.prototype.displayName = function () {
        return PeraConnectWallet.displayName();
    };
    PeraConnectWallet.img = function (inverted) {
        return inverted ? logoInverted : logo;
    };
    PeraConnectWallet.prototype.img = function (inverted) {
        return PeraConnectWallet.img(inverted);
    };
    PeraConnectWallet.prototype.connect = function () {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var accounts, err_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.isConnected()];
                    case 1:
                        if (_b.sent())
                            return [2 /*return*/, true];
                        _b.label = 2;
                    case 2:
                        _b.trys.push([2, 4, , 5]);
                        return [4 /*yield*/, this.peraConnect.connect()];
                    case 3:
                        accounts = _b.sent();
                        (_a = this.peraConnect.connector) === null || _a === void 0 ? void 0 : _a.on("disconnect", this.disconnect);
                        if (accounts && accounts.length) {
                            this.accounts = accounts;
                        }
                        return [3 /*break*/, 5];
                    case 4:
                        err_1 = _b.sent();
                        return [2 /*return*/, false];
                    case 5: return [2 /*return*/, true];
                }
            });
        });
    };
    PeraConnectWallet.prototype.requestSessionReload = function () {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var accounts, e_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.peraConnect.reconnectSession()];
                    case 1:
                        accounts = _b.sent();
                        (_a = this.peraConnect.connector) === null || _a === void 0 ? void 0 : _a.on("disconnect", this.disconnect);
                        if (accounts && accounts.length) {
                            this.accounts = accounts;
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        e_1 = _b.sent();
                        this.accounts = [];
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    PeraConnectWallet.prototype.isConnected = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.requestSessionReload()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, this.accounts && this.accounts.length > 0];
                }
            });
        });
    };
    PeraConnectWallet.prototype.disconnect = function () {
        this.peraConnect.disconnect();
        this.accounts = [];
    };
    PeraConnectWallet.prototype.getDefaultAccount = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.isConnected()];
                    case 1:
                        if (!(_a.sent()))
                            return [2 /*return*/, ""];
                        return [2 /*return*/, this.accounts[this.defaultAccount]];
                }
            });
        });
    };
    PeraConnectWallet.prototype.signTxn = function (txns) {
        return __awaiter(this, void 0, void 0, function () {
            var defaultAddress, txnsToSign, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getDefaultAccount()];
                    case 1:
                        defaultAddress = _a.sent();
                        return [4 /*yield*/, this.connect()];
                    case 2:
                        _a.sent();
                        txnsToSign = txns.map(function (txn) {
                            if (algosdk.encodeAddress(txn.from.publicKey) !== defaultAddress)
                                return { txn: txn, signers: [] };
                            return { txn: txn, signers: undefined };
                        });
                        return [4 /*yield*/, this.peraConnect.signTransaction([
                                txnsToSign,
                            ])];
                    case 3:
                        result = _a.sent();
                        // tslint:disable-next-line:no-console
                        console.log(result);
                        return [2 /*return*/, result.map(function (element, idx) {
                                return element
                                    ? {
                                        txID: txns[idx].txID(),
                                        blob: element,
                                    }
                                    : {
                                        txID: txns[idx].txID(),
                                        blob: txns[idx].toByte(),
                                    };
                            })];
                }
            });
        });
    };
    PeraConnectWallet.prototype.signBytes = function (b, permissionCallback) {
        throw new Error("Method not implemented.");
    };
    PeraConnectWallet.prototype.signTeal = function (teal, permissionCallback) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                throw new Error("Method not implemented.");
            });
        });
    };
    return PeraConnectWallet;
}());
export default PeraConnectWallet;
