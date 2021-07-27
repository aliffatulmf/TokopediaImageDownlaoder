import { existsSync, mkdir } from 'fs';

export function makeDirIfNotExist(location: string) {
    return new Promise<string>((resolve, reject) => {
        if (!existsSync(location)) {
            mkdir(location, (err) => {
                if (err) reject(err);
            });
        }
        resolve(location);
    });
}
