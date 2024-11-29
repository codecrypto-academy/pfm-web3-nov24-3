// SPDX-License-Identifier: MIT
pragma solidity 0.8.27;

import {RawMineral} from "./../jewel-chain/RawMineral.sol";
import {IJewelChain} from "./../jewel-chain/IJewelChain.sol";
import {UserJewelChain} from "./../user/UserJewelChain.sol";
import {UserConstant} from "./../user/UserConstant.sol";
import {IDistributor} from "./IDistributor.sol";

contract Distributor is IDistributor, UserConstant {
    mapping(bytes32 => Delivery) deliveriesPending;
    RawMineral private sc_rawMineral;
    UserJewelChain private sc_userJewelChain;

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
     * @param shipper address who send the jewels
     * @param receiver address who send the jewels
     * @param jewelChain array of jewels to deliver
     */
    function newShipment(address shipper, address receiver, bytes calldata jewelChain)
        external
        override
        checkAddresZero
    {
        if (
            !sc_userJewelChain.checkUserRole(shipper, UserConstant.RAW_MINERAL_ROLE)
                && !sc_userJewelChain.checkUserRole(shipper, UserConstant.JEWEL_FACTORY_ROLE)
        ) {
            revert Distributor__UserNotAuthorized(shipper);
        }

        uint256 date = block.timestamp;

        bytes32 trackingId = keccak256(abi.encodePacked(shipper, date));

        Delivery memory delivery = Delivery({
            shipper: shipper,
            receiver: receiver,
            trackingId: trackingId,
            shipperDate: date,
            deliveryDate: 0,
            jewelChain: jewelChain
        });
        emit Distributor__Shipment(trackingId, shipper, receiver, delivery.shipperDate, delivery);
    }

    /**
     * @param trackingId bytes32 of the shipment
     */
    function confirmDelivery(bytes32 trackingId) external override checkRoleUser(UserConstant.DISTRIBUTOR_ROLE) {
        if (deliveriesPending[trackingId].shipper == address(0)) {
            revert Distributor__TrackingIdNotFound(trackingId);
        }

        Delivery memory delivery = deliveriesPending[trackingId];
        delivery.deliveryDate = block.timestamp;

        address receiver = delivery.receiver;

        sendJewels(delivery.jewelChain, receiver, trackingId);

        delete deliveriesPending[trackingId];
        emit Distributor__Delivery(trackingId, delivery.receiver, msg.sender, delivery.deliveryDate, delivery);
    }

    function sendJewels(bytes memory jewelRecord, address receiver, bytes32 trackingId) private {
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
