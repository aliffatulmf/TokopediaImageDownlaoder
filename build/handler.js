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
exports.__esModule = true;
exports.TokopediaHandler = void 0;
var selenium_webdriver_1 = require("selenium-webdriver");
var color_1 = require("./color");
var robot_1 = require("./robot");
var tokopedia_1 = require("./tokopedia");
function TokopediaDownloadHandler(options) {
    var toped = new tokopedia_1.Tokopedia();
    if (options.output)
        toped.setOutput(options.output);
    toped.parseLink(options.input);
    if (options.output)
        toped.setOutput(options.output);
    if (options.modify)
        toped.linkModify();
    toped.save();
}
function TokopediaHandler(options) {
    var _this = this;
    var robot = new robot_1.Robot();
    robot.showHeader('Tokopedia');
    if (options.cache)
        robot.setCache();
    if (options.headless)
        robot.setHeadless();
    if (options.natural)
        robot.loadArguments();
    var cmd = new Promise(function (resolve, reject) {
        var result = [];
        robot.writeCommand(function (driver) { return __awaiter(_this, void 0, void 0, function () {
            var thumbnail, i, locator, elem, _a, _b, err_1;
            var _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _d.trys.push([0, 10, 11, 13]);
                        return [4 /*yield*/, driver.get(options.input)];
                    case 1:
                        _d.sent();
                        return [4 /*yield*/, driver.wait(selenium_webdriver_1.until.elementsLocated(selenium_webdriver_1.By.xpath('/html/body/div[1]/div/div[2]/div[2]/div[1]/div/div[2]/div/div/child::*')))];
                    case 2:
                        thumbnail = _d.sent();
                        i = 1;
                        _d.label = 3;
                    case 3:
                        if (!(i <= thumbnail.length)) return [3 /*break*/, 9];
                        locator = "/html/body/div[1]/div/div[2]/div[2]/div[1]/div/div[2]/div/div/div[" + i + "]/div/img";
                        return [4 /*yield*/, driver.wait(selenium_webdriver_1.until.elementLocated(selenium_webdriver_1.By.xpath(locator)))];
                    case 4:
                        elem = _d.sent();
                        _b = (_a = result).push;
                        _c = {
                            id: i
                        };
                        return [4 /*yield*/, elem.getTagName()];
                    case 5:
                        _c.tag = _d.sent();
                        return [4 /*yield*/, elem.getAttribute('src')];
                    case 6:
                        _c.src = _d.sent();
                        return [4 /*yield*/, elem.getAttribute('alt')];
                    case 7:
                        _b.apply(_a, [(_c.alt = _d.sent(),
                                _c)]);
                        _d.label = 8;
                    case 8:
                        i++;
                        return [3 /*break*/, 3];
                    case 9: return [3 /*break*/, 13];
                    case 10:
                        err_1 = _d.sent();
                        return [2 /*return*/, color_1.red_color(err_1, 'console')];
                    case 11: return [4 /*yield*/, driver.quit()];
                    case 12:
                        _d.sent();
                        return [2 /*return*/, resolve(result)];
                    case 13: return [2 /*return*/];
                }
            });
        }); });
    });
    cmd.then(function (res) {
        return TokopediaDownloadHandler({
            input: res,
            output: options.output,
            modify: options.modify
        });
    });
}
exports.TokopediaHandler = TokopediaHandler;
