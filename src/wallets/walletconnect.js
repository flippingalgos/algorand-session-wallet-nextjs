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
import { Buffer } from "buffer";
import WalletConnect from "@walletconnect/client";
import WalletConnectQRCodeModal from "algorand-walletconnect-qrcode-modal";
import { formatJsonRpcRequest } from "@json-rpc-tools/utils";
var logo = "data:image/svg+xml;base64,PHN2ZyBmaWxsPSJub25lIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDQwMCA0MDAiIHdpZHRoPSI0MDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPjxjbGlwUGF0aCBpZD0iYSI+PHBhdGggZD0ibTAgMGg0MDB2NDAwaC00MDB6Ii8+PC9jbGlwUGF0aD48ZyBjbGlwLXBhdGg9InVybCgjYSkiPjxjaXJjbGUgY3g9IjIwMCIgY3k9IjIwMCIgZmlsbD0iIzMzOTZmZiIgcj0iMTk5LjUiIHN0cm9rZT0iIzY2YjFmZiIvPjxwYXRoIGQ9Im0xMjIuNTE5IDE0OC45NjVjNDIuNzkxLTQxLjcyOSAxMTIuMTcxLTQxLjcyOSAxNTQuOTYyIDBsNS4xNSA1LjAyMmMyLjE0IDIuMDg2IDIuMTQgNS40NjkgMCA3LjU1NWwtMTcuNjE3IDE3LjE4Yy0xLjA3IDEuMDQzLTIuODA0IDEuMDQzLTMuODc0IDBsLTcuMDg3LTYuOTExYy0yOS44NTMtMjkuMTExLTc4LjI1My0yOS4xMTEtMTA4LjEwNiAwbC03LjU5IDcuNDAxYy0xLjA3IDEuMDQzLTIuODA0IDEuMDQzLTMuODc0IDBsLTE3LjYxNy0xNy4xOGMtMi4xNC0yLjA4Ni0yLjE0LTUuNDY5IDAtNy41NTV6bTE5MS4zOTcgMzUuNTI5IDE1LjY3OSAxNS4yOWMyLjE0IDIuMDg2IDIuMTQgNS40NjkgMCA3LjU1NWwtNzAuNyA2OC45NDRjLTIuMTM5IDIuMDg3LTUuNjA4IDIuMDg3LTcuNzQ4IDBsLTUwLjE3OC00OC45MzFjLS41MzUtLjUyMi0xLjQwMi0uNTIyLTEuOTM3IDBsLTUwLjE3OCA0OC45MzFjLTIuMTM5IDIuMDg3LTUuNjA4IDIuMDg3LTcuNzQ4IDBsLTcwLjcwMTUtNjguOTQ1Yy0yLjEzOTYtMi4wODYtMi4xMzk2LTUuNDY5IDAtNy41NTVsMTUuNjc5NS0xNS4yOWMyLjEzOTYtMi4wODYgNS42MDg1LTIuMDg2IDcuNzQ4MSAwbDUwLjE3ODkgNDguOTMyYy41MzUuNTIyIDEuNDAyLjUyMiAxLjkzNyAwbDUwLjE3Ny00OC45MzJjMi4xMzktMi4wODcgNS42MDgtMi4wODcgNy43NDggMGw1MC4xNzkgNDguOTMyYy41MzUuNTIyIDEuNDAyLjUyMiAxLjkzNyAwbDUwLjE3OS00OC45MzFjMi4xMzktMi4wODcgNS42MDgtMi4wODcgNy43NDggMHoiIGZpbGw9IiNmZmYiLz48L2c+PC9zdmc+";
var WC = /** @class */ (function () {
    function WC(network) {
        this.accounts = [];
        this.defaultAccount = 0;
        this.network = network;
        var bridge = "https://bridge.walletconnect.org";
        this.connector = new WalletConnect({
            bridge: bridge,
            qrcodeModal: WalletConnectQRCodeModal,
        });
    }
    WC.prototype.connect = function (cb) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        // Check if connection is already established
                        if (this.connector.connected)
                            return [2 /*return*/, true];
                        return [4 /*yield*/, this.connector.createSession()];
                    case 1:
                        _a.sent();
                        this.connector.on("connect", function (error, payload) {
                            if (error) {
                                throw error;
                            }
                            var accounts = payload.params[0].accounts;
                            cb(accounts);
                            _this.accounts = accounts;
                        });
                        this.connector.on("session_update", function (error, payload) {
                            if (error) {
                                throw error;
                            }
                            var accounts = payload.params[0].accounts;
                            cb(accounts);
                            _this.accounts = accounts;
                        });
                        this.connector.on("disconnect", function (error, payload) {
                            if (error)
                                throw error;
                        });
                        return [2 /*return*/, new Promise(function (resolve) {
                                var reconn = setInterval(function () {
                                    if (_this.connector.connected) {
                                        clearInterval(reconn);
                                        resolve(true);
                                        return;
                                    }
                                    _this.connector.connect();
                                }, 100);
                            })];
                }
            });
        });
    };
    WC.displayName = function () {
        return "Wallet Connect";
    };
    WC.prototype.displayName = function () {
        return WC.displayName();
    };
    WC.img = function (inverted) {
        return logo;
    };
    WC.prototype.img = function (inverted) {
        return WC.img(inverted);
    };
    WC.prototype.isConnected = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.connector.connected];
            });
        });
    };
    WC.prototype.disconnect = function () {
        this.connector.killSession();
    };
    WC.prototype.getDefaultAccount = function () {
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
    WC.prototype.signTxn = function (txns) {
        return __awaiter(this, void 0, void 0, function () {
            var defaultAddress, txnsToSign, request, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getDefaultAccount()];
                    case 1:
                        defaultAddress = _a.sent();
                        return [4 /*yield*/, this.connect(function () { return null; })];
                    case 2:
                        _a.sent();
                        txnsToSign = txns.map(function (txn) {
                            var encodedTxn = Buffer.from(algosdk.encodeUnsignedTransaction(txn)).toString("base64");
                            if (algosdk.encodeAddress(txn.from.publicKey) !== defaultAddress)
                                return { txn: encodedTxn, signers: [] };
                            return { txn: encodedTxn };
                        });
                        request = formatJsonRpcRequest("algo_signTxn", [txnsToSign]);
                        return [4 /*yield*/, this.connector.sendCustomRequest(request)];
                    case 3:
                        result = _a.sent();
                        return [2 /*return*/, result.map(function (element, idx) {
                                return element
                                    ? {
                                        txID: txns[idx].txID(),
                                        blob: new Uint8Array(Buffer.from(element, "base64")),
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
    WC.prototype.sign = function (txn) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                throw new Error("Method not implemented.");
            });
        });
    };
    WC.prototype.signBytes = function (b) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                throw new Error("Method not implemented.");
            });
        });
    };
    WC.prototype.signTeal = function (teal) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                throw new Error("Method not implemented.");
            });
        });
    };
    return WC;
}());
export default WC;
