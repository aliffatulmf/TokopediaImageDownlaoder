import https from 'https';
import fs from 'fs';
import path from 'path/win32';
import { finished } from 'stream';
import { green_color, red_color, blue_color } from './color';
import { makeDirIfNotExist } from './mini';

interface ILinkObject {
    uri: string;
    protocol: string;
    square: boolean;
    source: string;
    size: number;
    name: string;
    type: string;
    modified: boolean;
}

interface IRobotObject {
    id: number;
    tag: string;
    src: string;
    alt: string;
}

export class Tokopedia {
    private matchObject: ILinkObject[] = [];
    public outputDir: string = 'output';

    public setOutput(location: string) {
        this.outputDir = path.normalize(location);
    }

    public parseLink(input: IRobotObject[]) {
        const pattern =
            /^(https|http)[:\/]+(images|ecs7|ecs7-p).*cache\/(\d+)(\-square)?.+?([\w\-]*[a-z0-9]).(jpg|jpeg|png|webp)/;

        let result: ILinkObject[] = [];
        try {
            for (let link of input) {
                let match: RegExpMatchArray | null = link.src.match(pattern);

                if (match![3] === '') {
                    throw Error('Check failed');
                }

                result.push({
                    uri: match![0],
                    protocol: match![1],
                    square: Boolean(match![4]),
                    source: match![2],
                    size: parseInt(match![3]),
                    name: match![5],
                    type: match![6],
                    modified: false
                });
            }
        } catch (err) {
            console.log(err);
        }

        this.matchObject = result;
        return this;
    }

    public linkModify() {
        let size = 900;

        for (let i of this.matchObject) {
            if (i.square) {
                i.uri = i.uri.replace(`/${i.size}-square/`, `/${size}/`);
            } else {
                i.uri = i.uri.replace(`/${i.size}/`, `/${size}/`);
            }

            i.size = size;
            i.square = false;
            i.modified = true;
        }

        return this;
    }

    public getLinks() {
        return this.matchObject;
    }

    public save() {
        let dir = makeDirIfNotExist(this.outputDir);
        dir.then(async (location) => {
            for (let i of this.matchObject) {
                let destination = path.join(
                    location,
                    [i.name, i.type].join('.')
                );

                let streamPipe = fs.createWriteStream(destination);
                let stream = https.get(i.uri, (res) => {
                    res.pipe(streamPipe);
                });

                await new Promise<string>((resolve, reject) => {
                    blue_color('\n' + destination, 'process');

                    finished(stream, (err) => {
                        !err ? resolve(' success') : reject(' failed');
                    });
                })
                    .then((res) => {
                        green_color(res, 'process');
                    })
                    .catch((err) => {
                        red_color(err, 'process');
                    });
            }
        }).catch((err) => {
            red_color(err, 'console');
        });
    }
}
