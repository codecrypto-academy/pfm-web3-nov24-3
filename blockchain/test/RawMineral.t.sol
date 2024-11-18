// SPDX-License-Identifier: MIT
pragma solidity 0.8.27;

import {Test, console} from "forge-std/Test.sol";
import {RawMineral} from "./../src/jewel-chain/RawMineral.sol";
import {UserJewelChain} from "./../src/user/UserJewelChain.sol";
import {UserConstant} from "./../src/user/UserConstant.sol";
import {IJewelChain} from "./../src/jewel-chain/IJewelChain.sol";

contract RawMineralTest is Test, UserConstant {
    enum RecordType {
        MATERIAL,
        JEWEL
    }

    RawMineral private rawMineral;
    UserJewelChain private userJewelChain;

    address private owner = address(0x1);
    address private rawMineralAddress = address(0x2);
    bytes32 private RAW_MINERAL_ROLE_TEST = RAW_MINERAL_ROLE;
    address private jewelFactoryAddress = address(0x3);
    bytes32 private JEWEL_FACTORY_ROLE_TEST = JEWEL_FACTORY_ROLE;

    uint256 date = block.timestamp;
    uint256 quantity = 100;
    bytes data = abi.encode("Additional data");

    function setUp() public {
        // Deploy UserJewelChain
        userJewelChain = new UserJewelChain();

        // deploy users
        userJewelChain.createUser(rawMineralAddress, RAW_MINERAL_ROLE_TEST);
        userJewelChain.createUser(jewelFactoryAddress, JEWEL_FACTORY_ROLE_TEST);

        rawMineral = new RawMineral(address(userJewelChain));
    }

    function test_CreateJeweRecordByRawMineralUser() public {
        vm.startPrank(rawMineralAddress);
        bytes32 name = keccak256("Gold");

        vm.expectEmit(true, true, true, true); // Verifica topics y datos no indexados
        emit IJewelChain.JewelChain__Created(
            rawMineralAddress,
            keccak256(abi.encodePacked(rawMineralAddress, block.timestamp)),
            name,
            date,
            quantity,
            data,
            IJewelChain.RecordType.MATERIAL
        );
        rawMineral.createJewelRecord(name, date, quantity, data);

        IJewelChain.JewelRecord[] memory record = rawMineral
            .getJewelRecordBySupplier(rawMineralAddress);

        vm.stopPrank();
        assertEq(record[0].supplier, rawMineralAddress);
        assertEq(record[0].name, name);
        assertEq(record[0].quantity, quantity);
        assertEq(record[0].date, date);
    }
}
