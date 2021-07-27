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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.Tokopedia = void 0;
var https_1 = __importDefault(require("https"));
var fs_1 = __importDefault(require("fs"));
var win32_1 = __importDefault(require("path/win32"));
var stream_1 = require("stream");
var color_1 = require("./color");
var mini_1 = require("./mini");
var Tokopedia = /** @class */ (function () {
    function Tokopedia() {
        this.matchObject = [];
        this.outputDir = 'output';
    }
    Tokopedia.prototype.setOutput = function (location) {
        this.outputDir = win32_1["default"].normalize(location);
    };
    Tokopedia.prototype.parseLink = function (input) {
        var pattern = /^(https|http)[:\/]+(images|ecs7|ecs7-p).*cache\/(\d+)(\-square)?.+?([\w\-]*[a-z0-9]).(jpg|jpeg|png|webp)/;
        var result = [];
        try {
            for (var _i = 0, input_1 = input; _i < input_1.length; _i++) {
                var link = input_1[_i];
                var match = link.src.match(pattern);
                if (match[3] === '') {
                    throw Error('Check failed');
                }
                result.push({
                    uri: match[0],
                    protocol: match[1],
                    square: Boolean(match[4]),
                    source: match[2],
                    size: parseInt(match[3]),
                    name: match[5],
                    type: match[6],
                    modified: false
                });
            }
        }
        catch (err) {
            console.log(err);
        }
        this.matchObject = result;
        return this;
    };
    Tokopedia.prototype.linkModify = function () {
        var size = 900;
        for (var _i = 0, _a = this.matchObject; _i < _a.length; _i++) {
            var i = _a[_i];
            if (i.square) {
                i.uri = i.uri.replace("/" + i.size + "-square/", "/" + size + "/");
            }
            else {
                i.uri = i.uri.replace("/" + i.size + "/", "/" + size + "/");
            }
            i.size = size;
            i.square = false;
            i.modified = true;
        }
        return this;
    };
    Tokopedia.prototype.getLinks = function () {
        return this.matchObject;
    };
    Tokopedia.prototype.save = function () {
        var _this = this;
        var dir = mini_1.makeDirIfNotExist(this.outputDir);
        dir.then(function (location) { return __awaiter(_this, void 0, void 0, function () {
            var _loop_1, _i, _a, i;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _loop_1 = function (i) {
                            var destination, streamPipe, stream;
                            return __generator(this, function (_c) {
                                switch (_c.label) {
                                    case 0:
                                        destination = win32_1["default"].join(location, [i.name, i.type].join('.'));
                                        streamPipe = fs_1["default"].createWriteStream(destination);
                                        stream = https_1["default"].get(i.uri, function (res) {
                                            res.pipe(streamPipe);
                                        });
                                        return [4 /*yield*/, new Promise(function (resolve, reject) {
                                                color_1.blue_color('\n' + destination, 'process');
                                                stream_1.finished(stream, function (err) {
                                                    !err ? resolve(' success') : reject(' failed');
                                                });
                                            })
                                                .then(function (res) {
                                                color_1.green_color(res, 'process');
                                            })["catch"](function (err) {
                                                color_1.red_color(err, 'process');
                                            })];
                                    case 1:
                                        _c.sent();
                                        return [2 /*return*/];
                                }
                            });
                        };
                        _i = 0, _a = this.matchObject;
                        _b.label = 1;
                    case 1:
                        if (!(_i < _a.length)) return [3 /*break*/, 4];
                        i = _a[_i];
                        return [5 /*yield**/, _loop_1(i)];
                    case 2:
                        _b.sent();
                        _b.label = 3;
                    case 3:
                        _i++;
                        return [3 /*break*/, 1];
                    case 4: return [2 /*return*/];
                }
            });
        }); })["catch"](function (err) {
            color_1.red_color(err, 'console');
        });
    };
    return Tokopedia;
}());
exports.Tokopedia = Tokopedia;
