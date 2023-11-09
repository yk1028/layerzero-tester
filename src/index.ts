#! /usr/bin/env node

import { LayerZeroController } from "./service/LayerZeroController"
import { Command } from "commander";

const main = async () => {
    const figlet = require("figlet");
    console.log(figlet.textSync("LayerZero Tester"));
    console.log("\n");

    const program = new Command();

    const lzController = new LayerZeroController()

    program
        .name("lztester")
        .version('1.0.0')
        .allowExcessArguments(false)
        .configureHelp({ subcommandTerm: (cmd) => cmd.name() + ' ' + cmd.usage() })
        .description("Send oftv2 token from source chain to desination chain by layerzero.")
    
    program
        .command('send')
        .argument('<source chain>', 'srouce chain name')
        .argument('<destination chain>', 'srouce chain name')
        .option('-a, --amount <amount>', 'token amount (defualt: 1)', "1")
        .action(async (srcChain, dstChain, options) => {
            await lzController.send(srcChain, dstChain, options.amount)
        });

    program
        .command('balance')
        .option('-c, --chain <chain>', 'chain name')
        .action(async (options) => {
            if (Object.keys(options).length === 0) {
                await lzController.balanceAll()
            } else {
                await lzController.balance(options.chain)
            }
        });
    
    program.parse();
}

main();