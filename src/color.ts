type ColorExecType = 'process' | 'console';

export function green_color(message: string, type: ColorExecType) {
    if (type == 'console') {
        console.log('\x1b[32m' + message + '\x1b[0m');
    } else if (type == 'process') {
        process.stdout.write('\x1b[32m' + message + '\x1b[0m');
    }
}

export function red_color(message: string, type: ColorExecType) {
    if (type == 'console') {
        console.log('\x1b[31m' + message + '\x1b[0m');
    } else if (type == 'process') {
        process.stdout.write('\x1b[31m' + message + '\x1b[0m');
    }
}
export function blue_color(message: string, type: ColorExecType) {
    if (type == 'console') {
        console.log('\x1b[36m' + message + '\x1b[0m');
    } else if (type == 'process') {
        process.stdout.write('\x1b[36m' + message + '\x1b[0m');
    }
}

// let output_color = ( message ) => console.log( '\x1b[36m', message, '\x1b[0m' )
export let yellow_color = (message: string) =>
    console.log('\x1b[33m', '\r' + message, '\x1b[0m');
