// SPDX-License-Identifier: MIT
pragma solidity ^0.8.25;

import {Script} from "forge-std/Script.sol";
import {JewelFactory} from "../src/jewel-chain/JewelFactory.sol";

contract DeployJewelFactory is Script {
    function run() external {
        vm.startBroadcast();
        
        address userJewelChain = 0x31BFc5d6C8FfA2F83e0d7f125C49047de3f76fb6;
        address rawMineral = 0x399D46544Ea7E29A6854a9533d6adccEf8DD5097;
        address distributor = 0x3DEcAFd0454f55BEfc5574af43dc4860e9ad7eB4;
        string memory baseUri = "https://api.jewelchain.com/metadata/";
        
        new JewelFactory(userJewelChain, rawMineral, distributor, baseUri);
        
        vm.stopBroadcast();
    }
} 