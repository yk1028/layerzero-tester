#! /usr/bin/env node

import { LayerZeroController } from "./layerzero/LayerZeroController"
import { Command } from "commander";

const main = async () => {
    const figlet = require("figlet");
    console.log(figlet.textSync("LayerZero Tester"));
    console.log("\n");

    const program = new Command();

    const lzController = new LayerZeroController()

    program
        .name('lztester')
        .version('1.0.0')
        .allowExcessArguments(false)
        .configureHelp({ subcommandTerm: (cmd) => cmd.name() + ' ' })
        .description('Send oftv2 token from source chain to desination chain by layerzero.')

    program
        .command('send')
        .description('send source chain to destination chain. (cube <-> bsc-testnet, fuji)')
        .argument('<source chain>', 'srouce chain name')
        .argument('<destination chain>', 'srouce chain name')
        .option('-a, --amount <amount>', 'token amount ', '1')
        .option('-t, --to <address>', 'address to receive token (default: destination chain signer)')
        .action(async (srcChain, dstChain, options) => {
            if (options.to) {
                await lzController.sendToAddress(srcChain, dstChain, options.to, options.amount)
            } else {
                await lzController.send(srcChain, dstChain, options.amount)
            }
        });

    program
        .command('balance')
        .description('query signer balance by chain')
        .option('-c, --chain <chain>', 'chain name')
        .option('-t, --to <address>', 'address to query balance (default: destination chain signer)')
        .action(async (options) => {
            if (Object.keys(options).length === 0) {
                await lzController.balanceAll()
            } else {
                await lzController.balance(options.chain)
            }
        });

    program
        .command('mint')
        .description('curruently mint is only available on \'cube\'')
        .option('-a, --amount <amout>', 'mint amount', '1000000000000000000')
        .action(async (options) => {
            await lzController.mint("cube", options.amount)
        });

    program.parse();
}

main();