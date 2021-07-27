"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.Robot = void 0;
var selenium_webdriver_1 = require("selenium-webdriver");
var chrome_1 = require("selenium-webdriver/chrome");
var color_1 = require("./color");
var path_1 = __importDefault(require("path"));
var Robot = /** @class */ (function () {
    function Robot() {
        this.options = new chrome_1.Options();
        this.arguments = [];
        this.options.addArguments('--user-agent=Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.3538.77 Safari/537.36');
        this.options.excludeSwitches('enable-logging', 'enable-automation');
    }
    Robot.prototype.loadArguments = function () {
        var _a;
        (_a = this.options).addArguments.apply(_a, this.arguments);
    };
    Robot.prototype.setHeadless = function () {
        this.options.headless();
    };
    Robot.prototype.setCache = function () {
        this.arguments.push('--user-data-dir=' + path_1["default"].join(process.cwd() + 'cache'));
    };
    Robot.prototype.showHeader = function (name) {
        color_1.yellow_color(name + ' Image Downloader');
    };
    Robot.prototype.writeCommand = function (callback) {
        var driver = new selenium_webdriver_1.Builder()
            .setChromeOptions(this.options)
            .forBrowser('chrome')
            .build();
        return callback(driver);
    };
    return Robot;
}());
exports.Robot = Robot;
