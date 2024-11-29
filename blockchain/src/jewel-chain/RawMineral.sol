// SPDX-License-Identifier: MIT
pragma solidity 0.8.27;

import {IJewelChain} from "./IJewelChain.sol";
import {UserJewelChain} from "./../user/UserJewelChain.sol";
import {UserConstant} from "./../user/UserConstant.sol";
import {Distributor} from "./../distributor/Distributor.sol";

contract RawMineral is IJewelChain, UserConstant {
    mapping(address => JewelRecord[]) private _raw;
    mapping(address => JewelToSend[]) private _orders;
    mapping(bytes32 => uint256) private _rawJewelMap;

    JewelRecord[] jewelArray;

    // smart contract
    UserJewelChain private sc_userJewelChain;
    Distributor private sc_distributor;

    // Modifiers
    modifier checkAddresZero() {
        if (msg.sender == address(0)) {
            revert RawMineral__UserInvalidAddress(msg.sender);
        }
        _;
    }

    modifier checkRoleUser(bytes32 _role) {
        if (!sc_userJewelChain.checkUserRole(msg.sender, _role)) {
            revert RawMineral__UserNotAuthorized(msg.sender);
        }
        _;
    }

    modifier isSupplierRawMineral(address supplier) {
        if (!sc_userJewelChain.checkUserRole(supplier, UserConstant.RAW_MINERAL_ROLE)) {
            revert RawMineral__SupplierIsNotRawMineral(supplier);
        }
        _;
    }

    modifier existRawMineral(bytes32 uniqueId) {
        uint256 index = _rawJewelMap[uniqueId];
        if (index == 0) {
            revert RawMineral__UniqueIdNotFound(uniqueId);
        }
        _;
    }

    constructor(address _sc_userJewelChain) {
        sc_userJewelChain = UserJewelChain(_sc_userJewelChain);
    }

    function createJewelRecord(bytes32 name, uint256 date, uint256 quantity, bytes calldata data)
        external
        override
        checkAddresZero
        checkRoleUser(UserConstant.RAW_MINERAL_ROLE)
    {
        bytes32 uniqueId = keccak256(abi.encodePacked(msg.sender, block.timestamp));
        JewelRecord memory jewelRecord = JewelRecord({
            supplier: msg.sender,
            uniqueId: uniqueId,
            name: name,
            date: date,
            quantity: quantity,
            recordType: RecordType.MATERIAL,
            data: data
        });

        _raw[msg.sender].push(jewelRecord);
        jewelArray.push(jewelRecord);
        _rawJewelMap[uniqueId] = jewelArray.length;

        emit JewelChain__Created(msg.sender, uniqueId, name, date, quantity, data, RecordType.MATERIAL);
    }

    function getJewelRecordBySupplier(address supplier) external view override returns (JewelRecord[] memory) {
        // comprobar que solo pueden acceder roles RAW_MINERAL y JEWEL_FACTORY
        if (
            !sc_userJewelChain.checkUserRole(msg.sender, UserConstant.RAW_MINERAL_ROLE)
                && !sc_userJewelChain.checkUserRole(msg.sender, UserConstant.JEWEL_FACTORY_ROLE)
        ) {
            revert RawMineral__UserNotAuthorized(msg.sender);
        }

        // comprobar que el proveedor es de rol RAW_MINERAL
        if (!sc_userJewelChain.checkUserRole(supplier, UserConstant.RAW_MINERAL_ROLE)) {
            revert RawMineral__SupplierIsNotRawMineral(supplier);
        }

        return _raw[supplier];
    }

    function recieveMaterial(address distributor, address supplier, bytes32 trackingId, bytes calldata jewels)
        external
        override
        isSupplierRawMineral(supplier)
    {
        JewelRecord memory jewelRecord = abi.decode(jewels, (JewelRecord));

        _raw[supplier].push(jewelRecord);

        emit JewelChain_Recieve(supplier, distributor, trackingId, jewelRecord);
    }

    function orderMaterial(address supplier, bytes32 uniqueId)
        external
        override
        isSupplierRawMineral(supplier)
        existRawMineral(uniqueId)
    {
        // comprobar que solo pueden acceder roles JEWEL_FACTORY
        if (!sc_userJewelChain.checkUserRole(msg.sender, UserConstant.JEWEL_FACTORY_ROLE)) {
            revert RawMineral__UserNotAuthorized(msg.sender);
        }

        // Obtener el array asociado al address
        JewelRecord[] storage jewelRecord = _raw[supplier];

        // Buscar el índice del elemento con el uniqueId
        for (uint256 i = 0; i < jewelRecord.length; i++) {
            if (jewelRecord[i].uniqueId == uniqueId) {
                jewelRecord[i] = jewelRecord[jewelRecord.length - 1];
                jewelRecord.pop();
            }
        }

        JewelToSend memory jeweToSend =
            JewelToSend({to: msg.sender, uniqueId: uniqueId, index: _orders[supplier].length + 1});

        _orders[supplier].push(jeweToSend);
        emit JewelChain_NewOrder(supplier, msg.sender, uniqueId);
    }

    function getOrderMaterialList()
        external
        view
        override
        isSupplierRawMineral(msg.sender)
        returns (JewelToSend[] memory)
    {
        return _orders[msg.sender];
    }

    function sendMaterial(bytes32 uniqueId, uint256 indexOrder)
        external
        override
        isSupplierRawMineral(msg.sender)
        existRawMineral(uniqueId)
    {
        uint256 index = _rawJewelMap[uniqueId];
        JewelRecord memory jewelRecord = jewelArray[index - 1];
        // quitamos el elemtno del array
        if (jewelArray.length != index) {
            jewelArray[index - 1] = jewelArray[jewelArray.length - 1];
            bytes32 uniqueIdLast = jewelArray[jewelArray.length - 1].uniqueId;
            _rawJewelMap[uniqueIdLast] = index;
        }
        jewelArray.pop();

        bytes memory jewelBytes = abi.encode(jewelRecord);

        JewelToSend memory jewelToSend = _orders[msg.sender][indexOrder - 1];
        // quitamos de los pedidos
        if (_orders[msg.sender].length == indexOrder) {
            _orders[msg.sender][indexOrder - 1] = _orders[msg.sender][_orders[msg.sender].length - 1];
        }
        _orders[msg.sender].pop();

        sc_distributor.newShipment(msg.sender, jewelToSend.to, jewelBytes);

        emit JewelChain__SendNewOrder(msg.sender, jewelToSend.to, uniqueId);
    }

    function setDistributorSC(address _sc_Distributor) external checkRoleUser(UserConstant.ADMIN_ROLE) {
        sc_distributor = Distributor(_sc_Distributor);
    }

    function getJewelByUniqueId(bytes32 uniqueId)
        external
        view
        override
        isSupplierRawMineral(msg.sender)
        existRawMineral(uniqueId)
        returns (JewelRecord memory)
    {
        uint256 index = _rawJewelMap[uniqueId];
        return jewelArray[index - 1];
    }
}
