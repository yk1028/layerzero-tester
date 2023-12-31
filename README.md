# LayerZero testing tool
layerzero를 통한 cube와 다른 chain간 간편 전송 테스트 도구, [OFTV2](https://github.com/layerzero-labs/solidity-examples/blob/main/contracts/token/oft/v2/OFTV2.sol) contrat로 테스트 진행

## Private key
- `info/.private_key.json` 위치에 chain별 **signer privatekey** 등록 필요
- example
    ```
    {
        "cube": "{cube signer private key}",
        "bsc-testnet": "{bsc-testnet signer private key}",
        "fuji": "{fuji signer private key}",
        "sepolia": "{sepolia signer private key}"
    }
    ```

## Getting start
``` shell
npm i
npm run build
./lzt -h
```

## Commands
- send
  ``` shell
  ./lzt send <source chain> <destination chain> [-a amount] [-t address]
  ```
  - `cube`에서 보내거나 `cube`로 보내는 전송만 가능 ( ex. `cube` -> `other chain` / `other chain` -> `cube`)
  - `-a, --amount <amount>` amount 지정 가능 (defualt: 0.000001 XLMT)
  - `-t, --to <address>` target address 지정 가능 (defualt: destination chain signer address)

- mint
  ``` shell
  ./lzt mint [-a amount]
  ```
  - `cube` 에서만 mint 가능
  - `-a, --amount <amount>` minting amount 지정 가능 (defualt: 1.0 XLMT)

- balance
  - chain별 등록된 signer의 native token과 oftv2 token balance 조회 기능
  - `-c, --chain <chain>` 조회 chain 지정 가능 (defualt: 전체 chains)
  - `-t, --to <address>` target address 지정 가능 (defualt: destination chain signer address)
  ``` shell
  ./lzt balance [-c chain] [-t address]
  ```


## Supported chains
### Testnets
- cube, bsc-testnet, fuji
``` json 
{
    "cube": {
        "chain_id"              : "47",
        "native_symbol"         : "XPLA",
        "rpc_url"               : "https://cube-evm-rpc.xpla.dev/",
        "lz_chain_id"           : "10216",
        "lz_endpoint_address"   : "0x83c73Da98cf733B03315aFa8758834b36a195b87",
        "oftv2_address"         : "0x7d4a974cCdd1b3378005d5D1001fDA8A06D96A2c"
    },
    "bsc-testnet": {
        "chain_id"              : "97",
        "native_symbol"         : "TBNB",
        "rpc_url"               : "https://data-seed-prebsc-1-s1.binance.org:8545/",
        "lz_chain_id"           : "10102",
        "lz_endpoint_address"   : "0x6Fcb97553D41516Cb228ac03FdC8B9a0a9df04A1",
        "oftv2_address"         : "0x31E88b7960d2d6B97f131be928Ab2878076C8f52"
    },
    "fuji": {
        "chain_id"              : "97",
        "native_symbol"         : "AVAX",
        "rpc_url"               : "https://api.avax-test.network/ext/bc/C/rpc",
        "lz_chain_id"           : "10102",
        "lz_endpoint_address"   : "0x6Fcb97553D41516Cb228ac03FdC8B9a0a9df04A1",
        "oftv2_address"         : "0x5B5d5a4a591322901e7a1AAFedeB6E78f40d5D0e"
    },
    "sepolia": {
        "chain_id"              : "11155111",
        "native_symbol"         : "SepoliaETH",
        "rpc_url"               : "https://ethereum-sepolia.publicnode.com",
        "lz_chain_id"           : "10161",
        "lz_endpoint_address"   : "0xae92d5aD7583AD66E49A0c67BAd18F6ba52dDDc1",
        "oftv2_address"         : "0x3e6601D35A60A327d2ee8AB1fB1abEFA2340F395"
    }
}
```

### OFTV2 Tokens
1. [cube](https://explorer.xpla.io/testnet/token/0x7d4a974ccdd1b3378005d5d1001fda8a06d96a2c)
   - address - `0x7d4a974cCdd1b3378005d5D1001fDA8A06D96A2c`
   - name - `xpla layerzero multi chain test token`
   - symbol - `XLMT`
   - local decimal: `18`
   - shared decimal: `6`
   - mint availability: `yes`
2. [bsc-testnet](https://testnet.bscscan.com/token/0x31E88b7960d2d6B97f131be928Ab2878076C8f52)
   - address - `0x31E88b7960d2d6B97f131be928Ab2878076C8f52`
   - name - `xpla layerzero multi chain test token in bsc-testnet`
   - symbol - `bXLMT`
   - local decimal: `18`
   - shared decimal: `6`
   - mint availability: `no`
3. [fuji](https://testnet.snowtrace.io/token/0x5B5d5a4a591322901e7a1AAFedeB6E78f40d5D0e)
   - address - `0x5B5d5a4a591322901e7a1AAFedeB6E78f40d5D0e`
   - name - `xpla layerzero multi chain test token in fuji`
   - symbol - `fXLMT`
   - local decimal: `18`
   - shared decimal: `6`
   - mint availability: `no`
4. [sepolia](https://sepolia.etherscan.io/token/0x3e6601D35A60A327d2ee8AB1fB1abEFA2340F395)
   - address - `0x3e6601D35A60A327d2ee8AB1fB1abEFA2340F395`
   - name - `xpla layerzero multi chain test token in sepolia`
   - symbol - `fXLMT`
   - local decimal: `18`
   - shared decimal: `6`
   - mint availability: `no`

### Add chain
1. 추가하려는 chain에 OFTV2 contract 배포 및 cube의 OFTV2 contract(`0x7d4a974cCdd1b3378005d5D1001fDA8A06D96A2c`)와 setTrustedRemote, setMinDstGas 설정
1. `info/chain.info.json`에 추가할 체인 정보 입력
2. `info/.private_key.json`에 해당 chain의 signer 정보 입력

## Todo
- [x] add layerzero service
    - [x] send
    - [x] balnace
    - [x] mint
- [x] commands
    - [x] send
    - [x] balance
    - [x] mint
- [x] manage chain info and private key
    - [x] chain info
    - [x] private key
- [x] docs
- [x] send to target address
- [x] query balance to target address
- [ ] add new chain (deploy and config)
- [ ] mainnet