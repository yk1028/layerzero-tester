const Web3 = require('web3')

export class LayerZeroPrinter {
    public static printSend(txResult: any, remoteChainEstimateFee: any) {
        console.log("remote chain estimated fee: " + remoteChainEstimateFee + " wei")
        console.log("from: " + txResult.from)
        console.log("to: " + txResult.to)
        console.log("txHash: " + txResult.transactionHash)
    }

    public static printBalance(
        chainName: string,
        address: string,
        nativeSymbol: string,
        nativeBalance: string,
        oftv2Symbol: string,
        oftv2Balance: string
    ) {
        console.log(`[${chainName}]`)
        console.log(`address: ${address}`)
        console.log(`native: ${Web3.utils.fromWei(nativeBalance, 'ether')} ${nativeSymbol.toUpperCase()}`)
        console.log(`oftv2 : ${Web3.utils.fromWei(oftv2Balance, 'ether')} ${oftv2Symbol.toUpperCase()}\n`)
    }
}