# JewelChain Smart Contract

## Smart contracts

- UserJewelChain: "0xe7B2d9331728219853eD5fb5F294350Ea680C5c0"
- RawMineral: "0x889cc60f3D1bC55c189271c59848E6289785f34f"
- Distributor: "0xe986765Bd00ece21565e6E438Ace940B8c332d82"


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


El tx del despliegue es el siguiete: https://cardona-zkevm.polygonscan.com/tx/0x228869894c8e9b4f006cd7238bb1215a03fdc6173aa0aabe289612d0606b1984

## Libreria común
Instalación de openzeppelin para simplificar el desarrollo de contratos.

## UserJewelChain

Se crean los usuario con roles https://docs.openzeppelin.com/contracts/5.x/access-control

El comando que se ha utilizado para desplegar el contrato:
```bash
forge script script/UserJewelChain__Deploy.s.sol:DeployUsersJewelsChain --private-key $PRIVATE_KEY --rpc-url mumbai --broadcast --legacy
```


## RawMineral
Primero hay que desplegar el contrato de UserJewelChain, luego se despliega este contrato. Ya que necesita la direccion del contrato users.
El comando que se ha utilizado para desplegar el contrato:
```bash
forge script script/RawMineral__Deploy.s.sol:DeployRawMineral --private-key $PRIVATE_KEY --rpc-url mumbai --broadcast --legacy
```