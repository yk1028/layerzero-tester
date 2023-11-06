const Web3 = require('web3')
const { ethers } = require('ethers')

import { ChainInfo } from "./ChainInfo"
import { LayerZeroConstants } from "./LayerZeroConstants"

export class LayerZeroService {

    private web3
    private oftv2Contract
    private gasPrice = null

    constructor(private chainInfo: ChainInfo) {
        this.web3 = new Web3(new Web3.providers.HttpProvider(chainInfo.rpcUrl))

        this.web3.eth.accounts.wallet.add(chainInfo.signerPrivateKey)

        this.oftv2Contract = new this.web3.eth.Contract(LayerZeroConstants.OFTV2_ABI, chainInfo.oftv2ContractAddress)
    }

    async send(dstChainService: LayerZeroService, amount: string) {
        await this.sendFrom(
            dstChainService.chainInfo.chainId,
            dstChainService.chainInfo.signerAddress,
            amount
        )
    }

    async sendFrom(remoteChainId: string, toAddress: string, amount: string) {
        if (this.gasPrice == null) {
            this.gasPrice = await this.web3.eth.getGasPrice();
        }

        const remoteChainEstimateFee = (await this.oftv2Contract.methods.estimateSendFee(
            remoteChainId,
            this.encodeToAddress(toAddress),
            amount,
            false,
            LayerZeroConstants.DEFAULT_ADAPTER_PARMAS
        ).call())[0]

        const callParams = [
            this.chainInfo.signerAddress,
            this.chainInfo.signerAddress,
            LayerZeroConstants.DEFAULT_ADAPTER_PARMAS
        ]

        const sendFrom = this.oftv2Contract.methods.sendFrom(
            this.chainInfo.signerAddress,
            remoteChainId,
            this.encodeToAddress(toAddress),
            amount,
            callParams
        )

        const estimatedGas = await sendFrom.estimateGas({ from: this.chainInfo.signerAddress, value: remoteChainEstimateFee })

        const result = await sendFrom.send({
            from: this.chainInfo.signerAddress,
            value: remoteChainEstimateFee,
            gas: estimatedGas,
            gasPrice: this.gasPrice
        })

        console.log(result)
    }

    private encodeToAddress(toAddress: string): string {
        return ethers.AbiCoder.defaultAbiCoder().encode(["address"], [toAddress])
    }

}