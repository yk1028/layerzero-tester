# LayerZero testing tool
| layerzero를 통한 chain간 전송 테스트 도구, cube에서 발행한 OFTV2로 테스트 진행
## Todo
- [x] add layerzero service
    - [x] sendFrom
    - [x] balnace
- [x] manage chain info and private key
    - [x] chain info
    - [x] private key
- [x] commands
    - [x] sendFrom
    - [x] balance
- [x] cube oftv2 mint
- [ ] docs
- [ ] mainnet

## Getting start
``` shell
npm i
ts-node src/index.ts -h
```

## Command
- send
```
ts-node src/index.ts <source chain> <destination chain> [-a amount]
```