// SPDX-License-Identifier: MIT
pragma solidity 0.8.27;

interface IJewelChain {
    // Enum
    enum RecordType {
        MATERIAL,
        JEWEL
    }

    // Struct
    struct JewelRecord {
        address supplier;
        bytes32 uniqueId;
        bytes32 name;
        uint256 date;
        uint256 quantity;
        RecordType recordType;
        bytes data; // se utiliza este ultimo campo para que cada extension puede extender la informacion que necesite.
    }

    // Errors
    error RawMineral__UserInvalidAddress(address userAddress);
    error RawMineral__UserNotAuthorized(address userAddress);
    error RawMineral__SupplierIsNotRawMineral(address supplierAddress);

    /**
     * @dev Evento para la creación de un nuevo registro de trazabilidad.
     * Sigue el formato NombreClase__NombreEvento para su organización.
     * @param supplier Dirección del proveedor o fabricante.
     * @param uniqueId Identificador único del registro.
     * @param name Nombre del material o joya.
     * @param date Fecha asociada al evento (extracción o fabricación).
     * @param quantity Cantidad del material o joya.
     * @param data Datos adicionales específicos del registro.
     * @param recordType Tipo de registro (MATERIAL o JEWEL).
     */
    event JewelChain__Created(
        address indexed supplier,
        bytes32 indexed uniqueId,
        bytes32 name,
        uint256 date,
        uint256 quantity,
        bytes data,
        RecordType recordType
    );

    event JewelChain_Recieve(
        address indexed supplier,
        address indexed distributor,
        bytes32 indexed trackingId,
        JewelRecord[] jewelRecord
    );

    /**
     * @dev Función para crear un nuevo registro de trazabilidad.
     * @param name Nombre del material o joya.
     * @param date Fecha asociada al evento (extracción o fabricación).
     * @param quantity Cantidad del material o joya.
     * @param data Datos adicionales específicos del registro.
     */
    function createJewelRecord(
        bytes32 name,
        uint256 date,
        uint256 quantity,
        bytes calldata data
    ) external;

    /**
     * @dev Función para obtener los registros de trazabilidad asociados a un proveedor.
     * @param supplier Dirección del proveedor del cual se desean consultar los registros.
     * @return Array de registros de trazabilidad `JewelRecord`.
     */
    function getJewelRecordBySupplier(
        address supplier
    ) external view returns (JewelRecord[] memory);

    /**
     * @param jewels Array de registros de trazabilidad `JewelRecord`.
     */
    function recieveMaterial(
        address distributor,
        address suplier,
        bytes32 trackingId,
        JewelRecord[] calldata jewels
    ) external;
}
