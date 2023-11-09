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

    async send(srcChain: string, dstChain: string, amount: string) {
        const srcService = this.chainServiceList[srcChain]
        const dstService = this.chainServiceList[dstChain]

        if (!srcService) {
            console.error("LZ Tester: not found source chain service.")
            return
        }

        if (!dstService) {
            console.error("LZ Tester: not found destination chain service.")
            return
        }

        await srcService.send(dstService, amount)
    }

    async balance(chain: string) {
        const chainService = this.chainServiceList[chain]

        if (!chainService) {
            console.error("LZ Tester: not found chain service.")
            return
        }

        await chainService.getSignerBalance()
    }

    async balanceAll() {
        for(const service in this.chainServiceList) {
            this.chainServiceList[service].getSignerBalance()
        }
    }
}