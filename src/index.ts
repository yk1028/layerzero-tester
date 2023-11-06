#! /usr/bin/env node

import { LayerZeroManager } from "./service/LayerZeroManager"
import { Command } from "commander";

const main = async () => {
    const figlet = require("figlet");
    console.log(figlet.textSync("LayerZero Tester"));

    const program = new Command();

    program
        .version('1.0.0')
        .description("Send oftv2 token from source chain to desination chain by layerzero.")
        .command('send', 'send oftv2 source chain to destination chain. (option -a <amount>)')
        .argument('<source chain>', 'srouce chain name')
        .argument('<destination chain>', 'srouce chain name')
        .option('-a, --amount', 'token amount (defualt: 1)', "1")
        .action(async (srcChain, dstChain, options) => {
            const lzManager = new LayerZeroManager()
            await lzManager.send(srcChain, dstChain, options.amount)
        });

    await program.parseAsync(process.argv);
}

main();