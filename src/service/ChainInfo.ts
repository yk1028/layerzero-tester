export class ChainInfo {
    constructor(
        public readonly chainId: string,
        public readonly rpcUrl: string,
        public readonly layerzeroChainId: string,
        public readonly layerzeroEndpoint: string,
        public readonly oftv2ContractAddress: string,
        public readonly signerPrivateKey: string,
        public readonly signerAddress: string
    ) { }
}