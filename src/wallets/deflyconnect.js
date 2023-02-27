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
import { DeflyWalletConnect } from "@blockshake/defly-connect";
var logoInverted = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+CjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+Cjxzdmcgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4bWw6c3BhY2U9InByZXNlcnZlIiB4bWxuczpzZXJpZj0iaHR0cDovL3d3dy5zZXJpZi5jb20vIiBzdHlsZT0iZmlsbC1ydWxlOmV2ZW5vZGQ7Y2xpcC1ydWxlOmV2ZW5vZGQ7c3Ryb2tlLWxpbmVqb2luOnJvdW5kO3N0cm9rZS1taXRlcmxpbWl0OjI7Ij4KICAgIDxyZWN0IHg9IjAiIHk9IjAiIHdpZHRoPSIxMDI0IiBoZWlnaHQ9IjEwMjQiLz4KICAgIDxnIHRyYW5zZm9ybT0ibWF0cml4KDEuNjgyMDksMCwwLDEuNjgyMDksMjI2LjM2OCwyMTIuODE4KSI+CiAgICAgICAgPHBhdGggZD0iTTMyNy4wNDksMjgwLjE5MkwxNjkuNTI0LDEzTDEyLDI4MC4xOTJMMTY5LjUyNCwxODkuMDg0TDMyNy4wNDksMjgwLjE5MloiIHN0eWxlPSJmaWxsOndoaXRlO2ZpbGwtcnVsZTpub256ZXJvOyIvPgogICAgPC9nPgogICAgPGcgdHJhbnNmb3JtPSJtYXRyaXgoMS42ODIwOSwwLDAsMS42ODIwOSwyMjYuMzY4LDIxMi44MTgpIj4KICAgICAgICA8cGF0aCBkPSJNMjk5LjU0NiwzMDdMMTY5LjUyNSwyMzguNDczTDM5LjUwNCwzMDdMMTY5LjUyNSwyNjQuNjdMMjk5LjU0NiwzMDdaIiBzdHlsZT0iZmlsbDp3aGl0ZTtmaWxsLXJ1bGU6bm9uemVybzsiLz4KICAgIDwvZz4KPC9zdmc+Cg==";
var logo = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+CjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+Cjxzdmcgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4bWw6c3BhY2U9InByZXNlcnZlIiB4bWxuczpzZXJpZj0iaHR0cDovL3d3dy5zZXJpZi5jb20vIiBzdHlsZT0iZmlsbC1ydWxlOmV2ZW5vZGQ7Y2xpcC1ydWxlOmV2ZW5vZGQ7c3Ryb2tlLWxpbmVqb2luOnJvdW5kO3N0cm9rZS1taXRlcmxpbWl0OjI7Ij4KICAgIDxyZWN0IHg9IjAiIHk9IjAiIHdpZHRoPSIxMDI0IiBoZWlnaHQ9IjEwMjQiLz4KICAgIDxnIHRyYW5zZm9ybT0ibWF0cml4KDEuNjgyMDksMCwwLDEuNjgyMDksMjI2LjM2OCwyMTIuODE4KSI+CiAgICAgICAgPHBhdGggZD0iTTMyNy4wNDksMjgwLjE5MkwxNjkuNTI0LDEzTDEyLDI4MC4xOTJMMTY5LjUyNCwxODkuMDg0TDMyNy4wNDksMjgwLjE5MloiIHN0eWxlPSJmaWxsOndoaXRlO2ZpbGwtcnVsZTpub256ZXJvOyIvPgogICAgPC9nPgogICAgPGcgdHJhbnNmb3JtPSJtYXRyaXgoMS42ODIwOSwwLDAsMS42ODIwOSwyMjYuMzY4LDIxMi44MTgpIj4KICAgICAgICA8cGF0aCBkPSJNMjk5LjU0NiwzMDdMMTY5LjUyNSwyMzguNDczTDM5LjUwNCwzMDdMMTY5LjUyNSwyNjQuNjdMMjk5LjU0NiwzMDdaIiBzdHlsZT0iZmlsbDp3aGl0ZTtmaWxsLXJ1bGU6bm9uemVybzsiLz4KICAgIDwvZz4KPC9zdmc+Cg==";
var DeflyConnectWallet = /** @class */ (function () {
    function DeflyConnectWallet() {
        this.accounts = [];
        this.defaultAccount = 0;
        this.deflyConnect = new DeflyWalletConnect();
    }
    DeflyConnectWallet.displayName = function () {
        return "Defly Connect";
    };
    DeflyConnectWallet.prototype.displayName = function () {
        return DeflyConnectWallet.displayName();
    };
    DeflyConnectWallet.img = function (inverted) {
        return inverted ? logoInverted : logo;
    };
    DeflyConnectWallet.prototype.img = function (inverted) {
        return DeflyConnectWallet.img(inverted);
    };
    DeflyConnectWallet.prototype.connect = function () {
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
                        return [4 /*yield*/, this.deflyConnect.connect()];
                    case 3:
                        accounts = _b.sent();
                        (_a = this.deflyConnect.connector) === null || _a === void 0 ? void 0 : _a.on("disconnect", this.disconnect);
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
    DeflyConnectWallet.prototype.requestSessionReload = function () {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var accounts, e_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.deflyConnect.reconnectSession()];
                    case 1:
                        accounts = _b.sent();
                        (_a = this.deflyConnect.connector) === null || _a === void 0 ? void 0 : _a.on("disconnect", this.disconnect);
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
    DeflyConnectWallet.prototype.isConnected = function () {
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
    DeflyConnectWallet.prototype.disconnect = function () {
        this.deflyConnect.disconnect();
        this.accounts = [];
    };
    DeflyConnectWallet.prototype.getDefaultAccount = function () {
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
    DeflyConnectWallet.prototype.signTxn = function (txns) {
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
                        return [4 /*yield*/, this.deflyConnect.signTransaction([
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
    DeflyConnectWallet.prototype.signBytes = function (b, permissionCallback) {
        throw new Error("Method not implemented.");
    };
    DeflyConnectWallet.prototype.signTeal = function (teal, permissionCallback) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                throw new Error("Method not implemented.");
            });
        });
    };
    return DeflyConnectWallet;
}());
export default DeflyConnectWallet;
