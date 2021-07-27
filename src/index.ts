import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { TokopediaHandler } from './handler';

yargs(hideBin(process.argv))
    .command(
        'download',
        '',
        (yargs) => {
            return yargs
                .options({
                    input: {
                        alias: 'i',
                        type: 'string',
                        desc: 'input link to download',
                        group: 'Arguments'
                    },
                    output: {
                        alias: 'o',
                        type: 'string',
                        desc: 'write output to file',
                        group: 'Arguments'
                    },
                    headless: {
                        type: 'boolean',
                        default: true,
                        desc: 'headless mode',
                        group: 'Arguments'
                    },
                    cache: {
                        alias: 'c',
                        type: 'boolean',
                        default: false,
                        desc: 'enable local cache',
                        group: 'Arguments'
                    },
                    modify: {
                        type: 'boolean',
                        default: true,
                        desc: 'download HD image',
                        group: 'Arguments'
                    },
                    natural: {
                        type: 'boolean',
                        default: false,
                        desc: 'run without arguments',
                        group: 'Arguments'
                    }
                })
                .demandOption('input');
        },
        (args) => TokopediaHandler(args)
    )
    .strict().argv;
