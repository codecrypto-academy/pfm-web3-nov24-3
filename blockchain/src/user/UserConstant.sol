// SPDX-License-Identifier: Apache-2.0
pragma solidity 0.8.27;

contract UserConstant {
    bytes32 public constant ADMIN_ROLE = keccak256('ADMIN_ROLE');
    bytes32 public constant RAW_MINERAL_ROLE = keccak256('RAW_MINERAL');
    bytes32 public constant JEWEL_FACTORY_ROLE = keccak256('JEWEL_FACTORY');
    bytes32 public constant DISTRIBUTOR_ROLE = keccak256('DISTRIBUTOR');
    bytes32 public constant STORE_ROLE = keccak256('STORE');
}
