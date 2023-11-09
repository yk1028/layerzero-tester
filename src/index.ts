#! /usr/bin/env node

import { LayerZeroController } from "./service/LayerZeroController"
import { Command } from "commander";

const main = async () => {
    const figlet = require("figlet");
    console.log(figlet.textSync("LayerZero Tester"));

    const program = new Command();

    const lzManager = new LayerZeroController()

    program
        .version('1.0.0')
        .configureHelp({ subcommandTerm: (cmd) => cmd.name() + ' ' + cmd.usage() })
        .description("Send oftv2 token from source chain to desination chain by layerzero.")
    
    program
        .command('send')
        .argument('<source chain>', 'srouce chain name')
        .argument('<destination chain>', 'srouce chain name')
        .option('-a, --amount', 'token amount (defualt: 1)', "1")
        .action(async (srcChain, dstChain, options) => {
            await lzManager.send(srcChain, dstChain, options.amount)
        });
    
    program.parse();
}

main();