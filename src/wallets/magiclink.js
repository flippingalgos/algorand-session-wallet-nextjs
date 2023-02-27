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
import { Magic } from "magic-sdk";
import { AlgorandExtension } from "@magic-ext/algorand";
import { Buffer } from "buffer";
var logo = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDQwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGQ9Ik0yMDAgMEMyMTguMjYyIDIxLjIwMTQgMjM4LjQwNCA0MC44OTA2IDI2MC4xODUgNTguODM5MUMyNDUuNjcyIDEwMy40NTkgMjM3Ljg1OCAxNTAuODY1IDIzNy44NTggMjAwQzIzNy44NTggMjQ5LjEzNSAyNDUuNjcyIDI5Ni41NDEgMjYwLjE4NSAzNDEuMTYxQzIzOC40MDQgMzU5LjEwOSAyMTguMjYyIDM3OC43OTkgMjAwIDQwMEMxODEuNzM4IDM3OC43OTkgMTYxLjU5NiAzNTkuMTA5IDEzOS44MTUgMzQxLjE2MUMxNTQuMzI4IDI5Ni41NDEgMTYyLjE0MiAyNDkuMTM1IDE2Mi4xNDIgMjAwQzE2Mi4xNDIgMTUwLjg2NSAxNTQuMzI4IDEwMy40NTkgMTM5LjgxNSA1OC44MzkyQzE2MS41OTYgNDAuODkwNyAxODEuNzM4IDIxLjIwMTUgMjAwIDBaIiBmaWxsPSIjNjg1MUZGIi8+CjxwYXRoIGQ9Ik05OC4xODMgMzEwLjMxMkM3NS4xMjc2IDI5NC45OTQgNTAuNjU5MiAyODEuNDU3IDI1IDI2OS45MTFDMzIuMTE3NyAyNDcuNzk3IDM1Ljk0NjcgMjI0LjMyMiAzNS45NDY3IDIwMEMzNS45NDY3IDE3NS42NzggMzIuMTE3NyAxNTIuMjA0IDI1IDEzMC4wODlDNTAuNjU5MSAxMTguNTQzIDc1LjEyNzUgMTA1LjAwNiA5OC4xODMgODkuNjg4NUMxMDYuOTk5IDEyNS4xMDIgMTExLjY2NCAxNjIuMDM0IDExMS42NjQgMjAwQzExMS42NjQgMjM3Ljk2NiAxMDYuOTk5IDI3NC44OTggOTguMTgzIDMxMC4zMTJaIiBmaWxsPSIjNjg1MUZGIi8+CjxwYXRoIGQ9Ik0yODguMzM2IDIwMEMyODguMzM2IDIzNy45NjYgMjkzLjAwMSAyNzQuODk4IDMwMS44MTcgMzEwLjMxMkMzMjQuODcyIDI5NC45OTQgMzQ5LjM0MSAyODEuNDU3IDM3NSAyNjkuOTExQzM2Ny44ODIgMjQ3Ljc5NyAzNjQuMDUzIDIyNC4zMjIgMzY0LjA1MyAyMDBDMzY0LjA1MyAxNzUuNjc4IDM2Ny44ODIgMTUyLjIwNCAzNzUgMTMwLjA4OUMzNDkuMzQxIDExOC41NDMgMzI0Ljg3MiAxMDUuMDA2IDMwMS44MTcgODkuNjg4NEMyOTMuMDAxIDEyNS4xMDIgMjg4LjMzNiAxNjIuMDM0IDI4OC4zMzYgMjAwWiIgZmlsbD0iIzY4NTFGRiIvPgo8L3N2Zz4K";
var MagicLink = /** @class */ (function () {
    function MagicLink(network) {
        this.accounts = [];
        this.defaultAccount = 0;
        this.network = network;
    }
    MagicLink.prototype.connect = function (settings) {
        return __awaiter(this, void 0, void 0, function () {
            var md;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.settings = settings;
                        this.connector = new Magic(settings.apiKey, {
                            extensions: {
                                algorand: new AlgorandExtension({ rpcUrl: settings.rpcURL }),
                            },
                        });
                        return [4 /*yield*/, this.connector.auth.loginWithEmailOTP({ email: settings.email })];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.connector.user.getMetadata()];
                    case 2:
                        md = _a.sent();
                        this.accounts = [md.publicAddress];
                        return [2 /*return*/, true];
                }
            });
        });
    };
    MagicLink.prototype.reAuthenticate = function () {
        return __awaiter(this, void 0, void 0, function () {
            var md;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.connector.user.logout()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.connector.auth.loginWithEmailOTP({ email: this.settings.email })];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.connector.user.getMetadata()];
                    case 3:
                        md = _a.sent();
                        if (this.accounts[0] !== md.publicAddress)
                            throw Error("User changed wallet");
                        this.accounts = [md.publicAddress];
                        return [2 /*return*/, true];
                }
            });
        });
    };
    MagicLink.displayName = function () {
        return "Magic Link";
    };
    MagicLink.prototype.displayName = function () {
        return MagicLink.displayName();
    };
    MagicLink.img = function (inverted) {
        return logo;
    };
    MagicLink.prototype.img = function (inverted) {
        return MagicLink.img(inverted);
    };
    MagicLink.prototype.isConnected = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (!this.connector || !this.connector.user)
                    return [2 /*return*/, false];
                return [2 /*return*/, this.connector.user.isLoggedIn()];
            });
        });
    };
    MagicLink.prototype.disconnect = function () {
        if (this.connector && this.connector.user)
            this.connector.user.logout();
    };
    MagicLink.prototype.getDefaultAccount = function () {
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
    MagicLink.prototype.getDefaultAccountPkey = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b, _c, _d;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        _b = (_a = Buffer).from;
                        _d = (_c = algosdk).decodeAddress;
                        return [4 /*yield*/, this.getDefaultAccount()];
                    case 1: return [2 /*return*/, _b.apply(_a, [_d.apply(_c, [_e.sent()]).publicKey]).toString("base64")];
                }
            });
        });
    };
    MagicLink.prototype.signTxn = function (txns, forceAuth) {
        if (forceAuth === void 0) { forceAuth = false; }
        return __awaiter(this, void 0, void 0, function () {
            var _a, result, e_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = forceAuth;
                        if (_a) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.connector.user.isLoggedIn()];
                    case 1:
                        _a = !(_b.sent());
                        _b.label = 2;
                    case 2:
                        if (!_a) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.reAuthenticate()];
                    case 3:
                        _b.sent();
                        _b.label = 4;
                    case 4:
                        _b.trys.push([4, 6, , 9]);
                        return [4 /*yield*/, this.signTxnBlock(txns)];
                    case 5:
                        result = _b.sent();
                        return [3 /*break*/, 9];
                    case 6:
                        e_1 = _b.sent();
                        return [4 /*yield*/, this.reAuthenticate()];
                    case 7:
                        _b.sent();
                        return [4 /*yield*/, this.signTxnBlock(txns)];
                    case 8:
                        result = _b.sent();
                        return [3 /*break*/, 9];
                    case 9: return [2 /*return*/, result];
                }
            });
        });
    };
    MagicLink.prototype.signTxnBlock = function (txns) {
        return __awaiter(this, void 0, void 0, function () {
            var defaultAddressPK, result, _a, _b, _c, _i, txnid, txn, _d, _e;
            return __generator(this, function (_f) {
                switch (_f.label) {
                    case 0: return [4 /*yield*/, this.getDefaultAccountPkey()];
                    case 1:
                        defaultAddressPK = _f.sent();
                        result = [];
                        _a = txns;
                        _b = [];
                        for (_c in _a)
                            _b.push(_c);
                        _i = 0;
                        _f.label = 2;
                    case 2:
                        if (!(_i < _b.length)) return [3 /*break*/, 6];
                        _c = _b[_i];
                        if (!(_c in _a)) return [3 /*break*/, 5];
                        txnid = _c;
                        if (!txns[txnid])
                            return [3 /*break*/, 5];
                        txn = txns[txnid];
                        if (!(Buffer.from(txn.from.publicKey).toString("base64") !== defaultAddressPK)) return [3 /*break*/, 3];
                        result.push({ txID: txn.txID(), blob: txn.toByte() });
                        return [3 /*break*/, 5];
                    case 3:
                        _e = (_d = result).push;
                        return [4 /*yield*/, this.signBytesToTxn(txn.toByte())];
                    case 4:
                        _e.apply(_d, [_f.sent()]);
                        _f.label = 5;
                    case 5:
                        _i++;
                        return [3 /*break*/, 2];
                    case 6: return [2 /*return*/, result];
                }
            });
        });
    };
    MagicLink.prototype.sign = function (txn) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                throw new Error("Method not implemented.");
            });
        });
    };
    MagicLink.prototype.signBytesToTxn = function (b) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.connector.algorand.signTransaction(b)];
            });
        });
    };
    MagicLink.prototype.signBytes = function (b) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                throw new Error("Method not implemented.");
            });
        });
    };
    MagicLink.prototype.signTeal = function (teal) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                throw new Error("Method not implemented.");
            });
        });
    };
    return MagicLink;
}());
export default MagicLink;
