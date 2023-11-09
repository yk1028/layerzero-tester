export class ChainInfo {
    constructor(
        public readonly chainName: string,
        public readonly chainId: string,
        public readonly nativeSymbol: string,
        public readonly rpcUrl: string,
        public readonly layerzeroChainId: string,
        public readonly layerzeroEndpoint: string,
        public readonly oftv2ContractAddress: string,
        public readonly signerPrivateKey: string
    ) { }
}