const Web3 = require('web3')

export class LayerZeroPrinter {
    public static printSend(fromChainName: string, toChainName:string, txResult: any, remoteChainEstimateFee: any) {
        console.log(`Remote chain estimated fee: ${remoteChainEstimateFee} wei\n`)
        console.log(`[${fromChainName}] from: ${txResult.from}`)
        console.log(`[${toChainName}] to: ${txResult.to}`)
        console.log(`TxHash: ${txResult.transactionHash}\n`)
    }

    public static printBalance(
        chainName: string,
        address: string,
        nativeSymbol: string,
        nativeBalance: string,
        oftv2Symbol: string,
        oftv2Balance: string
    ) {
        console.log(`[${chainName} balance]`)
        console.log(`address: ${address}`)
        console.log(`native: ${Web3.utils.fromWei(nativeBalance, 'ether')} ${nativeSymbol.toUpperCase()}`)
        console.log(`oftv2 : ${Web3.utils.fromWei(oftv2Balance, 'ether')} ${oftv2Symbol.toUpperCase()}\n`)
    }
}