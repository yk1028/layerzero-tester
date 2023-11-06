const { ethers } = require('ethers')

export class LayerZeroConstants {
    public static readonly DEFAULT_ADAPTER_PARMAS: string = ethers.solidityPacked(["uint16", "uint256"], [1, 100000])
    public static readonly OFTV2_ABI: string = require("./oftv2Abi.json")
}