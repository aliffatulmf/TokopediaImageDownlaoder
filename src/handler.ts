import { By, until } from 'selenium-webdriver';
import { red_color } from './color';
import { Robot } from './robot';
import { Tokopedia } from './tokopedia';


function TokopediaDownloadHandler(options: {
    input: any;
    output: string;
    modify: boolean;
}) {
    let toped = new Tokopedia();
    if (options.output) toped.setOutput(options.output);

    toped.parseLink(options.input);
    if (options.output) toped.setOutput(options.output);
    if (options.modify) toped.linkModify();
    toped.save();
}

export function TokopediaHandler(options: {
    cache: boolean;
    headless: boolean;
    natural: boolean;
    modify: boolean;
    input: string;
    output: string;
}) {
    let robot = new Robot();

    robot.showHeader('Tokopedia');

    if (options.cache) robot.setCache();
    if (options.headless) robot.setHeadless();
    if (options.natural) robot.loadArguments();
    let cmd = new Promise<object[]>((resolve, reject) => {
        let result: object[] = [];
        robot.writeCommand(async (driver) => {
            try {
                await driver.get(options.input);

                let thumbnail: object[] = await driver.wait(
                    until.elementsLocated(
                        By.xpath(
                            '/html/body/div[1]/div/div[2]/div[2]/div[1]/div/div[2]/div/div/child::*'
                        )
                    )
                );

                for (let i = 1; i <= thumbnail.length; i++) {
                    let locator: string = `/html/body/div[1]/div/div[2]/div[2]/div[1]/div/div[2]/div/div/div[${i}]/div/img`;
                    let elem = await driver.wait(
                        until.elementLocated(By.xpath(locator))
                    );

                    result.push({
                        id: i,
                        tag: await elem.getTagName(),
                        src: await elem.getAttribute('src'),
                        alt: await elem.getAttribute('alt')
                    });
                }
            } catch (err) {
                return red_color(err, 'console');
            } finally {
                await driver.quit();
                return resolve(result);
            }
        });
    });

    cmd.then((res) =>
        TokopediaDownloadHandler({
            input: res,
            output: options.output,
            modify: options.modify
        })
    );
}
