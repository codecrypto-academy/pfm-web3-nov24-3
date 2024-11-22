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
        bytes jewelChain;
    }

    mapping(bytes32 => Delivery) deliveriesPending;
    RawMineral private sc_rawMineral;
    UserJewelChain private sc_userJewelChain;

    error Distributor__UserNotAuthorized(address user);
    error Distributor__UserInvalidAddress(address user);
    error Distributor__TrackingIdNotFound(bytes32 trackingId);
    error Distributor__ReceiverNotFound(address receiver, bytes32 role);

    event Distributor__Shipment(
        bytes32 indexed trackingId, address indexed shipper, address indexed receiver, uint256 date, Delivery delivery
    );
    event Distributor__Delivery(
        bytes32 indexed trackingId,
        address indexed receiver,
        address indexed distributor,
        uint256 date,
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
     * @param jewelChain array of jewels to deliver
     */
    function newShipment(address receiver, bytes calldata jewelChain) public checkAddresZero {
        if (
            !sc_userJewelChain.checkUserRole(msg.sender, UserConstant.RAW_MINERAL_ROLE)
                && !sc_userJewelChain.checkUserRole(msg.sender, UserConstant.JEWEL_FACTORY_ROLE)
        ) {
            revert Distributor__UserNotAuthorized(msg.sender);
        }

        bytes32 trackingId = keccak256(abi.encodePacked(msg.sender, block.timestamp));

        Delivery memory delivery = Delivery({
            shipper: msg.sender,
            receiver: receiver,
            trackingId: trackingId,
            shipperDate: block.timestamp,
            deliveryDate: 0,
            jewelChain: jewelChain
        });
        emit Distributor__Shipment(trackingId, msg.sender, receiver, delivery.shipperDate, delivery);
    }

    /**
     * @param trackingId bytes32 of the shipment
     */
    function confirmDelivery(bytes32 trackingId) public checkRoleUser(UserConstant.DISTRIBUTOR_ROLE) {
        if (deliveriesPending[trackingId].shipper == address(0)) {
            revert Distributor__TrackingIdNotFound(trackingId);
        }

        Delivery memory delivery = deliveriesPending[trackingId];
        delivery.deliveryDate = block.timestamp;

        // decode jewelChain
        IJewelChain.JewelRecord[] memory jewelRecord = abi.decode(delivery.jewelChain, (IJewelChain.JewelRecord[]));
        address receiver = delivery.receiver;

        sendJewels(jewelRecord, receiver, trackingId);

        delete deliveriesPending[trackingId];
        emit Distributor__Delivery(trackingId, delivery.receiver, msg.sender, delivery.deliveryDate, delivery);
    }

    function sendJewels(IJewelChain.JewelRecord[] memory jewelRecord, address receiver, bytes32 trackingId) private {
        bytes32 _roleUserDelivery = sc_userJewelChain.getRoleUser(receiver);
        if (_roleUserDelivery == UserConstant.RAW_MINERAL_ROLE) {
            sc_rawMineral.recieveMaterial(msg.sender, receiver, trackingId, jewelRecord);
        } else if (_roleUserDelivery == UserConstant.JEWEL_FACTORY_ROLE) {
            revert("Method not implemented");
        } else if (_roleUserDelivery == UserConstant.STORE_ROLE) {
            revert("Method not implemented");
        } else {
            revert Distributor__ReceiverNotFound(receiver, _roleUserDelivery);
        }
    }
}
