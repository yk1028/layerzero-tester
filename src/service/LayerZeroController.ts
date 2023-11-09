import { ChainInfo } from "./ChainInfo"
import { LayerZeroService } from "./LayerZeroService";

type ChainServiceList = {
    [name: string]: LayerZeroService
}

export class LayerZeroController {

    private static CHAIN_INFO = require("../../info/.chain_info.json")

    private chainServiceList: ChainServiceList = {}

    constructor() {
        this.initChainServiceList();
    }

    private initChainServiceList() {
        for (const chain in LayerZeroController.CHAIN_INFO) {
            const info = LayerZeroController.CHAIN_INFO[chain]

            this.chainServiceList[chain] = new LayerZeroService(
                new ChainInfo(
                    chain,
                    info["chain_id"],
                    info["native_symbol"],
                    info["rpc_url"],
                    info["lz_chain_id"],
                    info["lz_endpoint_address"],
                    info["oftv2_address"],
                    info["signer_privatekey"],
                    info["signer_address"]
                ))
        }
    }

    async send(srcChainName: string, dstChainName: string, amount: string) {
        const srcService = this.getChainService(srcChainName)
        const dstService = this.getChainService(dstChainName)

        await srcService.send(dstService, amount)
    }

    async balance(chainName: string) {
        const chainService = this.getChainService(chainName)

        await chainService.balance()
    }

    async balanceAll() {
        for(const service in this.chainServiceList) {
            this.chainServiceList[service].balance()
        }
    }

    async mint(chainName: string, amount:string) {
        const chainService = this.getChainService(chainName)

        await chainService.mint(amount)
    }

    private getChainService(chainName: string): LayerZeroService{
        if (!(chainName in this.chainServiceList)) {
            throw Error(`LZ Tester: not found '${chainName}' chain service.`)
        }
        return this.chainServiceList[chainName]
    }
}