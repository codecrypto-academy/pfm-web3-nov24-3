# JewelChain Smart Contract

## Smart contracts

- UserJewelChain: "0x67c1cE31B1B29f6B636341F49703a979EC50bcF3"
- RawMineral: "0x5ce35bc96953473470798B0c3468535c4a460f12"
- Distributor: "0xf1A997372efE0AFa284031adacA0AE589B7FFb36"


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