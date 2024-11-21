// SPDX-License-Identifier: MIT
pragma solidity 0.8.27;

import {RawMineral} from "./../jewel-chain/RawMineral.sol";
import {IJewelChain} from "./../jewel-chain/IJewelChain.sol";
import {UserJewelChain} from "./../user/UserJewelChain.sol";
import {UserConstant} from "./../user/UserConstant.sol";

contract Distributor is UserConstant {
    struct Delivery {
        address shipper;
        address receiver;
        bytes32 trackingId;
        uint256 shipperDate;
        uint256 deliveryDate;
        IJewelChain.JewelRecord jewelRecord;
    }

    mapping(bytes32 => Delivery[]) deliveriesPending;
    RawMineral private sc_rawMineral;
    UserJewelChain private sc_userJewelChain;

    error Distributor__UserNotAuthorized(address user);
    error Distributor__UserInvalidAddress(address user);
    error Distributor__NothingToDelivery(
        address user,
        IJewelChain.JewelRecord[]
    );

    event Distributor__Shipment(
        bytes32 indexed trackingId,
        address indexed shipper,
        address indexed receiver,
        Delivery[] delivery
    );
    event Distributor__Delivery(
        bytes32 indexed trackingId,
        address indexed shipper,
        address indexed receiver,
        Delivery delivery
    );

    modifier checkRoleUser(bytes32 _role) {
        if (!sc_userJewelChain.checkUserRole(msg.sender, _role)) {
            revert Distributor__UserNotAuthorized(msg.sender);
        }
        _;
    }

    modifier checkAddresZero() {
        if (msg.sender == address(0)) {
            revert Distributor__UserInvalidAddress(msg.sender);
        }
        _;
    }

    constructor(address _rawMineral, address _userJewelChain) {
        sc_rawMineral = RawMineral(_rawMineral);
        sc_userJewelChain = UserJewelChain(_userJewelChain);
    }

    /**
     * @notice
     * @param receiver address who send the jewels
     * @param jewelRecord array of jewels to deliver
     */
    function newShipment(
        address receiver,
        IJewelChain.JewelRecord[] memory jewelRecord
    ) public checkAddresZero {
        if (
            !sc_userJewelChain.checkUserRole(
                msg.sender,
                UserConstant.RAW_MINERAL_ROLE
            ) &&
            !sc_userJewelChain.checkUserRole(
                msg.sender,
                UserConstant.JEWEL_FACTORY_ROLE
            )
        ) {
            revert Distributor__UserNotAuthorized(msg.sender);
        }

        if (jewelRecord.length == 0) {
            revert Distributor__NothingToDelivery(msg.sender, jewelRecord);
        }

        bytes32 trackingId = keccak256(
            abi.encodePacked(msg.sender, block.timestamp)
        );

        for (uint256 index = 0; index < jewelRecord.length; index++) {
            Delivery memory delivery = Delivery({
                shipper: msg.sender,
                receiver: receiver,
                trackingId: trackingId,
                shipperDate: block.timestamp,
                deliveryDate: 0,
                jewelRecord: jewelRecord[index]
            });
            deliveriesPending[trackingId].push(delivery);
        }
        emit Distributor__Shipment(
            trackingId,
            msg.sender,
            receiver,
            deliveriesPending[trackingId]
        );
    }

    function confirmDelivery(bytes32 trackingId) public {}
}
