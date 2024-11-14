// SPDX-License-Identifier: MIT
pragma solidity 0.8.27;

import {IJewelChain} from "./IJewelChain.sol";
import {UserJewelChain} from "./../user/UserJewelChain.sol";
import {UserConstant} from "./../user/UserConstant.sol";

contract RawMineral is IJewelChain, UserConstant {
    mapping(address => JewelRecord[]) private _raw;
    UserJewelChain private sc_userJewelChain;

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
        emit JewelChain__Created(msg.sender, uniqueId, name, date, quantity, data, RecordType.MATERIAL);
    }

    function getJewelRecordBySupplier(address supplier) external view override returns (JewelRecord[] memory) {}
}
