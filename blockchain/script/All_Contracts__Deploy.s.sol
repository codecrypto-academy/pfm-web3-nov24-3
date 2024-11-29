// SPDX-License-Identifier: MIT
pragma solidity ^0.8.25;

import {Script} from "forge-std/Script.sol";
import {UserJewelChain} from "../src/user/UserJewelChain.sol";
import {RawMineral} from "../src/jewel-chain/RawMineral.sol";
import {Distributor} from "../src/distributor/Distributor.sol";

contract DeployAllContracts is Script {
    function run() external {
        vm.startBroadcast();

        // desplegamos USER
        UserJewelChain userJewelChain = new UserJewelChain();
        address userJewelChainAddress = address(userJewelChain);

        // desplegamos RAW_MINERAL
        RawMineral rawMineral = new RawMineral(userJewelChainAddress);
        address rawMineralAddress = address(rawMineral);

        // desplegamos DISTRIBUTOR
        Distributor distributor = new Distributor(rawMineralAddress, userJewelChainAddress);
        address distributorAddress = address(distributor);

        // seteamos address distributor a raw_minerl
        rawMineral.setDistributorSC(distributorAddress);

        vm.stopBroadcast();
    }
}
