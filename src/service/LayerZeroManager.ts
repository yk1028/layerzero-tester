import { ChainInfo } from "./ChainInfo"
import { LayerZeroService } from "./LayerzeroService";

type ChainServiceList = {
    [name: string]: LayerZeroService
}

export class LayerZeroManager {

    private chainServiceList: ChainServiceList = {}

    constructor() {
        const chainInfo = require("../.chain_info.json")

        for (const chain in chainInfo) {
            const info = chainInfo[chain]

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

    send(srcChain: string, dstChain: string, amount: string) {
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

        srcService.send(dstService, amount)
    }
}