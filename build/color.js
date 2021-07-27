"use strict";
exports.__esModule = true;
exports.yellow_color = exports.blue_color = exports.red_color = exports.green_color = void 0;
function green_color(message, type) {
    if (type == 'console') {
        console.log('\x1b[32m' + message + '\x1b[0m');
    }
    else if (type == 'process') {
        process.stdout.write('\x1b[32m' + message + '\x1b[0m');
    }
}
exports.green_color = green_color;
function red_color(message, type) {
    if (type == 'console') {
        console.log('\x1b[31m' + message + '\x1b[0m');
    }
    else if (type == 'process') {
        process.stdout.write('\x1b[31m' + message + '\x1b[0m');
    }
}
exports.red_color = red_color;
function blue_color(message, type) {
    if (type == 'console') {
        console.log('\x1b[36m' + message + '\x1b[0m');
    }
    else if (type == 'process') {
        process.stdout.write('\x1b[36m' + message + '\x1b[0m');
    }
}
exports.blue_color = blue_color;
// let output_color = ( message ) => console.log( '\x1b[36m', message, '\x1b[0m' )
var yellow_color = function (message) {
    return console.log('\x1b[33m', '\r' + message, '\x1b[0m');
};
exports.yellow_color = yellow_color;
