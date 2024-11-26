// SPDX-License-Identifier: MIT
pragma solidity ^0.8.25;

import {Script} from "forge-std/Script.sol";
import {UserJewelChain} from "../src/user/UserJewelChain.sol";
import {RawMineral} from "../src/jewel-chain/RawMineral.sol";

contract DeployAllContracts is Script {
    function run() external {
        vm.startBroadcast();

        UserJewelChain userJewelChain = new UserJewelChain();
        address userJewelChainAddress = address(userJewelChain);

        new RawMineral(userJewelChainAddress);

        vm.stopBroadcast();
    }
}
