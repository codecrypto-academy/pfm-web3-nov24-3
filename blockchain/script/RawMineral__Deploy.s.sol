// SPDX-License-Identifier: MIT
pragma solidity ^0.8.25;

import {Script} from "forge-std/Script.sol";
import {RawMineral} from "../src/jewel-chain/RawMineral.sol";

contract DeployRawMineral is Script {
    function run() external {
        vm.startBroadcast();

        address userAddressSC = 0x5f474bC674b6Ad4d7b6A5c6429d586D53053DA33;
        new RawMineral(userAddressSC);

        vm.stopBroadcast();
    }
}
