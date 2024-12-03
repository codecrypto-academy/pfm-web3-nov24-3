# JewelChain Smart Contract

### Índice

- [JewelChain Smart Contract](#jewelchain-smart-contract)
    - [Índice](#índice)
  - [📄 Smart Contracts](#-smart-contracts)
    - [Contratos desplegados](#contratos-desplegados)
  - [⚙️ Instalación](#️-instalación)
    - [📝 Documentación de los Smart Contracts](#-documentación-de-los-smart-contracts)
      - [Acceso a la Documentación](#acceso-a-la-documentación)
  - [🧑‍💻 Despliegue de Contratos](#-despliegue-de-contratos)
    - [Valores requeridos en el archivo `.env`](#valores-requeridos-en-el-archivo-env)
    - [Despliegue de Contratos](#despliegue-de-contratos)
  - [🚀 Scripts Disponibles](#-scripts-disponibles)
    - [Despliegue](#despliegue)
    - [Scripts de Inicialización](#scripts-de-inicialización)

---

## 📄 Smart Contracts

### Contratos desplegados

| **Contrato**        | **Dirección**                               | **Descripción**                                                                 |
|----------------------|---------------------------------------------|---------------------------------------------------------------------------------|
| **UserJewelChain**   | `0xe7B2d9331728219853eD5fb5F294350Ea680C5c0` | Gestiona usuarios y roles necesarios para el sistema.                          |
| **RawMineral**       | `0x889cc60f3D1bC55c189271c59848E6289785f34f` | Controla la creación y manejo de minerales.                          |
| **Distributor**      | `0xe986765Bd00ece21565e6E438Ace940B8c332d82` | Maneja la creacion y gestion de joyas en el sistema.                    |

--

## ⚙️ Instalación

1. **Instalar dependencias:**
   ```bash
   npm install
   ```

2. **Compilar contratos:**
   ```bash
   forge build
   ```

3. **Red de despliegue:**  
   Los contratos están desplegados en la testnet de Polygon (Cardano zkEVM).  
   [Testnet de Polygon](https://cardona-zkevm.polygonscan.com/)

---
### 📝 Documentación de los Smart Contracts

Hemos generado documentación técnica detallada de los contratos inteligentes utilizando **Forge**. Esta documentación incluye información completa sobre las funciones, parámetros y descripciones basadas en los comentarios NatSpec del código.

#### Acceso a la Documentación

Sigue estos pasos para visualizar la documentación:

1. **Generar la documentación y servirla localmente**:  
   Ejecuta el siguiente comando en la raíz de tu proyecto:
   ```bash
   forge doc --serve --port 4000
   ```

2. **Acceder a la documentación**:  
   Abre tu navegador web y ve a la URL:
   [http://localhost:4000](http://localhost:4000)

---


## 🧑‍💻 Despliegue de Contratos

### Valores requeridos en el archivo `.env`

Crea un archivo `.env` en el directorio raíz del proyecto y agrega los siguientes valores:

```env
PRIVATE_KEY=0x2a****c6
PROVIDER=https://rpc.cardona.zkevm-rpc.com

USER_CONTRACT_ADDRESS=0xe7B2d9331728219853eD5fb5F294350Ea680C5c0

RAW_MINERAL_CONTRACT_ADDRESS=0x889cc60f3D1bC55c189271c59848E6289785f34f
PRIVATE_KEY_RAW_MINERAL=0xac***80

DISTRIBUTOR_CONTRACT_ADDRESS=0xe986765Bd00ece21565e6E438Ace940B8c332d82
PRIVATE_KEY_DISTRIBUTOR=0x5****a
```

Los campos __PRIVATE_KEY__ corresponde con la clave privada del admin de la aplicación y PROVIDER corresponde con la URL del provider de Polygon.
Estas dos son obligatorias para poder desplegar todos los contratos.

---

### Despliegue de Contratos

En todos los casos siempre hay que indicar cual es la PRIVATE_KEY del administrador.

- **Desplegar UserJewelChain:**
   ```bash
   forge script script/UserJewelChain__Deploy.s.sol:DeployUsersJewelsChain --private-key $PRIVATE_KEY --rpc-url mumbai --broadcast --legacy
   ```

- **Desplegar RawMineral:**  
   ```bash
   forge script script/RawMineral__Deploy.s.sol:DeployRawMineral --private-key $PRIVATE_KEY --rpc-url mumbai --broadcast --legacy
   ```

- **Desplegar Todos los contratos:**  
   ```bash
   forge script script/All_Contracts__Deploy.s.sol:DeployAllContracts --private-key $PRIVATE_KEY --rpc-url mumbai --broadcast --legacy
   ```

---

## 🚀 Scripts Disponibles

### Despliegue
- **Despliegue independiente:**  
   Scripts para desplegar cada contrato de forma independiente.
- **Despliegue conjunto:**  
   Un script que permite desplegar todos los contratos en una sola ejecución, asegurando dependencias.

### Scripts de Inicialización
- **Crear usuarios por defecto:**  
   Utiliza este script para inicializar usuarios con roles predefinidos como Minero, Distribuidor, Fabricante, etc.
   ```bash
   npm run init:user
   ```

- **Crear materiales:**  
   Genera materiales en bruto iniciales para pruebas.
   ```bash
   npm run init:mineral
   ```