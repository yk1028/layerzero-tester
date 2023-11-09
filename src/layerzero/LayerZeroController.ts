const Web3 = require('web3')

import { ChainInfo } from "./ChainInfo"
import { LayerZeroService } from "./LayerZeroService";

type ChainServiceList = {
    [name: string]: LayerZeroService
}

export class LayerZeroController {

    private static CHAIN_INFO = require("../../info/chain_info.json")
    private static PRIVATEKY_INFO = require("../../info/.private_key.json")

    private chainServiceList: ChainServiceList = {}

    constructor() {
        this.initChainServiceList();
    }

    private initChainServiceList() {
        for (const chain in LayerZeroController.CHAIN_INFO) {
            const info = LayerZeroController.CHAIN_INFO[chain]
            const privateKey = LayerZeroController.PRIVATEKY_INFO[chain]

            if (!privateKey) {
                throw Error(`LZ Tester: not found '${chain}' signer private key.`)
            }

            this.chainServiceList[chain] = new LayerZeroService(
                new ChainInfo(
                    chain,
                    info["chain_id"],
                    info["native_symbol"],
                    info["rpc_url"],
                    info["lz_chain_id"],
                    info["lz_endpoint_address"],
                    info["oftv2_address"],
                    privateKey
                ))
        }
    }

    private getChainService(chainName: string): LayerZeroService {
        if (!(chainName in this.chainServiceList)) {
            throw Error(`LZ Tester: not found '${chainName}' chain service.`)
        }
        return this.chainServiceList[chainName]
    }

    async send(srcChainName: string, dstChainName: string, amount: string) {
        const srcService = this.getChainService(srcChainName)
        const dstService = this.getChainService(dstChainName)

        await srcService.send(dstService, amount)
        await srcService.balance()
    }

    async sendToAddress(srcChainName: string, dstChainName: string, toAddress: string, amount: string) {
        const srcService = this.getChainService(srcChainName)
        const dstService = this.getChainService(dstChainName)

        await srcService.sendToAddress(dstService, toAddress, amount)
        await srcService.balance()
    }

    async balanceOf(chainName: string, address: string) {
        const chainService = this.getChainService(chainName)

        await chainService.balanceOf(address)
    }

    async balance(chainName: string) {
        const chainService = this.getChainService(chainName)

        await chainService.balance()
    }

    async balanceAll() {
        for (const service in this.chainServiceList) {
            this.chainServiceList[service].balance()
        }
    }

    async mint(chainName: string, amount: string) {
        const chainService = this.getChainService(chainName)

        await chainService.mint(amount)
        await chainService.balance()
    }
}