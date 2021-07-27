import { Builder, WebDriver } from 'selenium-webdriver';
import { Options } from 'selenium-webdriver/chrome';
import { yellow_color } from './color';
import path from 'path';

export class Robot {
    options = new Options();
    arguments: string[] = [];

    constructor() {
        this.options.addArguments(
            '--user-agent=Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.3538.77 Safari/537.36'
        );
        this.options.excludeSwitches('enable-logging', 'enable-automation');
    }

    loadArguments() {
        this.options.addArguments(...this.arguments);
    }

    setHeadless() {
        this.options.headless();
    }

    setCache() {
        this.arguments.push(
            '--user-data-dir=' + path.join(process.cwd() + 'cache')
        );
    }

    showHeader(name: string) {
        yellow_color(name + ' Image Downloader');
    }

    writeCommand(callback: (driver: WebDriver) => void) {
        let driver = new Builder()
            .setChromeOptions(this.options)
            .forBrowser('chrome')
            .build();
        return callback(driver);
    }
}
