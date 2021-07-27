"use strict";
exports.__esModule = true;
exports.makeDirIfNotExist = void 0;
var fs_1 = require("fs");
function makeDirIfNotExist(location) {
    return new Promise(function (resolve, reject) {
        if (!fs_1.existsSync(location)) {
            fs_1.mkdir(location, function (err) {
                if (err)
                    reject(err);
            });
        }
        resolve(location);
    });
}
exports.makeDirIfNotExist = makeDirIfNotExist;
