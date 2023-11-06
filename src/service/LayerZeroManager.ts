import { ChainInfo } from "./ChainInfo"
import { LayerZeroService } from "./LayerZeroService";

type ChainServiceList = {
    [name: string]: LayerZeroService
}

export class LayerZeroManager {

    private static CHAIN_INFO = require("../../info/.chain_info.json")

    private chainServiceList: ChainServiceList = {}

    constructor() {
        for (const chain in LayerZeroManager.CHAIN_INFO) {
            const info = LayerZeroManager.CHAIN_INFO[chain]

            this.chainServiceList[chain] = new LayerZeroService(
                new ChainInfo(
                    info["chain_id"],
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
            console.error("LZ Tester: not found source chain service")
            return
        }

        if (!dstService) {
            console.error("LZ Tester: not found destination chain service")
            return
        }

        await srcService.send(dstService, amount)
    }
}