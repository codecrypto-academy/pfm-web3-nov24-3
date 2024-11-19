// SPDX-License-Identifier: MIT
pragma solidity ^0.8.25;

import {Script} from "forge-std/Script.sol";
import {RawMineral} from "../src/jewel-chain/RawMineral.sol";

contract DeployRawMineral is Script {
    function run() external {
        vm.startBroadcast();

        address userAddressSC = 0x546A04AbA1E68b8D1906cC34E988fa7A30af2Efd;
        new RawMineral(userAddressSC);

        vm.stopBroadcast();
    }
}
