# JewelChain Smart Contract

## Instalación
1. Instalar dependencias.
```bash
npm install
```
2. Compilar contrato
```bash
forge build
```

## Polygon
Los contratos se despliegan en la siguiente red de testnet de Polygon
https://chainid.network/chain/2442/

El comando que se ha utilizado para desplegar el contrato:
```bash
forge script script/UserJewelChain__Deploy.s.sol:DeployUsersJewelsChain --private-key $PRIVATE_KEY --rpc-url mumbai --broadcast --legacy
```
El address del contrato es el siguiente: 0x4d7EF6640BBf1D3b1DB4eCF6373A601154A449c8
El tx del despliegue es el siguiete: https://cardona-zkevm.polygonscan.com/tx/0x228869894c8e9b4f006cd7238bb1215a03fdc6173aa0aabe289612d0606b1984

## Libreria común
Instalación de openzeppelin para simplificar el desarrollo de contratos.

```bash
forge install OpenZeppelin/openzeppelin-contracts
```

## UserJewelChain


**Foundry is a blazing fast, portable and modular toolkit for Ethereum application development written in Rust.**

Foundry consists of:

-   **Forge**: Ethereum testing framework (like Truffle, Hardhat and DappTools).
-   **Cast**: Swiss army knife for interacting with EVM smart contracts, sending transactions and getting chain data.
-   **Anvil**: Local Ethereum node, akin to Ganache, Hardhat Network.
-   **Chisel**: Fast, utilitarian, and verbose solidity REPL.

## Documentation

https://book.getfoundry.sh/

## Usage

### Build

```shell
$ forge build
```

### Test

```shell
$ forge test
```

### Format

```shell
$ forge fmt
```

### Gas Snapshots

```shell
$ forge snapshot
```

### Anvil

```shell
$ anvil
```

### Deploy

```shell
$ forge script script/Counter.s.sol:CounterScript --rpc-url <your_rpc_url> --private-key <your_private_key>
```

### Cast

```shell
$ cast <subcommand>
```

### Help

```shell
$ forge --help
$ anvil --help
$ cast --help
```
