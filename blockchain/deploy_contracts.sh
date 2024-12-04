#!/bin/bash

# Archivo de salida para las direcciones
forge script script/All_Contracts__Deploy.s.sol:DeployAllContracts --private-key 0x2a871d0798f97d79848a013d4936a73bf4cc922c825d33c1cf7073dff6d409c6 --rpc-url https://rpc.cardona.zkevm-rpc.com --broadcast --legacy

echo "¿Has copiado y pegado las direcciones de los contratos en el archivo .env? (Y/N)"
read response

if [ "$response" = "Y" ] || [ "$response" = "y" ]; then
    echo "Continuando con la ejecución..."
else
    echo "Por favor, copia las direcciones de los contratos en el archivo .env antes de continuar"
    exit 1
fi

echo "Añadiendo roles"
node scripts/createUsers.js 

echo "Añadiendo raw minerals"
node scripts/createRawMinerals.js