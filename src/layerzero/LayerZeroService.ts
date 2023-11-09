const Web3 = require('web3')
const { ethers } = require('ethers')

import { ChainInfo } from "./ChainInfo"
import { LayerZeroConstants } from "./LayerZeroConstants"
import { LayerZeroPrinter } from "./LayerZeroPrinter"

export class LayerZeroService {

    private web3
    private oftv2Contract
    private signerAccount
    
    private gasPrice = null

    constructor(private chainInfo: ChainInfo) {
        this.web3 = new Web3(new Web3.providers.HttpProvider(chainInfo.rpcUrl))

        this.web3.eth.accounts.wallet.add(chainInfo.signerPrivateKey)

        this.oftv2Contract = new this.web3.eth.Contract(LayerZeroConstants.OFTV2_ABI, chainInfo.oftv2ContractAddress)

        this.signerAccount = this.web3.eth.accounts.privateKeyToAccount(chainInfo.signerPrivateKey).address
    }

    async send(dstChainService: LayerZeroService, amount: string) {

        if (this.gasPrice == null) {
            this.gasPrice = await this.web3.eth.getGasPrice();
        }

        const remoteChainId = dstChainService.chainInfo.layerzeroChainId
        const toAddress = dstChainService.signerAccount

        const sharedAmount = amount + "000000000000"

        const remoteChainEstimateFee = (await this.oftv2Contract.methods.estimateSendFee(
            remoteChainId,
            this.encodeToAddress(toAddress),
            sharedAmount,
            false,
            LayerZeroConstants.DEFAULT_ADAPTER_PARMAS
        ).call())[0]

        const callParams = [
            this.signerAccount,
            this.signerAccount,
            LayerZeroConstants.DEFAULT_ADAPTER_PARMAS
        ]

        const sendFrom = this.oftv2Contract.methods.sendFrom(
            this.signerAccount,
            remoteChainId,
            this.encodeToAddress(toAddress),
            sharedAmount,
            callParams
        )

        const estimatedGas = await sendFrom.estimateGas({ from: this.signerAccount, value: remoteChainEstimateFee })

        const txResult = await sendFrom.send({
            from: this.signerAccount,
            value: remoteChainEstimateFee,
            gas: estimatedGas,
            gasPrice: this.gasPrice
        })

        LayerZeroPrinter.printSend(this.chainInfo.chainName, dstChainService.chainInfo.chainName, txResult, remoteChainEstimateFee)

        await this.balance()
    }

    private encodeToAddress(toAddress: string): string {
        return ethers.AbiCoder.defaultAbiCoder().encode(["address"], [toAddress])
    }

    public async balance() {
        const nativeBalance = await this.web3.eth.getBalance(this.signerAccount)
        const oftv2Symbol = await this.oftv2Contract.methods.symbol().call();
        const oftv2Balance = await this.oftv2Contract.methods.balanceOf(this.signerAccount).call();

        LayerZeroPrinter.printBalance(
            this.chainInfo.chainName,
            this.signerAccount,
            this.chainInfo.nativeSymbol,
            nativeBalance,
            oftv2Symbol,
            oftv2Balance  
         );
    }

    public async mint(amount: string) {
        if ("cube" !== this.chainInfo.chainName) {
            throw Error("LZ Tester: mint is only available on 'cube'")
        }

        if (this.gasPrice == null) {
            this.gasPrice = await this.web3.eth.getGasPrice();
        }

        const mint = this.oftv2Contract.methods.mint(this.signerAccount, amount)

        const estimatedGas = await mint.estimateGas({ from: this.signerAccount })

        const txResult = await mint.send({
            from: this.signerAccount,
            gas: estimatedGas,
            gasPrice: this.gasPrice
        })

        const oftv2Symbol = await this.oftv2Contract.methods.symbol().call();

        LayerZeroPrinter.printMint(this.chainInfo.chainName, amount, oftv2Symbol, txResult)

        await this.balance()
    }
}